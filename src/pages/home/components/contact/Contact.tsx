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
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import bgContactHome from "../../../../assets/img/bg-contact-home.webp";
import styles from "./Contact.module.css";

const contactStyle = {
  "--contact-bg-image": `url(${bgContactHome})`,
} as CSSProperties & Record<"--contact-bg-image", string>;

const contactFields = [
  {
    icon: UserRound,
    id: "contact-name",
    label: "Nombre completo",
    name: "fullName",
    placeholder: "Nombre completo",
    autoComplete: "name",
    required: true,
    type: "text",
  },
  {
    icon: BriefcaseBusiness,
    id: "contact-role",
    label: "Cargo",
    name: "role",
    placeholder: "Cargo",
    autoComplete: "organization-title",
    required: true,
    type: "text",
  },
  {
    icon: Building2,
    id: "contact-company",
    label: "Empresa/Operación",
    name: "company",
    placeholder: "Empresa/Operación",
    autoComplete: "organization",
    required: true,
    type: "text",
  },
  {
    icon: MapPin,
    id: "contact-country",
    label: "País",
    name: "country",
    placeholder: "País",
    autoComplete: "country-name",
    required: true,
    type: "text",
  },
  {
    icon: Mail,
    id: "contact-email",
    label: "Correo",
    name: "email",
    placeholder: "Correo",
    autoComplete: "email",
    required: true,
    type: "email",
  },
  {
    icon: Phone,
    id: "contact-whatsapp",
    label: "WhatsApp",
    name: "whatsapp",
    placeholder: "WhatsApp",
    autoComplete: "tel",
    required: false,
    type: "tel",
  },
  {
    icon: Globe2,
    id: "contact-website",
    label: "Sitio web",
    name: "website",
    placeholder: "Sitio web",
    autoComplete: "url",
    required: false,
    type: "url",
  },
];

export function Contact() {
  return (
    <section
      aria-labelledby="contact-home-title"
      className={styles.contact}
      id="contact-home"
      style={contactStyle}
    >
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>ANDES GAMING</span>

            <SectionTitle
              as="h2"
              className={styles.title}
              id="contact-home-title"
              lines={["CONTÁCTANOS"]}
              nowrap={false}
            />

            <p className={styles.description}>
              Completa el formulario y hablemos.
            </p>
          </div>

          <form
            aria-label="Formulario de contacto Andes Gaming"
            className={styles.form}
          >
            <div className={styles.formGrid}>
              {contactFields.map((field) => {
                const FieldIcon = field.icon;

                return (
                  <div className={styles.field} key={field.id}>
                    <label className={styles.fieldLabel} htmlFor={field.id}>
                      {field.label}
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
                        placeholder={field.placeholder}
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
              <span className={styles.consentText}>
                Autorizo a ANDES GAMING a tratar mis datos personales para fines
                comerciales, incluyendo información, contacto, promociones y
                ofertas, conforme a su Política de Privacidad.
              </span>
            </label>

            <div className={styles.actions}>
              <BtnElegant
                ariaLabel="Conectar con Andes Gaming"
                className={styles.submitButton}
                text="Conectar"
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
