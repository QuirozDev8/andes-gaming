import { useTranslation } from "react-i18next";

import andesGamingLogo from "../../../../assets/logos/LOGO_SOLO_AG.webp";
import styles from "./HeroGameProvider.module.css";

export default function HeroGameProvider() {
  const { t } = useTranslation("gameProvider");

  return (
    <section
      className={styles.hero}
      aria-labelledby="game-provider-hero-title"
    >
      <div className={styles.content}>
        <span className={styles.eyebrow}>{t("hero.eyebrow")}</span>

        <h1 className={styles.title} id="game-provider-hero-title">
          <span>{t("hero.title.firstLine")}</span>{" "}
          <span>{t("hero.title.secondLine")}</span>
        </h1>

        <p className={styles.description}>{t("hero.description")}</p>
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
