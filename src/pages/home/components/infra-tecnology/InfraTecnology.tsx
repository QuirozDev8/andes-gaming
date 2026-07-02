import {
  ChartNoAxesCombined,
  Clock3,
  Globe2,
  Network,
  Puzzle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import fondoInfra from "../../../../assets/img/fondo-infra.png";
import { ROUTES } from "../../../../routes/routePaths";
import "./InfraTecnology.css";

const capabilityCards = [
  {
    title: "API Unificada",
    description: "Una sola API para todos los modulos y proveedores.",
    icon: Network,
  },
  {
    title: "Integraciones",
    description: "Conectores nativos con los mejores proveedores.",
    icon: Puzzle,
  },
  {
    title: "Seguridad",
    description: "Proteccion avanzada, cumplimiento y gestion de identidades.",
    icon: ShieldCheck,
  },
  {
    title: "Escalabilidad",
    description: "Infraestructura elastica para crecer sin limites ni fricciones.",
    icon: ChartNoAxesCombined,
  },
] as const;

const platformHighlights = [
  {
    title: "Infraestructura global",
    description: "Regiones en America y Europa.",
    icon: Globe2,
  },
  {
    title: "Alta disponibilidad",
    description: "SLA 99,9% garantizado para tus operaciones.",
    icon: Clock3,
  },
  {
    title: "Cumplimiento",
    description: "Estandares internacionales y regulaciones locales.",
    icon: ShieldCheck,
  },
  {
    title: "Rendimiento extremo",
    description: "Baja latencia y procesamiento en tiempo real.",
    icon: ChartNoAxesCombined,
  },
] as const;

function InfraActions({ className = "" }: { className?: string }) {
  return (
    <div className={`infra-actions ${className}`}>
      <BtnElegant
        text="Explorar tecnologia"
        href="#infra-architecture"
        ariaLabel="Explorar tecnologia"
        className="infra-elegant-btn"
      />

      <Link className="infra-secondary-btn" to={ROUTES.contact}>
        <Network aria-hidden="true" strokeWidth={1.8} />
        Become a partner
      </Link>
    </div>
  );
}

export function InfraTecnology() {
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
                  Agregador de primer nivel
                </span>

                <SectionTitle
                  className="infra-title"
                  accentClassName="infra-title-accent"
                  id="infra-tecnology-title"
                  lines={[
                    "Infraestructura",
                    { content: <>y tecnolog&iacute;a</>, accent: true },
                  ]}
                />

                <span className="infra-title-rule" aria-hidden="true" />

                <p className="infra-description">
                  Centralizamos integraciones, APIs, monitoreo, seguridad y
                  escalabilidad en una infraestructura disenada para potenciar
                  operaciones iGaming de alto rendimiento.
                </p>

                <InfraActions className="infra-actions--desktop" />

                <div className="infra-card-grid row g-3 py-3">
                  {capabilityCards.map((card) => {
                    const CardIcon = card.icon;

                    return (
                      <div className="col-12 col-sm-6" key={card.title}>
                        <article className="infra-capability-card">
                          <div className="infra-capability-icon">
                            <CardIcon aria-hidden="true" strokeWidth={1.8} />
                          </div>
                          <h3>{card.title}</h3>
                          <p>{card.description}</p>
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
              <div className="infra-visual ms-lg-auto" id="infra-architecture">
                <img
                  className="infra-image"
                  src={fondoInfra}
                  alt="Arquitectura tecnologica Andes Gaming con API unificada, integraciones, seguridad y escalabilidad para operaciones iGaming"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="infra-highlight-bar row g-0">
            {platformHighlights.map((highlight) => {
              const HighlightIcon = highlight.icon;

              return (
                <div className="col-12 col-sm-6 col-xl-3" key={highlight.title}>
                  <article className="infra-highlight d-flex align-items-center gap-3 h-100">
                    <div className="infra-highlight-icon">
                      <HighlightIcon aria-hidden="true" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3>{highlight.title}</h3>
                      <p>{highlight.description}</p>
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
