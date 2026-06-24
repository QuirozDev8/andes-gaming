import { Clock3, Gamepad2, Globe2, UsersRound } from "lucide-react";
import styles from "./Metrics.module.css";

const metrics = [
  {
    value: "+150",
    label: "Operadores conectados",
    icon: UsersRound,
  },
  {
    value: "+12.000",
    label: "Juegos integrados",
    icon: Gamepad2,
  },
  {
    value: "18",
    label: "Mercados en LATAM",
    icon: Globe2,
  },
  {
    value: "99.9%",
    label: "Uptime de plataforma",
    icon: Clock3,
  },
] as const;

export function Metrics() {
  return (
    <section className={styles.metrics} aria-label="Metricas principales">
      <div className="container position-relative">
        <ul className={styles.grid}>
          {metrics.map((metric) => {
            const MetricIcon = metric.icon;

            return (
              <li className={styles.item} key={metric.label}>
                <div className={styles.iconWrap}>
                  <MetricIcon aria-hidden="true" strokeWidth={1.7} />
                </div>
                <div className={styles.content}>
                  <strong className={styles.value}>{metric.value}</strong>
                  <span className={styles.label}>{metric.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Metrics;
