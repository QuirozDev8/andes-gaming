import { useTranslation } from "react-i18next";
import mapaMundiImage from "../../../../assets/img/mapa-mundi.webp";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import styles from "./presenciaLatam.module.css";

export function PresenciaLatam() {
  const { t } = useTranslation("home");

  return (
    <div
      className={`${styles.presence} container`}
      aria-labelledby="presencia-latam-title"
    >
      <header className={styles.header}>
        <span className={styles.eyebrow}>{t("presence.eyebrow")}</span>
        <SectionTitle
          className={styles.title}
          lineClassName={styles.titleLine}
          accentClassName={styles.titleAccent}
          id="presencia-latam-title"
          lines={[
            t("presence.titleFirst"),
            { content: t("presence.titleSecond"), accent: true },
          ]}
          nowrap={false}
        />
        <p className={styles.description}>{t("presence.description")}</p>
      </header>

      <div className={styles.visualSlot}>
        <img
          className={styles.visualImage}
          src={mapaMundiImage}
          alt={t("presence.imageAlt")}
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default PresenciaLatam;
