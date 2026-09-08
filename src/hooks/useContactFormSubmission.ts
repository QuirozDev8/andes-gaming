import { useCallback, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "../i18n";
import {
  submitForm,
  type ContactFormFields,
} from "../services/formSubmission";

export type FormSubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

function readString(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  return typeof value === "string" ? value.trim() : "";
}

function getContactFormFields(form: HTMLFormElement): ContactFormFields {
  const formData = new FormData(form);

  return {
    fullName: readString(formData, "fullName"),
    role: readString(formData, "role"),
    company: readString(formData, "company"),
    country: readString(formData, "country"),
    email: readString(formData, "email"),
    whatsapp: readString(formData, "whatsapp"),
    website: readString(formData, "website"),
    contactReason: readString(formData, "contactReason"),
    privacyConsent: formData.has("privacyConsent"),
  };
}

function getSupportedLanguage(language: string): SupportedLanguage {
  return language.split("-")[0] === "en" ? "en" : "es";
}

export function useContactFormSubmission(formId: string) {
  const { i18n } = useTranslation();
  const submissionInProgress = useRef(false);
  const [status, setStatus] = useState<FormSubmissionStatus>("idle");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (submissionInProgress.current) {
        return;
      }

      const form = event.currentTarget;
      const fields = getContactFormFields(form);
      submissionInProgress.current = true;
      setSubmittedName("");
      setStatus("submitting");

      try {
        await submitForm({
          fields,
          formId,
          language: getSupportedLanguage(i18n.resolvedLanguage ?? "es"),
        });
        form.reset();
        setSubmittedName(fields.fullName);
        setStatus("success");
      } catch {
        setStatus("error");
      } finally {
        submissionInProgress.current = false;
      }
    },
    [formId, i18n],
  );

  const dismissStatus = useCallback(() => {
    setStatus((currentStatus) =>
      currentStatus === "submitting" ? currentStatus : "idle",
    );
    setSubmittedName("");
  }, []);

  return {
    dismissStatus,
    handleSubmit,
    isSubmitting: status === "submitting",
    status,
    submittedName,
  };
}
