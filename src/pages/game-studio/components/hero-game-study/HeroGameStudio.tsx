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
const EXPLOSION_POOL_SIZE = 4;
const EXPLOSION_SPARK_COUNT = 6;
const MAX_ACTIVE_EXPLOSIONS = 3;
const EXPLOSION_COOLDOWN = 450;
const EXPLOSION_DISTANCE_MIN = 140;
const EXPLOSION_DISTANCE_MAX = 220;

const explosionPool = Array.from(
  { length: EXPLOSION_POOL_SIZE },
  (_, index) => index,
);
const explosionSparks = Array.from(
  { length: EXPLOSION_SPARK_COUNT },
  (_, index) => index,
);
const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

export default function HeroGameStudio() {
  const { t } = useTranslation("gameStudio");
  const title = t("title").toUpperCase();
  const heroRef = useRef<HTMLElement | null>(null);
  const particleStageRef = useRef<HTMLDivElement | null>(null);
  const explosionLayerRef = useRef<HTMLDivElement | null>(null);
  const helicopterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const particleStage = particleStageRef.current;
    const explosionLayer = explosionLayerRef.current;
    const helicopter = helicopterRef.current;
    if (!hero || !particleStage || !explosionLayer || !helicopter) return;

    const explosionNodes = Array.from(
      explosionLayer.querySelectorAll<HTMLElement>("[data-flight-explosion]"),
    );

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
    let activeExplosions = 0;
    let distanceSinceExplosion = 0;
    let lastExplosionTimestamp = Number.NEGATIVE_INFINITY;
    let nextExplosionDistance = randomBetween(
      EXPLOSION_DISTANCE_MIN,
      EXPLOSION_DISTANCE_MAX,
    );
    let explosionSide: 1 | -1 = 1;
    let lastFrameTimestamp = performance.now();

    const clearExplosions = () => {
      explosionNodes.forEach((explosion) => {
        explosion.classList.remove(styles.explosionActive);
        explosion.removeAttribute("style");
      });
      activeExplosions = 0;
    };

    const handleExplosionEnd = (event: AnimationEvent) => {
      const explosion = event.currentTarget as HTMLElement;
      if (event.target !== explosion) return;

      explosion.classList.remove(styles.explosionActive);
      explosion.removeAttribute("style");
      activeExplosions = Math.max(0, activeExplosions - 1);
    };

    explosionNodes.forEach((explosion) => {
      explosion.addEventListener("animationend", handleExplosionEnd);
    });

    const keepExplosionClearOfTitle = (
      candidateX: number,
      candidateY: number,
      heroRect: DOMRect,
    ) => {
      const stageRect = particleStage.getBoundingClientRect();
      const safePadding = 32;
      const safeLeft = stageRect.left - heroRect.left - safePadding;
      const safeRight = stageRect.right - heroRect.left + safePadding;
      const safeTop = stageRect.top - heroRect.top - safePadding;
      const safeBottom = stageRect.bottom - heroRect.top + safePadding;

      if (
        candidateX <= safeLeft ||
        candidateX >= safeRight ||
        candidateY <= safeTop ||
        candidateY >= safeBottom
      ) {
        return { x: candidateX, y: candidateY };
      }

      const exits = [
        { distance: candidateX - safeLeft, x: safeLeft - 20, y: candidateY },
        { distance: safeRight - candidateX, x: safeRight + 20, y: candidateY },
        { distance: candidateY - safeTop, x: candidateX, y: safeTop - 20 },
        { distance: safeBottom - candidateY, x: candidateX, y: safeBottom + 20 },
      ];
      exits.sort((first, second) => first.distance - second.distance);
      return exits[0];
    };

    const spawnExplosion = (
      timestamp: number,
      directionX: number,
      directionY: number,
      speedFactor: number,
    ) => {
      if (
        reducedMotion.matches ||
        activeExplosions >= MAX_ACTIVE_EXPLOSIONS ||
        timestamp - lastExplosionTimestamp < EXPLOSION_COOLDOWN
      ) {
        return false;
      }

      const explosion = explosionNodes.find(
        (node) => !node.classList.contains(styles.explosionActive),
      );
      if (!explosion) return false;

      const heroRect = hero.getBoundingClientRect();
      const pathDistance = randomBetween(60, 125);
      const pathOffset =
        Math.random() < 0.76 ? -pathDistance : randomBetween(-24, 38);
      const lateralOffset = randomBetween(34, 92) * explosionSide;
      const perpendicularX = -directionY;
      const perpendicularY = directionX;
      const rawX =
        currentX + directionX * pathOffset + perpendicularX * lateralOffset;
      const rawY =
        currentY + directionY * pathOffset + perpendicularY * lateralOffset;
      const clearPosition = keepExplosionClearOfTitle(rawX, rawY, heroRect);
      const horizontalGuard = clamp(heroRect.width * 0.065, 64, 92);
      const verticalGuard = clamp(heroRect.height * 0.1, 58, 84);
      const explosionX = clamp(
        clearPosition.x,
        horizontalGuard,
        heroRect.width - horizontalGuard,
      );
      const explosionY = clamp(
        clearPosition.y,
        verticalGuard,
        heroRect.height - verticalGuard,
      );
      const scale = randomBetween(0.82, 1.12) * (0.94 + speedFactor * 0.1);
      const intensity = clamp(
        randomBetween(0.78, 0.96) + speedFactor * 0.08,
        0.78,
        1,
      );

      explosion.style.setProperty("--explosion-x", `${explosionX}px`);
      explosion.style.setProperty("--explosion-y", `${explosionY}px`);
      explosion.style.setProperty("--explosion-scale", scale.toFixed(3));
      explosion.style.setProperty(
        "--explosion-rotation",
        `${randomBetween(-24, 24).toFixed(2)}deg`,
      );
      explosion.style.setProperty(
        "--explosion-intensity",
        intensity.toFixed(3),
      );
      explosion.style.setProperty(
        "--explosion-drift-x",
        `${(-directionX * 18 + perpendicularX * explosionSide * 9).toFixed(2)}px`,
      );
      explosion.style.setProperty(
        "--explosion-drift-y",
        `${(-directionY * 18 + perpendicularY * explosionSide * 9).toFixed(2)}px`,
      );
      explosion.classList.add(styles.explosionActive);

      activeExplosions += 1;
      explosionSide = explosionSide === 1 ? -1 : 1;
      lastExplosionTimestamp = timestamp;
      distanceSinceExplosion = 0;
      nextExplosionDistance = randomBetween(
        EXPLOSION_DISTANCE_MIN,
        EXPLOSION_DISTANCE_MAX,
      );
      return true;
    };

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
        distanceSinceExplosion += movementDistance;

        if (distanceSinceExplosion >= nextExplosionDistance) {
          spawnExplosion(timestamp, directionX, directionY, speedFactor);
        }

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
      distanceSinceExplosion = 0;
      nextExplosionDistance = randomBetween(
        EXPLOSION_DISTANCE_MIN,
        EXPLOSION_DISTANCE_MAX,
      );
      helicopter.classList.remove(styles.helicopterActive);
      setWakeActive(false);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const handleMotionPreference = () => {
      setWakeActive(false);
      if (reducedMotion.matches) {
        clearExplosions();
        distanceSinceExplosion = 0;
      }
      if (pointerInside) queueRender();
    };

    const handlePointerCapability = () => {
      if (!finePointer.matches) {
        handlePointerLeave();
        clearExplosions();
      }
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
      explosionNodes.forEach((explosion) => {
        explosion.removeEventListener("animationend", handleExplosionEnd);
      });
      clearExplosions();
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
          {t("eyebrow")}
          <span aria-hidden="true" />
        </p>

        <h1 className={styles.visuallyHidden} id="game-studio-hero-title">
          {title}
        </h1>

        <div
          ref={particleStageRef}
          className={styles.particleStage}
          aria-hidden="true"
        >
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

        <p className={styles.description}>{t("description")}</p>
      </div>

      <div className={styles.orbit} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div
        ref={explosionLayerRef}
        className={styles.explosionField}
        aria-hidden="true"
      >
        {explosionPool.map((explosionIndex) => (
          <div
            className={styles.explosion}
            data-flight-explosion
            key={explosionIndex}
          >
            <span className={styles.explosionShockwave} />
            <span className={styles.explosionFlash} />
            <span className={styles.explosionFire} />
            <span className={styles.explosionCore} />
            <span className={styles.explosionSmoke}>
              <span />
              <span />
              <span />
            </span>
            <span className={styles.explosionSparks}>
              {explosionSparks.map((sparkIndex) => (
                <span key={sparkIndex} />
              ))}
            </span>
          </div>
        ))}
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
