declare module "@n8n/chat" {
  type ChatI18nCopy = {
    title: string;
    subtitle: string;
    footer: string;
    getStarted: string;
    inputPlaceholder: string;
    closeButtonTooltip: string;
  };

  type ChatOptions = {
    webhookUrl: string;
    webhookConfig?: {
      method?: "GET" | "POST";
      headers?: Record<string, string>;
    };
    target?: string | Element;
    mode?: "window" | "fullscreen";
    showWindowCloseButton?: boolean;
    showWelcomeScreen?: boolean;
    loadPreviousSession?: boolean;
    sessionId?: string;
    chatInputKey?: string;
    chatSessionKey?: string;
    messageHistory?: Array<{
      id: string;
      text: string;
      sender: "user" | "bot";
    }>;
    metadata?: Record<string, unknown>;
    defaultLanguage?: "en";
    initialMessages?: string[];
    i18n?: Record<string, ChatI18nCopy>;
    allowFileUploads?: boolean;
    enableStreaming?: boolean;
    enableMessageActions?: boolean;
    beforeMessageSent?: (message: string) => void | Promise<void>;
  };

  type ChatApp = {
    unmount: () => void;
  };

  export function createChat(options?: Partial<ChatOptions>): ChatApp;
}
