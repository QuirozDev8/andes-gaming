import andesGamingLogo from "../../../../assets/logos/LOGO_SOLO_AG.webp";
import styles from "./HeroGameProvider.module.css";

export default function HeroGameProvider() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="game-provider-hero-title"
    >
      <div className={styles.content}>
        <span className={styles.eyebrow}>ANDES GAMING PROVIDERS</span>

        <h1 className={styles.title} id="game-provider-hero-title">
          <span>Un hub de game providers</span>{" "}
          <span>listo para escalar</span>
        </h1>

        <p className={styles.description}>
          En Andes Gaming centralizamos integraciones y conectamos múltiples
          proveedores de juego, casino, live casino y servicios del ecosistema
          desde una sola infraestructura.
        </p>
      </div>

      <div className={styles.logoStage} aria-hidden="true">
        <img
          className={styles.floatingLogo}
          src={andesGamingLogo}
          alt=""
          draggable={false}
        />
      </div>
    </section>
  );
}
