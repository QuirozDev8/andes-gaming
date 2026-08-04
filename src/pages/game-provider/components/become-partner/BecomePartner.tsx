import { useTranslation } from "react-i18next";

import andesGamingLogo from "../../../../assets/logos/LOGO_SOLO_AG.webp";
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import { ROUTES } from "../../../../routes/routePaths";
import styles from "./BecomePartner.module.css";

export default function BecomePartner() {
  const { t } = useTranslation("gameProvider");

  return (
    <section
      className={styles.partner}
      id="become-partner"
      aria-labelledby="become-partner-title"
    >
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.decorations} aria-hidden="true">
            <span className={styles.nodeLarge} />
            <span className={styles.nodeMedium} />
            <span className={styles.nodeSmall} />
            <span className={styles.nodeLeftTop} />
            <span className={styles.nodeRightLarge} />
            <span className={styles.nodeRightBottom} />
            <span className={styles.nodeBottom} />
          </div>

          <div className={styles.content}>
            <span className={styles.logoBadge} aria-hidden="true">
              <img src={andesGamingLogo} alt="" draggable={false} />
            </span>

            <h2 className={styles.title} id="become-partner-title">
              {t("partner.title")}
            </h2>

            <p className={styles.description}>{t("partner.description")}</p>

            <div className={styles.ctaWrapper}>
              <BtnElegant text={t("partner.cta")} to={ROUTES.contact} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
