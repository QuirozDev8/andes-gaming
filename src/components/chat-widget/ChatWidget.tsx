import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import "./ChatWidget.css";

const CHAT_TARGET_ID = "andes-chat";
const CHAT_TARGET_SELECTOR = `#${CHAT_TARGET_ID}`;
const CHAT_SESSION_STORAGE_KEY = "n8n-chat/sessionId";
const CHAT_ACTIVITY_STORAGE_KEY = "andes-chat/lastActivityAt";
const CHAT_SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const CHAT_HISTORY_TIMEOUT_MS = 8_000;

type ChatApp = {
  unmount: () => void;
};

type ChatMetadata = {
  source: "andes-gaming-web";
  pagePath: string;
  language: "es" | "en";
};

type VisibleChatMessage = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

type SerializedMemoryMessage = {
  id?: unknown;
  kwargs?: {
    content?: unknown;
    tool_calls?: unknown;
  };
};

type ToggleCopy = {
  open: string;
  close: string;
  newConversation: string;
  resetTitle: string;
  resetDescription: string;
  resetConfirm: string;
  resetCancel: string;
};

type StoredSession = {
  sessionId: string;
  shouldLoadHistory: boolean;
};

function readChatStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeChatStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Session bookkeeping must not interrupt reset or send callbacks when
    // browser storage is temporarily unavailable.
  }
}

function getProductionWebhookUrl() {
  const value = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL?.trim();

  if (!value) return null;

  try {
    const url = new URL(value);
    const isProductionWebhook =
      url.protocol === "https:" &&
      url.pathname.includes("/webhook/") &&
      !url.pathname.includes("/webhook-test/");

    return isProductionWebhook ? url.toString() : null;
  } catch {
    return null;
  }
}

function createFreshSession(now = Date.now()): StoredSession {
  const sessionId = crypto.randomUUID();
  writeChatStorage(CHAT_SESSION_STORAGE_KEY, sessionId);
  writeChatStorage(CHAT_ACTIVITY_STORAGE_KEY, String(now));

  return { sessionId, shouldLoadHistory: false };
}

function resolveStoredSession(now = Date.now()): StoredSession {
  const sessionId = readChatStorage(CHAT_SESSION_STORAGE_KEY);
  if (!sessionId) return createFreshSession(now);

  const storedActivity = readChatStorage(CHAT_ACTIVITY_STORAGE_KEY);
  const lastActivityAt = Number(storedActivity);
  const hasValidActivity =
    storedActivity !== null &&
    Number.isFinite(lastActivityAt) &&
    lastActivityAt > 0 &&
    lastActivityAt <= now;

  if (!hasValidActivity) {
    writeChatStorage(CHAT_ACTIVITY_STORAGE_KEY, String(now));
    return { sessionId, shouldLoadHistory: true };
  }

  if (now - lastActivityAt >= CHAT_SESSION_TTL_MS) {
    return createFreshSession(now);
  }

  return { sessionId, shouldLoadHistory: true };
}

function getMessageClass(message: SerializedMemoryMessage) {
  if (!Array.isArray(message.id)) return "";

  return message.id.findLast((part) => typeof part === "string") ?? "";
}

function getMessageText(content: unknown) {
  if (typeof content === "string") return content.trim();
  if (!Array.isArray(content)) return "";

  return content
    .flatMap((part) => {
      if (
        typeof part === "object" &&
        part !== null &&
        "text" in part &&
        typeof part.text === "string"
      ) {
        return part.text;
      }

      return [];
    })
    .join("\n")
    .trim();
}

function toVisibleMessage(
  message: SerializedMemoryMessage,
  index: number,
): VisibleChatMessage | null {
  const messageClass = getMessageClass(message);
  const text = getMessageText(message.kwargs?.content);

  if (!text) return null;

  if (messageClass === "HumanMessage") {
    return { id: `history-${index}`, text, sender: "user" };
  }

  const toolCalls = message.kwargs?.tool_calls;
  const hasToolCalls = Array.isArray(toolCalls) && toolCalls.length > 0;

  if (messageClass === "AIMessage" && !hasToolCalls) {
    return { id: `history-${index}`, text, sender: "bot" };
  }

  return null;
}

async function loadVisibleMessageHistory(
  webhookUrl: string,
  sessionId: string,
  metadata: ChatMetadata,
  signal: AbortSignal,
) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      action: "loadPreviousSession",
      sessionId,
      metadata,
    }),
  });

  if (!response.ok) {
    throw new Error(`Chat history request failed with status ${response.status}.`);
  }

  const payload: unknown = await response.json();
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("data" in payload) ||
    !Array.isArray(payload.data)
  ) {
    return [];
  }

  return payload.data
    .map((message, index) =>
      toVisibleMessage(message as SerializedMemoryMessage, index),
    )
    .filter((message): message is VisibleChatMessage => message !== null);
}

function enhanceToggleAccessibility(
  container: HTMLElement,
  copy: ToggleCopy,
  onResetConversation: () => void,
) {
  const toggle = container.querySelector<HTMLElement>(".chat-window-toggle");
  const chatWindow = container.querySelector<HTMLElement>(".chat-window");
  const heading = container.querySelector<HTMLElement>(".chat-heading");
  const headingTitle = heading?.querySelector<HTMLHeadingElement>("h1");

  if (!toggle || !chatWindow || !heading || !headingTitle) {
    return () => undefined;
  }

  const chatWindowId = "andes-chat-window";
  chatWindow.id = chatWindowId;
  toggle.tabIndex = 0;
  toggle.setAttribute("role", "button");
  toggle.setAttribute("aria-controls", chatWindowId);

  const aiIcon = document.createElement("span");
  aiIcon.className = "andes-chat-ai-icon";
  aiIcon.setAttribute("aria-hidden", "true");

  const aiIconSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  aiIconSvg.setAttribute("viewBox", "0 0 24 24");
  aiIconSvg.setAttribute("fill", "none");
  aiIconSvg.setAttribute("stroke", "currentColor");
  aiIconSvg.setAttribute("stroke-width", "1.7");
  aiIconSvg.setAttribute("stroke-linecap", "round");
  aiIconSvg.setAttribute("stroke-linejoin", "round");

  const botBody = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect",
  );
  botBody.setAttribute("x", "4");
  botBody.setAttribute("y", "7");
  botBody.setAttribute("width", "16");
  botBody.setAttribute("height", "13");
  botBody.setAttribute("rx", "3");

  const botAntenna = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  botAntenna.setAttribute("d", "M12 7V4");

  const botAntennaTip = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  botAntennaTip.setAttribute("cx", "12");
  botAntennaTip.setAttribute("cy", "3");
  botAntennaTip.setAttribute("r", "1");

  const botFace = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  botFace.setAttribute("d", "M8 13h.01M16 13h.01M9 17h6");

  const botSides = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  botSides.setAttribute("d", "M2 12h2M20 12h2");

  aiIconSvg.append(botBody, botAntenna, botAntennaTip, botFace, botSides);
  aiIcon.append(aiIconSvg);
  headingTitle.prepend(aiIcon);

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "andes-chat-new-conversation";
  resetButton.title = copy.newConversation;
  resetButton.setAttribute("aria-label", copy.newConversation);
  resetButton.setAttribute("aria-haspopup", "dialog");
  resetButton.setAttribute("aria-controls", "andes-chat-reset-dialog");

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "1.8");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");

  const messagePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  messagePath.setAttribute(
    "d",
    "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z",
  );
  const horizontalPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  horizontalPath.setAttribute("d", "M9 10h6");
  const verticalPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  verticalPath.setAttribute("d", "M12 7v6");
  icon.append(messagePath, horizontalPath, verticalPath);
  resetButton.append(icon);
  heading.append(resetButton);

  const dialogBackdrop = document.createElement("div");
  dialogBackdrop.className = "andes-chat-reset-backdrop";
  dialogBackdrop.hidden = true;

  const dialog = document.createElement("div");
  dialog.id = "andes-chat-reset-dialog";
  dialog.className = "andes-chat-reset-dialog";
  dialog.setAttribute("role", "alertdialog");
  dialog.setAttribute("aria-modal", "true");

  const titleId = "andes-chat-reset-title";
  const descriptionId = "andes-chat-reset-description";
  dialog.setAttribute("aria-labelledby", titleId);
  dialog.setAttribute("aria-describedby", descriptionId);

  const dialogTitle = document.createElement("h2");
  dialogTitle.id = titleId;
  dialogTitle.textContent = copy.resetTitle;

  const dialogDescription = document.createElement("p");
  dialogDescription.id = descriptionId;
  dialogDescription.textContent = copy.resetDescription;

  const dialogActions = document.createElement("div");
  dialogActions.className = "andes-chat-reset-actions";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "andes-chat-reset-cancel";
  cancelButton.textContent = copy.resetCancel;

  const confirmButton = document.createElement("button");
  confirmButton.type = "button";
  confirmButton.className = "andes-chat-reset-confirm";
  confirmButton.textContent = copy.resetConfirm;

  dialogActions.append(cancelButton, confirmButton);
  dialog.append(dialogTitle, dialogDescription, dialogActions);
  dialogBackdrop.append(dialog);
  chatWindow.append(dialogBackdrop);

  let focusBeforeDialog: HTMLElement | null = null;

  const closeResetDialog = () => {
    dialogBackdrop.hidden = true;
    focusBeforeDialog?.focus();
    focusBeforeDialog = null;
  };

  const openResetDialog = () => {
    focusBeforeDialog =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : resetButton;
    dialogBackdrop.hidden = false;
    cancelButton.focus();
  };

  const handleResetClick = () => {
    const hasUserMessages = Boolean(
      container.querySelector(".chat-message-from-user"),
    );

    if (hasUserMessages) {
      openResetDialog();
      return;
    }

    onResetConversation();
  };

  const handleDialogKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeResetDialog();
      return;
    }

    if (event.key !== "Tab") return;

    const firstButton = cancelButton;
    const lastButton = confirmButton;

    if (event.shiftKey && document.activeElement === firstButton) {
      event.preventDefault();
      lastButton.focus();
    } else if (!event.shiftKey && document.activeElement === lastButton) {
      event.preventDefault();
      firstButton.focus();
    }
  };

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === dialogBackdrop) closeResetDialog();
  };

  const handleConfirm = () => {
    dialogBackdrop.hidden = true;
    onResetConversation();
  };

  const syncExpandedState = () => {
    const isOpen = chatWindow.style.display !== "none";
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? copy.close : copy.open);

    if (!isOpen && !dialogBackdrop.hidden) {
      dialogBackdrop.hidden = true;
      focusBeforeDialog = null;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    toggle.click();
  };

  const handleClick = () => {
    window.requestAnimationFrame(syncExpandedState);
  };

  const observer = new MutationObserver(syncExpandedState);
  observer.observe(chatWindow, {
    attributeFilter: ["style"],
    attributes: true,
  });

  toggle.addEventListener("keydown", handleKeyDown);
  toggle.addEventListener("click", handleClick);
  resetButton.addEventListener("click", handleResetClick);
  cancelButton.addEventListener("click", closeResetDialog);
  confirmButton.addEventListener("click", handleConfirm);
  dialogBackdrop.addEventListener("click", handleBackdropClick);
  dialog.addEventListener("keydown", handleDialogKeyDown);
  syncExpandedState();

  return () => {
    observer.disconnect();
    toggle.removeEventListener("keydown", handleKeyDown);
    toggle.removeEventListener("click", handleClick);
    resetButton.removeEventListener("click", handleResetClick);
    cancelButton.removeEventListener("click", closeResetDialog);
    confirmButton.removeEventListener("click", handleConfirm);
    dialogBackdrop.removeEventListener("click", handleBackdropClick);
    dialog.removeEventListener("keydown", handleDialogKeyDown);
    aiIcon.remove();
    resetButton.remove();
    dialogBackdrop.remove();
  };
}

function ChatWidget() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation("common");
  const [sessionRevision, setSessionRevision] = useState(0);
  const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "es";
  const webhookUrl = getProductionWebhookUrl();
  const pendingResetSessionRef = useRef<string | null>(null);
  const metadataRef = useRef<ChatMetadata>({
    source: "andes-gaming-web",
    pagePath: pathname,
    language,
  });

  const copy = useMemo(
    () => ({
      title: t("chatWidget.title"),
      greeting: t("chatWidget.initialGreeting"),
      invitation: t("chatWidget.initialInvitation"),
      getStarted: t("chatWidget.getStarted"),
      inputPlaceholder: t("chatWidget.inputPlaceholder"),
      closeButton: t("chatWidget.closeButton"),
      openToggle: t("chatWidget.openToggle"),
      closeToggle: t("chatWidget.closeToggle"),
      newConversation: t("chatWidget.newConversation"),
      resetTitle: t("chatWidget.resetTitle"),
      resetDescription: t("chatWidget.resetDescription"),
      resetConfirm: t("chatWidget.resetConfirm"),
      resetCancel: t("chatWidget.resetCancel"),
    }),
    [t],
  );

  const resetConversation = useCallback(() => {
    pendingResetSessionRef.current = createFreshSession().sessionId;
    setSessionRevision((revision) => revision + 1);
  }, []);

  useEffect(() => {
    metadataRef.current.pagePath = pathname;
    metadataRef.current.language = language;
  }, [language, pathname]);

  useEffect(() => {
    if (webhookUrl) return;

    if (import.meta.env.DEV) {
      console.warn(
        "ChatWidget is disabled: VITE_N8N_CHAT_WEBHOOK_URL must be an HTTPS production webhook URL.",
      );
    }
  }, [webhookUrl]);

  useEffect(() => {
    if (!webhookUrl) return;

    let chatApp: ChatApp | undefined;
    let cleanupAccessibility: () => void = () => undefined;
    let cancelled = false;
    const historyAbortController = new AbortController();

    const initializeChat = async () => {
      try {
        const sessionAfterReset = pendingResetSessionRef.current;
        const { sessionId, shouldLoadHistory } = sessionAfterReset
          ? { sessionId: sessionAfterReset, shouldLoadHistory: false }
          : resolveStoredSession();
        const chatModulePromise = Promise.all([
          import("@n8n/chat/style.css"),
          import("@n8n/chat"),
        ]);

        const restoreHistory = async () => {
          if (!shouldLoadHistory) return undefined;

          const historyTimeoutId = window.setTimeout(
            () => historyAbortController.abort(),
            CHAT_HISTORY_TIMEOUT_MS,
          );

          try {
            return await loadVisibleMessageHistory(
              webhookUrl,
              sessionId,
              metadataRef.current,
              historyAbortController.signal,
            );
          } catch (error) {
            if (!cancelled && import.meta.env.DEV) {
              console.warn("ChatWidget could not restore its history.", error);
            }

            return undefined;
          } finally {
            window.clearTimeout(historyTimeoutId);
          }
        };

        const [messageHistory, [, { createChat }]] = await Promise.all([
          restoreHistory(),
          chatModulePromise,
        ]);

        if (cancelled) return;

        const container = document.getElementById(CHAT_TARGET_ID);
        if (!container) return;

        container.replaceChildren();
        chatApp = createChat({
          webhookUrl,
          webhookConfig: {
            method: "POST",
            headers: {},
          },
          target: CHAT_TARGET_SELECTOR,
          mode: "window",
          showWindowCloseButton: false,
          showWelcomeScreen: false,
          // n8n returns LangChain tool calls and tool results as history items.
          // History is loaded above so only human messages and final AI replies
          // are handed to the visual widget.
          loadPreviousSession: false,
          sessionId,
          messageHistory,
          chatInputKey: "chatInput",
          chatSessionKey: "sessionId",
          metadata: metadataRef.current,
          defaultLanguage: "en",
          initialMessages: [copy.greeting, copy.invitation],
          i18n: {
            en: {
              title: copy.title,
              subtitle: "",
              footer: "",
              getStarted: copy.getStarted,
              inputPlaceholder: copy.inputPlaceholder,
              closeButtonTooltip: copy.closeButton,
            },
          },
          allowFileUploads: false,
          enableStreaming: false,
          enableMessageActions: false,
          beforeMessageSent: () => {
            writeChatStorage(CHAT_ACTIVITY_STORAGE_KEY, String(Date.now()));
          },
        });

        cleanupAccessibility = enhanceToggleAccessibility(
          container,
          {
            open: copy.openToggle,
            close: copy.closeToggle,
            newConversation: copy.newConversation,
            resetTitle: copy.resetTitle,
            resetDescription: copy.resetDescription,
            resetConfirm: copy.resetConfirm,
            resetCancel: copy.resetCancel,
          },
          resetConversation,
        );

        if (sessionAfterReset) {
          pendingResetSessionRef.current = null;
          window.requestAnimationFrame(() => {
            const toggle =
              container.querySelector<HTMLElement>(".chat-window-toggle");
            const chatWindow =
              container.querySelector<HTMLElement>(".chat-window");

            if (toggle && chatWindow?.style.display === "none") toggle.click();
          });
        }
      } catch (error) {
        if (!cancelled && import.meta.env.DEV) {
          console.error("ChatWidget could not be initialized.", error);
        }
      }
    };

    void initializeChat();

    return () => {
      cancelled = true;
      historyAbortController.abort();
      cleanupAccessibility();
      chatApp?.unmount();
      document.getElementById(CHAT_TARGET_ID)?.replaceChildren();
    };
  }, [copy, language, resetConversation, sessionRevision, webhookUrl]);

  if (!webhookUrl) return null;

  return <div id={CHAT_TARGET_ID} />;
}

export default ChatWidget;
