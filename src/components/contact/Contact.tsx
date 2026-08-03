import type { CSSProperties } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import bgContactHome from "../../assets/img/bg-contact-home.webp";
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
  },
  {
    icon: BriefcaseBusiness,
    id: "contact-role",
    translationKey: "role",
    name: "role",
    autoComplete: "organization-title",
    required: true,
    type: "text",
  },
  {
    icon: Building2,
    id: "contact-company",
    translationKey: "company",
    name: "company",
    autoComplete: "organization",
    required: true,
    type: "text",
  },
  {
    icon: MapPin,
    id: "contact-country",
    translationKey: "country",
    name: "country",
    autoComplete: "country-name",
    required: true,
    type: "text",
  },
  {
    icon: Mail,
    id: "contact-email",
    translationKey: "email",
    name: "email",
    autoComplete: "email",
    required: true,
    type: "email",
  },
  {
    icon: Phone,
    id: "contact-whatsapp",
    translationKey: "whatsapp",
    name: "whatsapp",
    autoComplete: "tel",
    required: false,
    type: "tel",
  },
  {
    icon: Globe2,
    id: "contact-website",
    translationKey: "website",
    name: "website",
    autoComplete: "url",
    required: false,
    type: "url",
  },
] as const;

type ContactProps = {
  sectionId?: string;
  translationNamespace?: "home" | "casinoAggregation";
};

export function Contact({
  sectionId = "contact-home",
  translationNamespace = "home",
}: ContactProps) {
  const { t } = useTranslation(translationNamespace);
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

          <form aria-label={t("contact.formLabel")} className={styles.form}>
            <div className={styles.formGrid}>
              {contactFields.map((field) => {
                const FieldIcon = field.icon;
                const fieldText = t(`contact.fields.${field.translationKey}`);

                return (
                  <div className={styles.field} key={field.id}>
                    <label className={styles.fieldLabel} htmlFor={field.id}>
                      {fieldText}
                      {field.required && (
                        <span className={styles.requiredMark}>*</span>
                      )}
                    </label>
                    <div className={styles.inputShell}>
                      <FieldIcon
                        className={styles.fieldIcon}
                        strokeWidth={1.8}
                      />
                      <input
                        autoComplete={field.autoComplete}
                        className={styles.input}
                        id={field.id}
                        name={field.name}
                        placeholder={fieldText}
                        required={field.required}
                        type={field.type}
                      />
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
                required
                type="checkbox"
              />
              <span className={styles.consentText}>{t("contact.consent")}</span>
            </label>

            <div className={styles.actions}>
              <BtnElegant
                ariaLabel={t("contact.submitLabel")}
                className={styles.submitButton}
                text={t("contact.submit")}
                type="button"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
