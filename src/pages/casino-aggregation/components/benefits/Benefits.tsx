import {
  ChartNoAxesCombined,
  Gamepad2,
  Network,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';
import styles from './Benefits.module.css';

type Benefit = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const benefits: Benefit[] = [
  {
    number: '01',
    title: 'Integra más rápido',
    description:
      'Conecta múltiples proveedores desde una única capa tecnológica y reduce los tiempos de implementación.',
    icon: Network,
  },
  {
    number: '02',
    title: 'Mantén una oferta relevante',
    description:
      'Amplía tu catálogo con experiencias para distintos mercados y perfiles de jugador.',
    icon: Gamepad2,
  },
  {
    number: '03',
    title: 'Opera con mayor control',
    description:
      'Gestiona contenido, disponibilidad y visibilidad desde un entorno centralizado.',
    icon: SlidersHorizontal,
  },
  {
    number: '04',
    title: 'Escala sin fricción',
    description:
      'Expande marcas y mercados sobre una infraestructura preparada para acompañar tu operación.',
    icon: ChartNoAxesCombined,
  },
];

export default function Benefits() {
  return (
    <section className={styles.benefits} aria-labelledby="benefits-title">
      <span className={styles.glowViolet} aria-hidden="true" />
      <span className={styles.glowCyan} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Beneficios clave
            <span aria-hidden="true" />
          </p>

          <h2 className={styles.title} id="benefits-title">
            <span>Menos complejidad.</span>
            <span className={styles.titleAccent}>Más oportunidades.</span>
          </h2>

          <p className={styles.introduction}>
            Centraliza tu operación de casino y avanza con una plataforma preparada para crecer contigo.
          </p>
        </header>

        <div
          className={styles.railViewport}
          role="region"
          aria-label="Beneficios de Casino Aggregation"
          tabIndex={0}
        >
          <ol className={styles.rail}>
            {benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;

              return (
                <li className={styles.railItem} key={benefit.number}>
                  <span className={styles.connector} aria-hidden="true" />
                  <span className={styles.node} aria-hidden="true">
                    <span />
                  </span>

                  <article className={styles.card}>
                    <span className={styles.number} aria-hidden="true">
                      {benefit.number}
                    </span>

                    <span className={styles.icon} aria-hidden="true">
                      <BenefitIcon strokeWidth={1.7} />
                    </span>

                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <p className={styles.swipeHint} aria-hidden="true">
          Desliza para explorar <span>→</span>
        </p>
      </div>
    </section>
  );
}
