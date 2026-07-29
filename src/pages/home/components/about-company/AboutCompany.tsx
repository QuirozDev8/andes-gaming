import {
  ChartNoAxesCombined,
  Network,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import andesGamingImage from "../../../../assets/img/fondo-que-es-andesgaming.webp";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import { ROUTES } from "../../../../routes/routePaths";
import styles from "./AboutCompany.module.css";

const benefits = [
  { translationKey: "singleApi", icon: Network },
  { translationKey: "providers", icon: UsersRound },
  { translationKey: "scalable", icon: ChartNoAxesCombined },
  { translationKey: "management", icon: ShieldCheck },
] as const;

export function AboutCompany() {
  const { t } = useTranslation("home");

  return (
    <section className={styles.about} aria-labelledby="about-company-title">
      <div className="container position-relative">
        <div className="row align-items-stretch g-5 gx-xl-4">
          <div className="col-12 col-lg-6 d-flex text-center text-lg-start">
            <div className={`${styles.content} mx-auto mx-lg-0`}>
              <span className={styles.eyebrow}>{t("about.eyebrow")}</span>

              <SectionTitle
                as="h2"
                className={styles.title}
                accentClassName={styles.titleAccent}
                id="about-company-title"
                lines={[
                  t("about.titleFirst"),
                  { content: t("about.titleSecond"), accent: true },
                ]}
              />

              <p className={styles.description}>{t("about.description")}</p>

              <div className={`${styles.benefitsGrid} row g-3 d-none d-md-flex`}>
                {benefits.map((benefit) => {
                  const BenefitIcon = benefit.icon;
                  const benefitKey = `about.benefits.${benefit.translationKey}`;

                  return (
                    <div
                      className="col-12 col-sm-6"
                      key={benefit.translationKey}
                    >
                      <article className={styles.benefit}>
                        <div className={styles.benefitIcon}>
                          <BenefitIcon aria-hidden="true" strokeWidth={1.8} />
                        </div>
                        <div className={styles.benefitContent}>
                          <h3>{t(`${benefitKey}.title`)}</h3>
                          <p>{t(`${benefitKey}.description`)}</p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`col-12 col-lg-6 d-flex ${styles.visualColumn}`}>
            <div className={`${styles.visual} ms-lg-auto`}>
              <img
                className={styles.image}
                src={andesGamingImage}
                alt={t("about.imageAlt")}
              />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link className={styles.cta} to={ROUTES.about}>
            {t("about.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;
