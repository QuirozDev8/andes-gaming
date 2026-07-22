import {
  ChartNoAxesCombined,
  Clock3,
  Globe2,
  Network,
  Puzzle,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import fondoInfra from "../../../../assets/img/fondo-infra.webp";
import { ROUTES } from "../../../../routes/routePaths";
import "./InfraTecnology.css";

const capabilityCards = [
  {
    translationKey: "api",
    icon: Network,
  },
  {
    translationKey: "integrations",
    icon: Puzzle,
  },
  {
    translationKey: "security",
    icon: ShieldCheck,
  },
  {
    translationKey: "scalability",
    icon: ChartNoAxesCombined,
  },
] as const;

const platformHighlights = [
  {
    translationKey: "global",
    icon: Globe2,
  },
  {
    translationKey: "availability",
    icon: Clock3,
  },
  {
    translationKey: "compliance",
    icon: ShieldCheck,
  },
  {
    translationKey: "performance",
    icon: ChartNoAxesCombined,
  },
] as const;

function InfraActions({ className = "" }: { className?: string }) {
  const { t } = useTranslation("home");

  return (
    <div className={`infra-actions ${className}`}>
      <BtnElegant
        text={t("infrastructure.explore")}
        href="#infra-architecture"
        ariaLabel={t("infrastructure.explore")}
        className="infra-elegant-btn"
      />

      <Link className="infra-secondary-btn" to={ROUTES.contact}>
        <Network aria-hidden="true" strokeWidth={1.8} />
        {t("infrastructure.partner")}
      </Link>
    </div>
  );
}

export function InfraTecnology() {
  const { t } = useTranslation("home");

  return (
    <section
      className="infra-section"
      id="infra-tecnology"
      aria-labelledby="infra-tecnology-title"
    >
      <div className="container position-relative">
        <div className="infra-panel">
          <div className="row align-items-center g-4 g-xl-5">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <div className="infra-content mx-auto mx-lg-0">
                <span className="infra-eyebrow">
                  <span className="infra-eyebrow-dot" aria-hidden="true" />
                  {t("infrastructure.eyebrow")}
                </span>

                <SectionTitle
                  className="infra-title"
                  accentClassName="infra-title-accent"
                  id="infra-tecnology-title"
                  lines={[
                    t("infrastructure.titleFirst"),
                    { content: t("infrastructure.titleSecond"), accent: true },
                  ]}
                />

                <span className="infra-title-rule" aria-hidden="true" />

                <p className="infra-description">
                  {t("infrastructure.description")}
                </p>

                <InfraActions className="infra-actions--desktop" />

                <div className="infra-card-grid row g-3 py-3">
                  {capabilityCards.map((card) => {
                    const CardIcon = card.icon;
                    const cardKey = `infrastructure.capabilities.${card.translationKey}`;

                    return (
                      <div
                        className="col-12 col-sm-6"
                        key={card.translationKey}
                      >
                        <article className="infra-capability-card">
                          <div className="infra-capability-icon">
                            <CardIcon aria-hidden="true" strokeWidth={1.8} />
                          </div>
                          <h3>{t(`${cardKey}.title`)}</h3>
                          <p>{t(`${cardKey}.description`)}</p>
                          <span
                            className="infra-card-accent"
                            aria-hidden="true"
                          />
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="infra-visual" id="infra-architecture">
                <img
                  className="infra-image"
                  src={fondoInfra}
                  alt={t("infrastructure.imageAlt")}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="infra-highlight-bar row g-0">
            {platformHighlights.map((highlight) => {
              const HighlightIcon = highlight.icon;
              const highlightKey = `infrastructure.highlights.${highlight.translationKey}`;

              return (
                <div
                  className="col-12 col-sm-6 col-xl-3"
                  key={highlight.translationKey}
                >
                  <article className="infra-highlight">
                    <div className="infra-highlight-icon">
                      <HighlightIcon aria-hidden="true" strokeWidth={1.8} />
                    </div>
                    <div className="infra-highlight-copy">
                      <h3>{t(`${highlightKey}.title`)}</h3>
                      <p>{t(`${highlightKey}.description`)}</p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <InfraActions className="infra-actions--mobile" />
        </div>
      </div>
    </section>
  );
}

export default InfraTecnology;
