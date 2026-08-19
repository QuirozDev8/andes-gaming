import type { SupportedLanguage } from "../i18n";

const FORM_SUBMISSION_TIMEOUT_MS = 10_000;

export type ContactFormFields = {
  fullName: string;
  role: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  website: string;
  privacyConsent: boolean;
};

export type FormSubmissionRequest = {
  formId: string;
  fields: ContactFormFields;
  language: SupportedLanguage;
};

export type FormSubmissionPayload = {
  formId: string;
  fields: ContactFormFields;
  context: {
    language: SupportedLanguage;
    pageUrl: string;
    pagePath: string;
    submittedAt: string;
  };
};

export type FormSubmissionErrorCode =
  | "configuration"
  | "http"
  | "network"
  | "timeout";

export class FormSubmissionError extends Error {
  readonly code: FormSubmissionErrorCode;
  readonly status?: number;

  constructor(
    code: FormSubmissionErrorCode,
    message: string,
    options?: { cause?: unknown; status?: number },
  ) {
    super(message, { cause: options?.cause });
    this.name = "FormSubmissionError";
    this.code = code;
    this.status = options?.status;
  }
}

function getWebhookUrl() {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    throw new FormSubmissionError(
      "configuration",
      "VITE_N8N_WEBHOOK_URL is not configured.",
    );
  }

  return webhookUrl;
}

function createPayload({
  fields,
  formId,
  language,
}: FormSubmissionRequest): FormSubmissionPayload {
  return {
    formId,
    fields,
    context: {
      language,
      pageUrl: window.location.href,
      pagePath: window.location.pathname,
      submittedAt: new Date().toISOString(),
    },
  };
}

export async function submitForm(request: FormSubmissionRequest): Promise<void> {
  const webhookUrl = getWebhookUrl();
  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => {
    abortController.abort();
  }, FORM_SUBMISSION_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      body: JSON.stringify(createPayload(request)),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw new FormSubmissionError(
        "http",
        `The form webhook returned HTTP ${response.status}.`,
        { status: response.status },
      );
    }
  } catch (error) {
    if (error instanceof FormSubmissionError) {
      throw error;
    }

    if (abortController.signal.aborted) {
      throw new FormSubmissionError(
        "timeout",
        "The form submission timed out.",
        { cause: error },
      );
    }

    throw new FormSubmissionError(
      "network",
      "The form submission could not reach the webhook.",
      { cause: error },
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
}
