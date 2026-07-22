import { Building2, Globe2, Network, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import mapaMundiImage from "../../../../assets/img/mapa-mundi.webp";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import styles from "./presenciaLatam.module.css";

const presenceHighlights = [
  { translationKey: "regional", icon: Globe2 },
  { translationKey: "integrations", icon: Network },
  { translationKey: "adaptation", icon: Building2 },
  { translationKey: "scale", icon: ShieldCheck },
] as const;

export function PresenciaLatam() {
  const { t } = useTranslation("home");

  return (
    <div
      className={`${styles.presence} container`}
      aria-labelledby="presencia-latam-title"
    >
      <div className={`${styles.layoutRow} row align-items-stretch gx-5`}>
        <div className="col-12 col-lg-6 d-flex text-center text-lg-start">
          <div className={`${styles.content} mx-auto mx-lg-0 pt-3`}>
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
            />
            <p className={styles.description}>{t("presence.description")}</p>

            <div className={`${styles.highlights} row g-3 d-none d-md-flex`}>
              {presenceHighlights.map((highlight) => {
                const HighlightIcon = highlight.icon;
                const highlightKey = `presence.highlights.${highlight.translationKey}`;

                return (
                  <div
                    className="col-12 col-sm-6"
                    key={highlight.translationKey}
                  >
                    <article className={styles.highlight}>
                      <div className={styles.highlightIcon}>
                        <HighlightIcon aria-hidden="true" strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3>{t(`${highlightKey}.title`)}</h3>
                        <p>{t(`${highlightKey}.description`)}</p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6 d-flex">
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
      </div>
    </div>
  );
}

export default PresenciaLatam;
