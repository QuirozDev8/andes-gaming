import { Building2, Globe2, Network, ShieldCheck } from "lucide-react";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import mapaMundiImage from "../../../../assets/img/mapa-mundi.webp";
import styles from "./presenciaLatam.module.css";

const presenceHighlights = [
  {
    title: "Operacion regional",
    description: "Conexion lista para mercados clave de LATAM.",
    icon: Globe2,
  },
  {
    title: "Integraciones activas",
    description: "Proveedores y servicios en una sola arquitectura.",
    icon: Network,
  },
  {
    title: "Adaptacion por mercado",
    description: "Reglas, monedas y verticales ajustadas localmente.",
    icon: Building2,
  },
  {
    title: "Escala confiable",
    description: "Disponibilidad y control para crecer en la region.",
    icon: ShieldCheck,
  },
] as const;

export function PresenciaLatam() {
  return (
    <div
      className={`${styles.presence} container`}
      aria-labelledby="presencia-latam-title"
    >
      <div className={`${styles.layoutRow} row align-items-stretch gx-5`}>
        <div className="col-12 col-lg-6 d-flex text-center text-lg-start">
          <div className={`${styles.content} mx-auto mx-lg-0`}>
            <span className={styles.eyebrow}>Presencia en LATAM</span>
            <SectionTitle
              className={styles.title}
              lineClassName={styles.titleLine}
              accentClassName={styles.titleAccent}
              id="presencia-latam-title"
              lines={[
                "Nuestra tecnologia",
                { content: "ya conecta la región", accent: true },
              ]}
            />
            <p className={styles.description}>
              Infraestructura iGaming para integrar proveedores, abrir mercados
              y escalar marcas en Latinoamerica desde una sola capa tecnologica.
            </p>

            <div className={`${styles.highlights} row g-3 d-none d-md-flex`}>
              {presenceHighlights.map((highlight) => {
                const HighlightIcon = highlight.icon;

                return (
                  <div className="col-12 col-sm-6" key={highlight.title}>
                    <article className={styles.highlight}>
                      <div className={styles.highlightIcon}>
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

        <div className="col-12 col-lg-6 d-flex">
          <div className={styles.visualSlot}>
            <img
              className={styles.visualImage}
              src={mapaMundiImage}
              alt="Mapa de presencia de Andes Gaming en Latinoamerica"
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
