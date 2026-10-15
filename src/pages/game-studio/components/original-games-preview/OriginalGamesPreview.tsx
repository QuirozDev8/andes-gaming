import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import commandoHelicopter from "../../../../assets/img/img-commando-page/Helicóptero Commando de camuflaje digital-2.png";
import commandoWordmark from "../../../../assets/img/img-commando-page/Logotipo COMMANDO blanco y desgastado-5.png";
import classifiedPlanetCyan from "../../../../assets/img/img-commando-page/Planeta cian enigmático-4.png";
import classifiedPlanetPurple from "../../../../assets/img/img-commando-page/Planeta índigo misterioso-3.png";
import { COMMANDO_CONTACT_FORM_PATH } from "../../gameStudio.config";
import "./OriginalGamesPreview.css";

const classifiedGames = [
  { id: "purple", image: classifiedPlanetPurple },
  { id: "cyan", image: classifiedPlanetCyan },
] as const;

export default function OriginalGamesPreview() {
  const { t } = useTranslation("gameStudio");

  return (
    <section
      id="original-games-preview"
      className="original-games-preview"
      aria-labelledby="original-games-preview-title"
    >
      <div className="container original-games-preview-container">
        <header className="original-games-preview-header">
          <h2
            id="original-games-preview-title"
            className="original-games-preview-title"
          >
            <span>{t("originalGames.titleFirst")}</span>{" "}
            <span>{t("originalGames.titleSecond")}</span>
          </h2>
          <p className="original-games-preview-description">
            {t("originalGames.description")}
          </p>
        </header>

        <div className="original-games-preview-scene">
          <svg
            className="original-games-preview-orbit"
            viewBox="0 0 1200 470"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="original-games-orbit-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#07f2f2" stopOpacity="0" />
                <stop offset="0.22" stopColor="#07f2f2" stopOpacity="0.9" />
                <stop offset="0.58" stopColor="#9912f3" stopOpacity="0.9" />
                <stop offset="1" stopColor="#07f2f2" stopOpacity="0.75" />
              </linearGradient>
              <filter id="original-games-orbit-glow" x="-20%" y="-30%" width="140%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              className="original-games-preview-orbit-path original-games-preview-orbit-path-desktop"
              d="M -24 326 C 190 218, 380 330, 650 214"
            />
            <path
              className="original-games-preview-orbit-path original-games-preview-orbit-path-desktop"
              d="M 830 204 C 900 198, 955 220, 980 232"
            />
            <path
              className="original-games-preview-orbit-path original-games-preview-orbit-path-desktop"
              d="M 1124 265 C 1160 286, 1195 321, 1224 346"
            />
            <path
              className="original-games-preview-orbit-path original-games-preview-orbit-path-mobile"
              d="M 602 8 C 1048 115, 217 178, 604 255 S 1000 358, 596 464"
            />
            <g className="original-games-preview-orbit-points" filter="url(#original-games-orbit-glow)">
              <circle cx="164" cy="276" r="5" />
              <circle cx="575" cy="237" r="5" />
              <circle cx="898" cy="204" r="5" />
              <circle cx="1164" cy="289" r="4" />
            </g>
          </svg>

          <article className="original-games-preview-game original-games-preview-game-commando">
            <div className="original-games-preview-helicopter-wrap">
              <span className="original-games-preview-landing-ring" aria-hidden="true" />
              <img
                className="original-games-preview-helicopter"
                src={commandoHelicopter}
                alt=""
              />
            </div>
            <h3 className="visually-hidden">{t("originalGames.commando.name")}</h3>
            <img
              className="original-games-preview-wordmark"
              src={commandoWordmark}
              alt=""
            />
            <p className="original-games-preview-status original-games-preview-status-available">
              {t("originalGames.commando.status")}
            </p>
          </article>

          {classifiedGames.map(({ id, image }) => (
            <article
              className={`original-games-preview-game original-games-preview-game-classified original-games-preview-game-${id}`}
              key={id}
            >
              <div className="original-games-preview-planet-wrap">
                <img className="original-games-preview-planet" src={image} alt="" />
                <span className="original-games-preview-lock" aria-hidden="true">
                  <Lock strokeWidth={1.9} />
                </span>
              </div>
              <h3 className="original-games-preview-game-name">
                {t("originalGames.classified.name")}
              </h3>
              <p className="original-games-preview-status">
                {t("originalGames.classified.status")}
              </p>
            </article>
          ))}
        </div>

        <div className="original-games-preview-cta">
          <BtnElegant
            className="original-games-preview-cta-link"
            showIcon={false}
            to={COMMANDO_CONTACT_FORM_PATH}
            text={t("originalGames.cta")}
          />
        </div>
      </div>
    </section>
  );
}
