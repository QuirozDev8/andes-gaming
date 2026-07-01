import {
  Gamepad2,
  Headphones,
  MessageCircle,
  Puzzle,
  Rocket,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import styles from "./FlowIntegration.module.css";

const integrationSteps = [
  {
    number: "1",
    title: "Hablemos",
    description: "Definimos objetivos, audiencia y necesidades clave.",
    icon: MessageCircle,
    accent: "cyan",
  },
  {
    number: "2",
    title: "Coincidencia inteligente",
    description: "Elegimos contenido ideal y cerramos el trato.",
    icon: Gamepad2,
    accent: "blue",
  },
  {
    number: "3",
    title: "Plug and Play",
    description: "Integramos proveedores y dejamos todo listo.",
    icon: Puzzle,
    accent: "violet",
  },
  {
    number: "4",
    title: "Pruebe y lance",
    description: "Probamos juntos, lanzamos y ajustamos.",
    icon: Rocket,
    accent: "cyan",
  },
  {
    number: "5",
    title: "Siempre a su lado",
    description: "Soporte continuo, nuevos contenidos y mejoras.",
    icon: Headphones,
    accent: "violet",
  },
] as const;

export function FlowIntegration() {
  const workflowRef = useRef<HTMLOListElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const updateActiveStep = useCallback(() => {
    const workflow = workflowRef.current;

    if (!workflow || workflow.children.length === 0) {
      return;
    }

    const workflowRect = workflow.getBoundingClientRect();
    const workflowCenter = workflowRect.left + workflowRect.width / 2;
    const items = Array.from(workflow.children);
    const closestStep = items.reduce(
      (closest, item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(itemCenter - workflowCenter);

        return distance < closest.distance ? { distance, index } : closest;
      },
      { distance: Number.POSITIVE_INFINITY, index: 0 },
    );

    setActiveStepIndex(closestStep.index);
  }, []);

  const handleStepScroll = useCallback(() => {
    window.requestAnimationFrame(updateActiveStep);
  }, [updateActiveStep]);

  const goToStep = useCallback((index: number) => {
    const workflow = workflowRef.current;
    const targetStep = workflow?.children[index] as HTMLElement | undefined;

    if (!workflow || !targetStep) {
      return;
    }

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    workflow.scrollTo({
      left: targetStep.offsetLeft,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    setActiveStepIndex(index);
  }, []);

  return (
    <section
      className={styles.flowIntegration}
      aria-labelledby="flow-integration-title"
    >
      <div className="container position-relative">
        <header className={styles.header}>
          <SectionTitle
            className={styles.title}
            id="flow-integration-title"
            lines={[
              "Pasos para trabajar",
              { content: "con nosotros.", accent: true },
            ]}
          />
          <div className={styles.titleLine} aria-hidden="true" />
        </header>

        <ol
          className={styles.workflow}
          aria-label="Pasos de integracion"
          onScroll={handleStepScroll}
          ref={workflowRef}
        >
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

        <div
          className={styles.sliderDots}
          aria-label="Navegacion de pasos"
          role="group"
        >
          {integrationSteps.map((step, index) => (
            <button
              aria-current={activeStepIndex === index ? "step" : undefined}
              aria-label={`Ver paso ${step.number}: ${step.title}`}
              className={styles.sliderDot}
              key={step.number}
              onClick={() => goToStep(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FlowIntegration;
