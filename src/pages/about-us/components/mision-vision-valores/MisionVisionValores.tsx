import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import andesIsotype from "../../../../assets/logos/LOGO_SOLO_AG.webp";
import RevealOnScroll from "../../../../components/reveal-on-scroll/RevealOnScroll";
import styles from "./MisionVisionValores.module.css";

const VALUE_KEYS = [
  "innovation",
  "reliability",
  "proximity",
  "growth",
] as const;

export default function MisionVisionValores() {
  const { t } = useTranslation("aboutPage");
  const strategyFieldRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const strategyField = strategyFieldRef.current;
    const compass = compassRef.current;
    const needle = needleRef.current;

    if (!strategyField || !compass || !needle || typeof window === "undefined") {
      return;
    }

    const precisePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    gsap.set(needle, { rotation: 0, transformOrigin: "50% 50%" });

    if (!precisePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    let animationFrame: number | null = null;
    let pointerIsActive = false;
    const pointerPosition = { x: 0, y: 0 };
    const rotateNeedle = gsap.quickTo(needle, "rotation", {
      duration: 0.36,
      ease: "power3.out",
    });

    const getRenderedRotation = () => {
      const renderedRotation = Number(gsap.getProperty(needle, "rotation"));
      return Number.isFinite(renderedRotation) ? renderedRotation : 0;
    };

    const getNearestRotation = (targetAngle: number) => {
      const renderedRotation = getRenderedRotation();
      const shortestDelta =
        ((targetAngle - renderedRotation + 540) % 360) - 180;
      return renderedRotation + shortestDelta;
    };

    const returnNeedleToNorth = () => {
      rotateNeedle(getNearestRotation(0));
    };

    const pointNeedleToCursor = () => {
      animationFrame = null;

      if (!pointerIsActive) return;

      const compassBounds = compass.getBoundingClientRect();
      const fieldBounds = strategyField.getBoundingClientRect();
      const pointerIsInsideField =
        pointerPosition.x >= fieldBounds.left &&
        pointerPosition.x <= fieldBounds.right &&
        pointerPosition.y >= fieldBounds.top &&
        pointerPosition.y <= fieldBounds.bottom;

      if (!pointerIsInsideField) {
        returnNeedleToNorth();
        return;
      }

      const centerX = compassBounds.left + compassBounds.width / 2;
      const centerY = compassBounds.top + compassBounds.height / 2;
      const pointerDeltaX = pointerPosition.x - centerX;
      const pointerDeltaY = pointerPosition.y - centerY;

      if (
        Math.hypot(pointerDeltaX, pointerDeltaY) <
        compassBounds.width * 0.1
      ) {
        return;
      }

      const angleToPointer =
        (Math.atan2(
          pointerDeltaY,
          pointerDeltaX,
        ) *
          180) /
          Math.PI +
        90;

      rotateNeedle(getNearestRotation(angleToPointer));
    };

    const scheduleNeedleUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(pointNeedleToCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerPosition.x = event.clientX;
      pointerPosition.y = event.clientY;
      pointerIsActive = true;
      scheduleNeedleUpdate();
    };

    const handlePointerLeave = () => {
      pointerIsActive = false;
      returnNeedleToNorth();
    };

    strategyField.addEventListener("pointermove", handlePointerMove);
    strategyField.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", scheduleNeedleUpdate, { passive: true });
    window.addEventListener("resize", scheduleNeedleUpdate);

    return () => {
      strategyField.removeEventListener("pointermove", handlePointerMove);
      strategyField.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", scheduleNeedleUpdate);
      window.removeEventListener("resize", scheduleNeedleUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      rotateNeedle.tween.kill();
      gsap.killTweensOf(needle);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="purpose-title">
      <div className={styles.backdropWord} aria-hidden="true">
        {t("purpose.backdrop")}
      </div>
      <div className={styles.topography} aria-hidden="true" />

      <div className={styles.container}>
        <RevealOnScroll distancePx={24} durationMs={900}>
          <header className={styles.header}>
            <div className={styles.headingBlock}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowMark} aria-hidden="true" />
                {t("purpose.eyebrow")}
              </span>

              <h2 className={styles.title} id="purpose-title">
                <span>{t("purpose.titlePrefix")}</span>
                <span className={styles.titleAccent}>
                  {t("purpose.titleAccent")}
                </span>
              </h2>
            </div>
          </header>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100} distancePx={30} durationMs={1050}>
          <div className={styles.strategyField} ref={strategyFieldRef}>
            <span className={`${styles.coordinate} ${styles.coordinateTop}`} aria-hidden="true">
              AG / PURPOSE SYSTEM
            </span>
            <span className={`${styles.coordinate} ${styles.coordinateBottom}`} aria-hidden="true">
              LATAM / 04° N
            </span>

            <div className={`${styles.statementSlot} ${styles.missionSlot}`}>
              <article className={`${styles.statement} ${styles.mission}`}>
                <div className={styles.statementMeta}>
                  <span className={styles.statementNumber}>01</span>
                  <span>{t("purpose.mission.label")}</span>
                </div>
                <p className={styles.statementText}>
                  {t("purpose.mission.statement")}
                </p>
                <p className={styles.statementSupport}>
                  {t("purpose.mission.support")}
                </p>
              </article>
            </div>

            <div className={styles.compass} ref={compassRef} aria-hidden="true">
              <span className={styles.compassOrbit} />
              <span className={styles.compassOrbitInner} />
              <span className={styles.compassAxisHorizontal} />
              <span className={styles.compassAxisVertical} />
              <span className={styles.compassNorth}>N</span>
              <span className={styles.compassEast}>E</span>
              <span className={styles.compassSouth}>S</span>
              <span className={styles.compassWest}>W</span>
              <span className={styles.compassNeedle} ref={needleRef}>
                <span className={styles.needleNorth} />
                <span className={styles.needleSouth} />
                <span className={styles.needlePivot} />
              </span>
              <span className={styles.logoCore}>
                <img src={andesIsotype} alt="" />
              </span>
            </div>

            <div className={`${styles.statementSlot} ${styles.visionSlot}`}>
              <article className={`${styles.statement} ${styles.vision}`}>
                <div className={styles.statementMeta}>
                  <span className={styles.statementNumber}>02</span>
                  <span>{t("purpose.vision.label")}</span>
                </div>
                <p className={styles.statementText}>
                  {t("purpose.vision.statement")}
                </p>
                <p className={styles.statementSupport}>
                  {t("purpose.vision.support")}
                </p>
              </article>
            </div>
          </div>
        </RevealOnScroll>

        <div className={styles.valuesSection}>
          <RevealOnScroll distancePx={18} durationMs={850}>
            <div className={styles.valuesHeading}>
              <h3>{t("purpose.values.title")}</h3>
              <p>{t("purpose.values.intro")}</p>
            </div>
          </RevealOnScroll>

          <ol className={styles.valuesList}>
            {VALUE_KEYS.map((valueKey, index) => (
              <li key={valueKey}>
                <RevealOnScroll
                  className={styles.valueReveal}
                  delayMs={index * 70}
                  distancePx={18}
                  durationMs={850}
                >
                  <article className={styles.valueItem}>
                    <div className={styles.valueTopline}>
                      <span className={styles.valueNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.valueArrow} aria-hidden="true">
                        ↗
                      </span>
                    </div>
                    <h4>{t(`purpose.values.items.${valueKey}.title`)}</h4>
                    <p>{t(`purpose.values.items.${valueKey}.description`)}</p>
                  </article>
                </RevealOnScroll>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
