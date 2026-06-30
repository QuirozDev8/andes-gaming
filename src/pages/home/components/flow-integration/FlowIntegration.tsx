import {
  Gamepad2,
  Headphones,
  MessageCircle,
  Puzzle,
  Rocket,
} from "lucide-react";
import andesLogo from "../../../../assets/logos/logo-header.png";
import styles from "./FlowIntegration.module.css";

const integrationSteps = [
  {
    number: "1",
    title: "¡Hablemos!",
    description:
      "Platicamos sobre sus metas, su mercado objetivo y sobre lo que su casino necesita para alcanzar el éxito.",
    icon: MessageCircle,
    accent: "cyan",
  },
  {
    number: "2",
    title: "Coincidencia inteligente de contenidos",
    description:
      "Seleccionamos los mejores juegos para su audiencia y cerramos el trato, de forma rápida y clara.",
    icon: Gamepad2,
    accent: "blue",
  },
  {
    number: "3",
    title: "Configuración Plug and Play",
    description:
      "Nos encargamos de la integración de proveedores; usted solo se conecta y listo.",
    icon: Puzzle,
    accent: "violet",
  },
  {
    number: "4",
    title: "¡Pruebe, ponga en marcha y gane!",
    description:
      "Probamos todo junto con usted y le ayudamos a ponerse en marcha sin problemas.",
    icon: Rocket,
    accent: "cyan",
  },
  {
    number: "5",
    title: "Siempre a su lado",
    description:
      "Proporcionamos soporte continuo, contenido nuevo y actualizaciones para aumentar la participación de los jugadores.",
    icon: Headphones,
    accent: "violet",
  },
] as const;

export function FlowIntegration() {
  return (
    <section
      className={styles.flowIntegration}
      aria-labelledby="flow-integration-title" >
      <div className="container position-relative">
        <header className={styles.header}>
          <img
            className={styles.logo}
            src={andesLogo}
            alt="Andes Gaming"
            loading="lazy"
          />
          <h2 className={styles.title} id="flow-integration-title">
            Su plan para el lanzamiento
          </h2>
          <div className={styles.titleLine} aria-hidden="true" />
        </header>

        <ol className={styles.workflow} aria-label="Pasos de integración">
          {integrationSteps.map((step, index) => {
            const StepIcon = step.icon;

            return (
              <li
                className={`${styles.stepItem} ${styles[`step${index + 1}`]} ${
                  styles[step.accent]
                }`}
                key={step.number}
              >
                <div className={styles.stepNumber} aria-hidden="true">
                  {step.number}
                </div>
                <article className={styles.stepCard}>
                  <div className={styles.iconFrame}>
                    <StepIcon aria-hidden="true" strokeWidth={1.7} />
                  </div>
                  <h3>{step.title}</h3>
                  <span className={styles.cardRule} aria-hidden="true" />
                  <p>{step.description}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default FlowIntegration;
