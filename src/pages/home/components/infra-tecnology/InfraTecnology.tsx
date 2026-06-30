import {
  ArrowBigRightDash,
  ChartNoAxesCombined,
  Clock3,
  Globe2,
  Network,
  Puzzle,
  ShieldCheck,
} from "lucide-react";
import fondoInfra from "../../../../assets/img/fondo-infra.png";
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
                  Plataforma Andes Gaming
                </span>

                <h2 className="infra-title" id="infra-tecnology-title">
                  Infraestructura
                  <span>y tecnolog&iacute;a</span>
                </h2>

                <span className="infra-title-rule" aria-hidden="true" />

                <p className="infra-description">
                  Centralizamos integraciones, APIs, monitoreo, seguridad y
                  escalabilidad en una infraestructura disenada para potenciar
                  operaciones iGaming de alto rendimiento.
                </p>

                <div className="infra-actions d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                  <a className="infra-primary-btn" href="#infra-tecnology">
                    <span className="infra-btn-icon" aria-hidden="true">
                      <ArrowBigRightDash strokeWidth={1.8} />
                    </span>
                    Explorar tecnologia
                  </a>

                  <a className="infra-secondary-btn" href="#infra-architecture">
                    <Network aria-hidden="true" strokeWidth={1.8} />
                    Ver arquitectura
                  </a>
                </div>

                <div className="infra-card-grid row g-3">
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
                  alt="Arquitectura tecnologica Andes Gaming conectando verticales iGaming"
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
        </div>
      </div>
    </section>
  );
}

export default InfraTecnology;
