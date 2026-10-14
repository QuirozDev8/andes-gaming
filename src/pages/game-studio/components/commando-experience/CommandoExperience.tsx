import { Crosshair, RotateCw, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./CommandoExperience.css";

const features = [
  { key: "action", Icon: Crosshair },
  { key: "adrenaline", Icon: Zap },
  { key: "replay", Icon: RotateCw },
] as const;

export default function CommandoExperience() {
  const { t } = useTranslation("gameStudio");

  return (
    <section
      id="commando-experience"
      className="commando-experience"
      aria-labelledby="commando-experience-title"
      lang={t("experience.language")}
    >
      <div className="container commando-experience-container">
        <div className="commando-experience-copy">
          <p className="commando-experience-label">{t("experience.label")}</p>
          <h2 id="commando-experience-title" className="commando-experience-title">
            <span>{t("experience.titleFirst")}</span>
            <span>{t("experience.titleSecond")}</span>
          </h2>
          <p className="commando-experience-description">
            {t("experience.description")}
          </p>
        </div>
        <div className="commando-experience-scene" aria-hidden="true" />
        <ul className="row g-3 commando-experience-features">
          {features.map(({ key, Icon }) => (
            <li className="col-12 col-md-4 commando-experience-feature" key={key}>
              <div className="commando-experience-card">
                <span className="commando-experience-icon" aria-hidden="true">
                  <Icon size={34} strokeWidth={2.3} focusable="false" />
                </span>
                <h3 className="commando-experience-card-title">
                  {t(`experience.features.${key}`)}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
