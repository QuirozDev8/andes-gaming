import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import comandoCursor from "../../../../assets/img/comando-cursor.webp";
import ParticleText from "../../../../components/Particle-text";
import styles from "./HeroGame.module.css";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
const FLIGHT_RESPONSE = 0.009;
const FLIGHT_MOVEMENT_THRESHOLD = 0.08;
const FLIGHT_SETTLE_THRESHOLD = 0.15;
const POINTER_DIRECTION_THRESHOLD = 0.6;

export default function HeroGameStudio() {
  const { t } = useTranslation("home");
  const title = t("ownGames.eyebrow").toUpperCase();
  const heroRef = useRef<HTMLElement | null>(null);
  const helicopterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const helicopter = helicopterRef.current;
    if (!hero || !helicopter) return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrame: number | null = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let pointerInside = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let pendingPointerX = 0;
    let pendingPointerY = 0;
    let pendingMovementX = 0;
    let pendingMovementY = 0;
    let pointerUpdatePending = false;
    let followDirectionX = 1;
    let followDirectionY = 0;
    let facingDirection: 1 | -1 = 1;
    let wakeStrength = 0;
    let wakeActive = false;
    let lastFrameTimestamp = performance.now();

    const queueRender = () => {
      if (animationFrame === null) {
        lastFrameTimestamp = performance.now();
        animationFrame = window.requestAnimationFrame(renderFlight);
      }
    };

    const setFacingDirection = (nextDirection: 1 | -1) => {
      if (nextDirection === facingDirection) return;
      facingDirection = nextDirection;
      helicopter.classList.toggle(
        styles.helicopterFacingLeft,
        facingDirection === -1,
      );
    };

    const setWakeActive = (active: boolean) => {
      if (active === wakeActive) return;
      wakeActive = active;
      helicopter.classList.toggle(styles.helicopterMoving, active);
      if (!active) helicopter.style.setProperty("--flight-bank", "0deg");
    };

    const renderFlight = (timestamp: number) => {
      if (pointerUpdatePending) applyPointerTarget();

      const elapsed = Math.max(8, Math.min(40, timestamp - lastFrameTimestamp));
      const follow = reducedMotion.matches
        ? 1
        : 1 - Math.exp(-elapsed * FLIGHT_RESPONSE);
      const previousX = currentX;
      const previousY = currentY;
      lastFrameTimestamp = timestamp;

      currentX += (targetX - currentX) * follow;
      currentY += (targetY - currentY) * follow;

      helicopter.style.setProperty("--flight-x", `${currentX}px`);
      helicopter.style.setProperty("--flight-y", `${currentY}px`);

      const movementX = currentX - previousX;
      const movementY = currentY - previousY;
      const movementDistance = Math.hypot(movementX, movementY);
      const activelyFollowing =
        pointerInside &&
        !reducedMotion.matches &&
        movementDistance > FLIGHT_MOVEMENT_THRESHOLD;

      if (activelyFollowing) {
        if (Math.abs(movementX) > FLIGHT_MOVEMENT_THRESHOLD) {
          setFacingDirection(movementX < 0 ? -1 : 1);
        }

        const directionX = movementX / movementDistance;
        const directionY = movementY / movementDistance;
        const speedFactor = clamp(movementDistance / elapsed / 0.72, 0, 1);
        wakeStrength = wakeStrength * 0.62 + speedFactor * 0.38;

        helicopter.style.setProperty(
          "--wake-angle",
          `${Math.atan2(directionY, directionX) + Math.PI}rad`,
        );
        helicopter.style.setProperty(
          "--wake-scale",
          String(0.5 + wakeStrength * 0.62),
        );
        helicopter.style.setProperty(
          "--wake-opacity",
          String(0.3 + wakeStrength * 0.48),
        );
        helicopter.style.setProperty(
          "--flight-bank",
          `${clamp(directionY * facingDirection * 4.5, -4.5, 4.5)}deg`,
        );
        setWakeActive(true);
      } else {
        wakeStrength *= 0.78;
        setWakeActive(false);
      }

      if (
        pointerInside &&
        (Math.abs(targetX - currentX) > FLIGHT_SETTLE_THRESHOLD ||
          Math.abs(targetY - currentY) > FLIGHT_SETTLE_THRESHOLD
        )
      ) {
        animationFrame = window.requestAnimationFrame(renderFlight);
      } else {
        currentX = targetX;
        currentY = targetY;
        helicopter.style.setProperty("--flight-x", `${currentX}px`);
        helicopter.style.setProperty("--flight-y", `${currentY}px`);
        animationFrame = null;
      }
    };

    const applyPointerTarget = () => {
      const pointerClientX = pendingPointerX;
      const pointerClientY = pendingPointerY;
      const entryMovementX = pendingMovementX;
      const entryMovementY = pendingMovementY;
      pointerUpdatePending = false;
      pendingMovementX = 0;
      pendingMovementY = 0;

      const heroRect = hero.getBoundingClientRect();
      const heroWidth = heroRect.width;
      const heroHeight = heroRect.height;
      const pointerX = clamp(pointerClientX - heroRect.left, 0, heroWidth);
      const pointerY = clamp(pointerClientY - heroRect.top, 0, heroHeight);
      const entering = !pointerInside;

      const movementX = entering ? entryMovementX : pointerX - lastPointerX;
      const movementY = entering ? entryMovementY : pointerY - lastPointerY;
      const movementDistance = Math.hypot(movementX, movementY);

      if (
        !reducedMotion.matches &&
        entering &&
        movementDistance > POINTER_DIRECTION_THRESHOLD
      ) {
        followDirectionX = movementX / movementDistance;
        followDirectionY = movementY / movementDistance;
      } else if (
        !reducedMotion.matches &&
        movementDistance > POINTER_DIRECTION_THRESHOLD
      ) {
        const directionX = movementX / movementDistance;
        const directionY = movementY / movementDistance;
        const directionBlend = clamp(movementDistance / 44, 0.18, 0.54);
        const blendedX =
          followDirectionX * (1 - directionBlend) +
          directionX * directionBlend;
        const blendedY =
          followDirectionY * (1 - directionBlend) +
          directionY * directionBlend;
        const blendedLength = Math.hypot(blendedX, blendedY) || 1;
        followDirectionX = blendedX / blendedLength;
        followDirectionY = blendedY / blendedLength;
      } else if (entering) {
        followDirectionX = pointerX > heroWidth / 2 ? -1 : 1;
        followDirectionY = 0;
      }

      if (entering && Math.abs(followDirectionX) > 0.12) {
        setFacingDirection(followDirectionX < 0 ? -1 : 1);
      }

      const followDistance = clamp(heroWidth * 0.055, 52, 82);
      const horizontalGuard = clamp(heroWidth * 0.055, 42, 78);
      const verticalGuard = clamp(heroHeight * 0.075, 38, 62);
      targetX = clamp(
        pointerX - followDirectionX * followDistance,
        horizontalGuard,
        heroWidth - horizontalGuard,
      );
      targetY = clamp(
        pointerY - followDirectionY * followDistance + 10,
        verticalGuard,
        heroHeight - verticalGuard,
      );

      if (entering) {
        currentX = targetX;
        currentY = targetY;
        helicopter.style.setProperty("--flight-x", `${currentX}px`);
        helicopter.style.setProperty("--flight-y", `${currentY}px`);
        helicopter.classList.add(styles.helicopterActive);
      }

      pointerInside = true;
      lastPointerX = pointerX;
      lastPointerY = pointerY;
    };

    const handlePointerInput = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !finePointer.matches) return;

      pendingPointerX = event.clientX;
      pendingPointerY = event.clientY;
      pendingMovementX += event.movementX;
      pendingMovementY += event.movementY;
      pointerUpdatePending = true;
      queueRender();
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      pointerUpdatePending = false;
      pendingMovementX = 0;
      pendingMovementY = 0;
      wakeStrength = 0;
      helicopter.classList.remove(styles.helicopterActive);
      setWakeActive(false);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const handleMotionPreference = () => {
      setWakeActive(false);
      if (pointerInside) queueRender();
    };

    const handlePointerCapability = () => {
      if (!finePointer.matches) handlePointerLeave();
    };

    hero.addEventListener("pointerenter", handlePointerInput, {
      passive: true,
    });
    hero.addEventListener("pointermove", handlePointerInput, {
      passive: true,
    });
    hero.addEventListener("pointerleave", handlePointerLeave);
    reducedMotion.addEventListener("change", handleMotionPreference);
    finePointer.addEventListener("change", handlePointerCapability);

    return () => {
      hero.removeEventListener("pointerenter", handlePointerInput);
      hero.removeEventListener("pointermove", handlePointerInput);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      finePointer.removeEventListener("change", handlePointerCapability);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="game-studio-hero-title"
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true" />
          Andes Gaming Originals
          <span aria-hidden="true" />
        </p>

        <h1 className={styles.visuallyHidden} id="game-studio-hero-title">
          {title}
        </h1>

        <div className={styles.particleStage} aria-hidden="true">
          <ParticleText
            text={title}
            particleSize={2}
            density={4}
            color="#9912f3"
            highlightColor="#07f2f2"
            scatter={180}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0.7}
            trigger="mount"
            fontSize="clamp(3.25rem, 11vw, 9.75rem)"
            fontWeight={900}
            fontFamily='"Exo 2", sans-serif'
            fontStyle="italic"
            glow
          />
        </div>

        <p className={styles.description}>{t("ownGames.description")}</p>
      </div>

      <div className={styles.orbit} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div
        ref={helicopterRef}
        className={styles.helicopterFlight}
        aria-hidden="true"
      >
        <div className={styles.airWake}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.flightAircraft}>
          <img src={comandoCursor} alt="" draggable={false} />
        </div>
      </div>
    </section>
  );
}
