import { useEffect } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Globe2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import contactVisual from "../../assets/img/img-contact-page.png";
import BtnElegant from "../../components/btn-elegant/BtnElegant";
import { FormSubmissionStatus } from "../../components/form-submission-status/FormSubmissionStatus";
import RevealOnScroll from "../../components/reveal-on-scroll/RevealOnScroll";
import { useContactFormSubmission } from "../../hooks/useContactFormSubmission";
import styles from "./ContactPage.module.css";

const contactFields = [
  {
    autoComplete: "name",
    icon: UserRound,
    id: "contact-page-name",
    name: "fullName",
    required: true,
    translationKey: "name",
    type: "text",
    fullWidth: false,
  },
  {
    autoComplete: "organization-title",
    icon: BriefcaseBusiness,
    id: "contact-page-role",
    name: "role",
    required: true,
    translationKey: "role",
    type: "text",
    fullWidth: false,
  },
  {
    autoComplete: "organization",
    icon: Building2,
    id: "contact-page-company",
    name: "company",
    required: true,
    translationKey: "company",
    type: "text",
    fullWidth: false,
  },
  {
    autoComplete: "country-name",
    icon: MapPin,
    id: "contact-page-country",
    name: "country",
    required: true,
    translationKey: "country",
    type: "text",
    fullWidth: false,
  },
  {
    autoComplete: "email",
    icon: Mail,
    id: "contact-page-email",
    name: "email",
    required: true,
    translationKey: "email",
    type: "email",
    fullWidth: false,
  },
  {
    autoComplete: "tel",
    icon: Phone,
    id: "contact-page-whatsapp",
    name: "whatsapp",
    required: true,
    translationKey: "whatsapp",
    type: "tel",
    fullWidth: false,
  },
  {
    autoComplete: "url",
    icon: Globe2,
    id: "contact-page-website",
    name: "website",
    required: false,
    translationKey: "website",
    type: "url",
    fullWidth: true,
  },
  {
    autoComplete: "off",
    icon: MessageSquare,
    id: "contact-page-reason",
    name: "contactReason",
    required: true,
    translationKey: "contactReason",
    type: "textarea",
    fullWidth: true,
  },
] as const;

export function ContactPage() {
  const { t } = useTranslation("contactPage");
  const { t: tCommon } = useTranslation("common");
  const {
    dismissStatus,
    handleSubmit,
    isSubmitting,
    status,
    submittedName,
  } = useContactFormSubmission("contact-page");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
 
  return (
    <div className={styles.page}>
      <section
        aria-labelledby="contact-form-title"
        className={styles.hero}
      >
        <span className={styles.heroGlowLeft} aria-hidden="true" />
        <span className={styles.heroGlowRight} aria-hidden="true" />

        <div className="container position-relative">
          <RevealOnScroll delayMs={80} distancePx={12}>
            <div className={styles.landingShell}>
              <figure className={styles.contactVisual}>
                <img alt={t("image.alt")} src={contactVisual} />
              </figure>

              <div className={styles.formCard}>
                <header className={styles.sectionHeader}>
                  <span className={styles.sectionEyebrow}>
                    {t("form.eyebrow")}
                  </span>
                  <h1 id="contact-form-title">{t("form.title")}</h1>
                  <p>{t("form.description")}</p>
                </header>

                <form
                  aria-label={t("form.ariaLabel")}
                  className={styles.form}
                  id="contact-page-form"
                  onSubmit={handleSubmit}
                >
                  <div className={styles.formGrid}>
                    {contactFields.map((field) => {
                      const FieldIcon = field.icon;
                      const fieldLabel = t(
                        `form.fields.${field.translationKey}`,
                      );
                      const isTextarea = field.type === "textarea";

                      return (
                        <div
                          className={`${styles.field} ${
                            field.fullWidth ? styles.fieldFullWidth : ""
                          }`}
                          key={field.id}
                        >
                          <label htmlFor={field.id}>
                            {fieldLabel}
                            {field.required ? (
                              <span
                                aria-hidden="true"
                                className={styles.requiredMark}
                              >
                                *
                              </span>
                            ) : (
                              <span className={styles.optionalLabel}>
                                {t("form.optional")}
                              </span>
                            )}
                          </label>

                          <div
                            className={`${styles.inputShell} ${
                              isTextarea ? styles.textareaShell : ""
                            }`}
                          >
                            <FieldIcon
                              aria-hidden="true"
                              className={`${styles.fieldIcon} ${
                                isTextarea ? styles.textareaIcon : ""
                              }`}
                              strokeWidth={1.8}
                            />
                            {isTextarea ? (
                              <textarea
                                id={field.id}
                                name={field.name}
                                placeholder={fieldLabel}
                                required={field.required}
                                rows={3}
                              />
                            ) : (
                              <input
                                autoComplete={field.autoComplete}
                                id={field.id}
                                name={field.name}
                                placeholder={fieldLabel}
                                required={field.required}
                                type={field.type}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <label
                    className={styles.consent}
                    htmlFor="contact-page-consent"
                  >
                    <input
                      id="contact-page-consent"
                      name="privacyConsent"
                      aria-required="true"
                      required
                      type="checkbox"
                    />
                    <span>{t("form.consent")}</span>
                  </label>

                  <div className={styles.formActions}>
                    <BtnElegant
                      ariaLabel={t("form.submitLabel")}
                      className={styles.submitButton}
                      disabled={isSubmitting}
                      text={
                        isSubmitting
                          ? tCommon("formSubmission.sending")
                          : t("form.submit")
                      }
                      type="submit"
                    />
                  </div>

                  <FormSubmissionStatus
                    onDismiss={dismissStatus}
                    status={status}
                    submittedName={submittedName}
                  />
                </form>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
