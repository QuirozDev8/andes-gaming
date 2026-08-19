import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FormSubmissionStatus as SubmissionStatus } from "../../hooks/useContactFormSubmission";
import styles from "./FormSubmissionStatus.module.css";

const AUTO_DISMISS_MS = 4_000;
const EXIT_ANIMATION_MS = 180;

type FormSubmissionStatusProps = {
  onDismiss: () => void;
  status: SubmissionStatus;
  submittedName: string;
};

type SuccessModalProps = {
  onDismiss: () => void;
  submittedName: string;
};

function SuccessModal({ onDismiss, submittedName }: SuccessModalProps) {
  const { t } = useTranslation("common");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  const requestClose = useCallback(() => {
    if (closingRef.current) {
      return;
    }

    closingRef.current = true;
    setIsClosing(true);
    exitTimerRef.current = window.setTimeout(onDismiss, EXIT_ANIMATION_MS);
  }, [onDismiss]);

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousBodyOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
    const autoDismissTimer = window.setTimeout(requestClose, AUTO_DISMISS_MS);

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.clearTimeout(autoDismissTimer);

      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current);
      }

      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [requestClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      requestClose();
    }
  };

  return createPortal(
    <div
      className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
      onMouseDown={handleBackdropClick}
    >
      <section
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className={styles.modal}
        role="dialog"
      >
        <span aria-hidden="true" className={styles.modalGlow} />

        <span aria-hidden="true" className={styles.modalIcon}>
          <CircleCheckBig strokeWidth={1.7} />
        </span>

        <div className={styles.modalContent}>
          <h2 id={titleId}>
            {t("formSubmission.successTitle", { name: submittedName })}
          </h2>
          <p id={descriptionId}>{t("formSubmission.success")}</p>
        </div>

        <button
          className={styles.modalDismissButton}
          onClick={requestClose}
          ref={closeButtonRef}
          type="button"
        >
          {t("formSubmission.dismiss")}
        </button>

        <span aria-hidden="true" className={styles.progressTrack}>
          <span className={styles.progressBar} />
        </span>
      </section>
    </div>,
    document.body,
  );
}

export function FormSubmissionStatus({
  onDismiss,
  status,
  submittedName,
}: FormSubmissionStatusProps) {
  const { t } = useTranslation("common");

  if (status === "idle" || status === "submitting") {
    return null;
  }

  if (status === "success") {
    return (
      <SuccessModal onDismiss={onDismiss} submittedName={submittedName} />
    );
  }

  return (
    <div
      aria-atomic="true"
      aria-live="assertive"
      className={`${styles.feedback} ${styles.error}`}
      role="alert"
    >
      <span aria-hidden="true" className={styles.icon}>
        <CircleAlert strokeWidth={1.8} />
      </span>

      <div className={styles.content}>
        <strong>{t("formSubmission.errorTitle")}</strong>
        <p>{t("formSubmission.error")}</p>
      </div>

      <button className={styles.dismissButton} onClick={onDismiss} type="button">
        {t("formSubmission.dismiss")}
      </button>
    </div>
  );
}

export default FormSubmissionStatus;
