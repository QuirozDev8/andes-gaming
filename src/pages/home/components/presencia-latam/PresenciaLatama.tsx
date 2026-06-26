import { Building2, Globe2, Network, ShieldCheck } from "lucide-react";
import styles from "./presenciaLatam.module.css";

const presenceHighlights = [
  {
    title: "Operacion regional",
    description:
      "Tecnologia preparada para conectar operadores en mercados clave de Latinoamerica.",
    icon: Globe2,
  },
  {
    title: "Integraciones activas",
    description:
      "Una capa tecnica que une proveedores, plataformas y servicios desde una sola arquitectura.",
    icon: Network,
  },
  {
    title: "Adaptacion por mercado",
    description:
      "Infraestructura flexible para acompanar reglas, monedas, verticales y modelos comerciales locales.",
    icon: Building2,
  },
  {
    title: "Escala confiable",
    description: "Base robusta para sostener crecimiento, disponibilidad y control operativo en la region.",
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
            <h2 className={styles.title} id="presencia-latam-title">
              <span className={styles.titleLine}>Nuestra tecnologia</span>
              <span className={styles.titleAccent}>ya conecta la region</span>
            </h2>
            <p className={styles.description}>
              Andes Gaming impulsa operaciones iGaming en Latinoamerica con una
              infraestructura pensada para integrar proveedores, habilitar
              nuevos mercados y escalar marcas desde una misma capa tecnologica.
            </p>

            <div className={`${styles.highlights} row g-3`}>
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
          <div
            className={styles.visualSlot}
            aria-label="Espacio reservado para visualizacion de presencia regional"
          />
        </div>
      </div>
    </div>
  );
}

export default PresenciaLatam;
