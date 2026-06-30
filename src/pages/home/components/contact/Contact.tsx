import type { CSSProperties } from "react";
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import bgContactHome from "../../../../assets/img/bg-contact-home.webp";
import styles from "./Contact.module.css";

const contactStyle = {
  "--contact-bg-image": `url(${bgContactHome})`,
} as CSSProperties & Record<"--contact-bg-image", string>;

export function Contact() {
  return (
    <section
      aria-labelledby="contact-home-title"
      className={styles.contact}
      style={contactStyle}
    >
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title} id="contact-home-title">
            Hablemos de tu proyecto
          </h2>

          <div className={styles.emailGroup}>
            <label className={styles.visuallyHidden} htmlFor="contact-email">
              Correo electronico
            </label>
            <input
              className={styles.emailInput}
              id="contact-email"
              name="email"
              placeholder="Correo electronico"
              type="email"
            />
            <BtnElegant
              ariaLabel="Enviar correo de contacto"
              className={styles.submitButton}
              text="Enviar"
              type="button"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
