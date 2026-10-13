import type { CSSProperties } from "react";
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
import bgContactHome from "../../assets/img/bg-contact-home.webp";
import { FormSubmissionStatus } from "../form-submission-status/FormSubmissionStatus";
import { useContactFormSubmission } from "../../hooks/useContactFormSubmission";
import BtnElegant from "../btn-elegant/BtnElegant";
import SectionTitle from "../section-title/SectionTitle";
import styles from "./Contact.module.css";

const contactStyle = {
  "--contact-bg-image": `url(${bgContactHome})`,
} as CSSProperties & Record<"--contact-bg-image", string>;

const contactFields = [
  {
    icon: UserRound,
    id: "contact-name",
    translationKey: "name",
    name: "fullName",
    autoComplete: "name",
    required: true,
    type: "text",
    fullWidth: false,
  },
  {
    icon: BriefcaseBusiness,
    id: "contact-role",
    translationKey: "role",
    name: "role",
    autoComplete: "organization-title",
    required: true,
    type: "text",
    fullWidth: false,
  },
  {
    icon: Building2,
    id: "contact-company",
    translationKey: "company",
    name: "company",
    autoComplete: "organization",
    required: true,
    type: "text",
    fullWidth: false,
  },
  {
    icon: MapPin,
    id: "contact-country",
    translationKey: "country",
    name: "country",
    autoComplete: "country-name",
    required: true,
    type: "text",
    fullWidth: false,
  },
  {
    icon: Mail,
    id: "contact-email",
    translationKey: "email",
    name: "email",
    autoComplete: "email",
    required: true,
    type: "email",
    fullWidth: false,
  },
  {
    icon: Phone,
    id: "contact-whatsapp",
    translationKey: "whatsapp",
    name: "whatsapp",
    autoComplete: "tel",
    required: true,
    type: "tel",
    fullWidth: false,
  },
  {
    icon: Globe2,
    id: "contact-website",
    translationKey: "website",
    name: "website",
    autoComplete: "url",
    required: false,
    type: "url",
    fullWidth: true,
  },
  {
    icon: MessageSquare,
    id: "contact-reason",
    translationKey: "contactReason",
    name: "contactReason",
    autoComplete: "off",
    required: true,
    type: "textarea",
    fullWidth: true,
  },
] as const;

type ContactProps = {
  sectionId?: string;
  translationNamespace?: "home" | "casinoAggregation" | "aboutPage";
};

export function Contact({
  sectionId = "contact-home",
  translationNamespace = "home",
}: ContactProps) {
  const { t } = useTranslation(translationNamespace);
  const { t: tCommon } = useTranslation("common");
  const {
    dismissStatus,
    handleSubmit,
    isSubmitting,
    status,
    submittedName,
  } = useContactFormSubmission(sectionId);
  const titleId = `${sectionId}-title`;

  return (
    <section
      aria-labelledby={titleId}
      className={styles.contact}
      id={sectionId}
      style={contactStyle}
    >
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>{t("contact.eyebrow")}</span>

            <SectionTitle
              as="h2"
              className={styles.title}
              id={titleId}
              lines={[t("contact.title")]}
              nowrap={false}
            />

            <p className={styles.description}>{t("contact.description")}</p>
          </div>

          <form
            aria-label={t("contact.formLabel")}
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.formGrid}>
              {contactFields.map((field) => {
                const FieldIcon = field.icon;
                const fieldText = t(`contact.fields.${field.translationKey}`);
                const placeholderText = t(
                  `contact.placeholders.${field.translationKey}`,
                  { defaultValue: fieldText },
                );
                const isTextarea = field.type === "textarea";

                return (
                  <div
                    className={`${styles.field} ${
                      field.fullWidth ? styles.fieldFullWidth : ""
                    }`}
                    key={field.id}
                  >
                    <label className={styles.fieldLabel} htmlFor={field.id}>
                      {fieldText}
                      {field.required && (
                        <span className={styles.requiredMark}>*</span>
                      )}
                    </label>
                    <div
                      className={`${styles.inputShell} ${
                        isTextarea ? styles.textareaShell : ""
                      }`}
                    >
                      <FieldIcon
                        className={`${styles.fieldIcon} ${
                          isTextarea ? styles.textareaIcon : ""
                        }`}
                        strokeWidth={1.8}
                      />
                      {isTextarea ? (
                        <textarea
                          className={styles.textarea}
                          id={field.id}
                          name={field.name}
                          placeholder={placeholderText}
                          required={field.required}
                          rows={3}
                        />
                      ) : (
                        <input
                          autoComplete={field.autoComplete}
                          className={styles.input}
                          id={field.id}
                          name={field.name}
                          placeholder={placeholderText}
                          required={field.required}
                          type={field.type}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div> 

            <label className={styles.consent} htmlFor="contact-consent">
              <input
                className={styles.consentInput}
                id="contact-consent"
                name="privacyConsent"
                aria-required="true"
                required
                type="checkbox"
              />
              <span className={styles.consentText}>{t("contact.consent")}</span>
            </label>

            <div className={styles.actions}>
              <BtnElegant
                ariaLabel={t("contact.submitLabel")}
                className={styles.submitButton}
                disabled={isSubmitting}
                text={
                  isSubmitting
                    ? tCommon("formSubmission.sending")
                    : t("contact.submit")
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
    </section>
  );
}

export default Contact;
