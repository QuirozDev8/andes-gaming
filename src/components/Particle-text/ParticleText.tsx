import { useEffect, useRef, type CSSProperties } from "react";
import "./ParticleText.css";

export interface ParticleTextProps {
  text?: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: "mount" | "hover" | "click";
  fontSize?: number | string;
  fontWeight?: number | string;
  fontFamily?: string;
  fontStyle?: CSSProperties["fontStyle"];
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
}

type Rgb = { r: number; g: number; b: number };
type Target = { x: number; y: number; alpha: number };
type ParticleTextStyle = CSSProperties & {
  "--particle-text-glow-color"?: string;
};
type Particle = {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  seed: number;
  depth: number;
  delay: number;
};

const hexToRgb = (hex: string): Rgb | null => {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: Number.parseInt(clean.slice(0, 2), 16),
    g: Number.parseInt(clean.slice(2, 4), 16),
    b: Number.parseInt(clean.slice(4, 6), 16),
  };
};

const mixRgb = (from: Rgb, to: Rgb, amount: number): Rgb => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

const rgbToCss = (rgb: Rgb): string =>
  `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const easeOutCubic = (value: number): number => 1 - (1 - value) ** 3;
const MAX_DEVICE_PIXEL_RATIO = 2;
const MIN_PARTICLES = 900;
const MAX_PARTICLES = 4200;
const PARTICLE_AREA_RATIO = 110;
const PALETTE_STEPS = 32;
const POINTER_SMOOTHING = 0.18;
const PARTICLE_FOLLOW = 0.22;

const resolveFontSize = (
  value: number | string,
  container: HTMLDivElement,
  fontWeight: number | string,
  fontFamily: string,
  fontStyle: CSSProperties["fontStyle"],
): number => {
  if (typeof value === "number") return value;

  const probe = document.createElement("span");
  probe.textContent = "M";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.fontSize = value;
  probe.style.fontWeight = String(fontWeight);
  probe.style.fontFamily = fontFamily;
  probe.style.fontStyle = fontStyle ?? "normal";
  container.appendChild(probe);
  const size = Number.parseFloat(window.getComputedStyle(probe).fontSize) || 96;
  probe.remove();
  return size;
};

const waitForFonts = async (font: string): Promise<void> => {
  if (!("fonts" in document)) return;

  try {
    await document.fonts.load(font);
  } catch {
    // The browser will keep the computed fallback family.
  }

  await document.fonts.ready;
};

const ParticleText = ({
  text = "ANDES GAMING",
  particleSize = 2,
  density = 4,
  color = "#9912f3",
  highlightColor = "#07f2f2",
  scatter = 180,
  gatherDuration = 1600,
  stagger = 420,
  pointerRepel = 40,
  repelRadius = 120,
  idleDrift = 0.7,
  trigger = "mount",
  fontSize = "clamp(3rem, 12vw, 8rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  fontStyle = "italic",
  glow = true,
  className = "",
  style,
}: ParticleTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootStyle: ParticleTextStyle = {
    ...style,
    "--particle-text-glow-color": highlightColor,
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let particles: Particle[] = [];
    let animationFrame: number | null = null;
    let resizeFrame: number | null = null;
    let buildId = 0;
    let gathering = false;
    let gatherStart = 0;
    let mountGatherStarted = false;
    let reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let width = 0;
    let height = 0;
    let pixelRatio = 0;
    let inViewport = true;

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
    };

    const startGather = (fromScatter = true): void => {
      if (!particles.length) return;

      const spread = reducedMotion ? 0 : scatter;
      particles.forEach((particle) => {
        if (fromScatter) {
          const angle = particle.seed * Math.PI * 2;
          const distance = spread * (0.35 + particle.depth * 0.75);
          particle.x =
            particle.targetX +
            Math.cos(angle) * distance +
            (particle.depth - 0.5) * spread * 0.55;
          particle.y =
            particle.targetY +
            Math.sin(angle) * distance +
            (particle.seed - 0.5) * spread * 0.55;
        }

        particle.startX = particle.x;
        particle.startY = particle.y;
        particle.delay = reducedMotion ? 0 : particle.seed * stagger;
      });

      gatherStart = performance.now();
      gathering = true;
    };

    const placeParticlesAtTargets = (): void => {
      for (const particle of particles) {
        particle.x = particle.targetX;
        particle.y = particle.targetY;
        particle.startX = particle.targetX;
        particle.startY = particle.targetY;
        particle.delay = 0;
      }
      gathering = false;
    };

    const drawParticle = (particle: Particle): void => {
      const size = particle.size;

      if (size <= 2.1) {
        context.fillRect(
          particle.x - size / 2,
          particle.y - size / 2,
          size,
          size,
        );
        return;
      }

      context.beginPath();
      context.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
      context.fill();
    };

    const canRender = (): boolean =>
      inViewport && document.visibilityState !== "hidden";

    const render = (now: number): void => {
      animationFrame = null;
      if (!canRender() || particles.length === 0) return;

      context.clearRect(0, 0, width, height);
      context.globalAlpha = 1;

      if (pointer.active) {
        pointer.smoothX +=
          (pointer.x - pointer.smoothX) * POINTER_SMOOTHING;
        pointer.smoothY +=
          (pointer.y - pointer.smoothY) * POINTER_SMOOTHING;
      }

      let complete = true;
      let particlesMoving = false;
      const gatherDurationMs = Math.max(
        1,
        reducedMotion ? 1 : gatherDuration,
      );
      const particleFollow = reducedMotion ? 1 : PARTICLE_FOLLOW;
      const driftActive = !reducedMotion && idleDrift > 0;
      const repelActive =
        pointer.active &&
        !reducedMotion &&
        pointerRepel > 0 &&
        repelRadius > 0;
      const repelRadiusSquared = repelRadius * repelRadius;
      const driftTime = now * 0.001;
      let activeColor = "";

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        let baseX = particle.targetX;
        let baseY = particle.targetY;
        let progress = 1;

        if (gathering) {
          const local =
            (now - gatherStart - particle.delay) / gatherDurationMs;
          progress = clamp(local, 0, 1);
          const eased = easeOutCubic(progress);
          baseX = particle.startX + (particle.targetX - particle.startX) * eased;
          baseY = particle.startY + (particle.targetY - particle.startY) * eased;
          if (progress < 1) complete = false;
        } else if (driftActive) {
          baseX +=
            Math.sin(driftTime * 0.9 + particle.seed * 10) *
            idleDrift *
            particle.depth;
          baseY +=
            Math.cos(driftTime * 0.75 + particle.depth * 10) *
            idleDrift *
            particle.depth;
        }

        if (repelActive) {
          const deltaX = baseX - pointer.smoothX;
          const deltaY = baseY - pointer.smoothY;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;
          if (distanceSquared > 0 && distanceSquared < repelRadiusSquared) {
            const distance = Math.sqrt(distanceSquared);
            const force = (1 - distance / repelRadius) ** 2 * pointerRepel;
            baseX += (deltaX / distance) * force;
            baseY += (deltaY / distance) * force;
          }
        }

        const remainingX = baseX - particle.x;
        const remainingY = baseY - particle.y;
        if (Math.abs(remainingX) > 0.025 || Math.abs(remainingY) > 0.025) {
          particlesMoving = true;
        }
        particle.x += remainingX * particleFollow;
        particle.y += remainingY * particleFollow;
        if (gathering) {
          context.globalAlpha = 0.35 + progress * 0.65;
        }
        if (particle.color !== activeColor) {
          activeColor = particle.color;
          context.fillStyle = activeColor;
        }
        drawParticle(particle);
      }

      context.globalAlpha = 1;
      if (gathering && complete) gathering = false;

      const pointerSmoothing =
        pointer.active &&
        (Math.abs(pointer.x - pointer.smoothX) > 0.1 ||
          Math.abs(pointer.y - pointer.smoothY) > 0.1);
      const keepAnimating =
        gathering ||
        (!reducedMotion && idleDrift > 0) ||
        particlesMoving ||
        pointerSmoothing;

      if (keepAnimating) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const ensureRenderLoop = (): void => {
      if (animationFrame === null && canRender() && particles.length > 0) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const cancelRenderLoop = (): void => {
      if (animationFrame === null) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    };

    const sampleText = async (force = false): Promise<void> => {
      const rect = container.getBoundingClientRect();
      const nextWidth = Math.floor(rect.width);
      const nextHeight = Math.floor(rect.height);
      const nextPixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO,
      );

      if (nextWidth <= 0 || nextHeight <= 0) {
        buildId += 1;
        width = nextWidth;
        height = nextHeight;
        particles = [];
        cancelRenderLoop();
        return;
      }

      if (
        !force &&
        particles.length > 0 &&
        nextWidth === width &&
        nextHeight === height &&
        nextPixelRatio === pixelRatio
      ) {
        return;
      }

      const currentBuild = ++buildId;
      width = nextWidth;
      height = nextHeight;
      pixelRatio = nextPixelRatio;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const computed = window.getComputedStyle(container);
      const resolvedFamily =
        fontFamily === "inherit"
          ? computed.fontFamily || "sans-serif"
          : fontFamily;
      let resolvedSize = resolveFontSize(
        fontSize,
        container,
        fontWeight,
        resolvedFamily,
        fontStyle,
      );
      const resolvedStyle = fontStyle ?? "normal";
      let font = `${resolvedStyle} ${fontWeight} ${resolvedSize}px ${resolvedFamily}`;

      await waitForFonts(font);
      if (currentBuild !== buildId) return;

      const offscreen = document.createElement("canvas");
      const offscreenContext = offscreen.getContext("2d", {
        willReadFrequently: true,
      });
      if (!offscreenContext) return;

      const content = String(text || " ");
      const maxTextWidth = width * 0.92;
      offscreenContext.font = font;
      let metrics = offscreenContext.measureText(content);
      const measuredWidth = Math.max(1, metrics.width);
      if (measuredWidth > maxTextWidth) {
        resolvedSize = Math.max(
          18,
          resolvedSize * (maxTextWidth / measuredWidth),
        );
        font = `${resolvedStyle} ${fontWeight} ${resolvedSize}px ${resolvedFamily}`;
        await waitForFonts(font);
        if (currentBuild !== buildId) return;
        offscreenContext.font = font;
        metrics = offscreenContext.measureText(content);
      }

      const left = Math.ceil(metrics.actualBoundingBoxLeft || 0);
      const right = Math.ceil(
        metrics.actualBoundingBoxRight || metrics.width,
      );
      const ascent = Math.ceil(
        metrics.actualBoundingBoxAscent || resolvedSize * 0.78,
      );
      const descent = Math.ceil(
        metrics.actualBoundingBoxDescent || resolvedSize * 0.22,
      );
      const padding = Math.max(12, Math.ceil(resolvedSize * 0.08));

      offscreen.width = Math.max(1, left + right) + padding * 2;
      offscreen.height = Math.max(1, ascent + descent) + padding * 2;
      offscreenContext.clearRect(0, 0, offscreen.width, offscreen.height);
      offscreenContext.font = font;
      offscreenContext.textAlign = "left";
      offscreenContext.textBaseline = "alphabetic";
      offscreenContext.fillStyle = "#ffffff";
      offscreenContext.fillText(content, padding - left, padding + ascent);

      const imageData = offscreenContext.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height,
      );
      const targets: Target[] = [];
      const step = Math.max(2, Math.floor(density));
      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const alpha =
            imageData.data[(y * offscreen.width + x) * 4 + 3] ?? 0;
          if (alpha > 40) {
            targets.push({
              x: width / 2 - offscreen.width / 2 + x,
              y: height / 2 - offscreen.height / 2 + y,
              alpha: alpha / 255,
            });
          }
        }
      }

      const maxParticles = Math.max(
        MIN_PARTICLES,
        Math.min(
          MAX_PARTICLES,
          Math.floor((width * height) / PARTICLE_AREA_RATIO),
        ),
      );
      const stride = Math.max(1, Math.ceil(targets.length / maxParticles));
      const baseRgb = hexToRgb(color);
      const highlightRgb = hexToRgb(highlightColor);
      const palette =
        baseRgb && highlightRgb
          ? Array.from({ length: PALETTE_STEPS }, (_, index) =>
              rgbToCss(
                mixRgb(baseRgb, highlightRgb, index / (PALETTE_STEPS - 1)),
              ),
            )
          : null;
      const nextParticles: Particle[] = [];
      const safeWidth = Math.max(1, width);
      const lastPaletteIndex = (palette?.length ?? 1) - 1;

      for (
        let targetIndex = 0, particleIndex = 0;
        targetIndex < targets.length;
        targetIndex += stride, particleIndex += 1
      ) {
        const target = targets[targetIndex];
        const seed =
          ((particleIndex * 9301 + 49297) % 233280) / 233280;
        const depth =
          0.45 + (((particleIndex * 233 + 97) % 1000) / 1000) * 0.9;
        const blend =
          palette
            ? clamp(
                target.x / safeWidth + (seed - 0.5) * 0.35,
                0,
                1,
              )
            : 0;
        const particleColor =
          palette?.[Math.round(blend * lastPaletteIndex)] ?? color;
        const angle = seed * Math.PI * 2;
        const distance =
          (reducedMotion ? 0 : scatter) * (0.35 + depth * 0.75);
        const startX =
          target.x +
          Math.cos(angle) * distance +
          (seed - 0.5) * scatter * 0.45;
        const startY =
          target.y +
          Math.sin(angle) * distance +
          (depth - 0.9) * scatter * 0.45;

        nextParticles.push({
          x: reducedMotion ? target.x : startX,
          y: reducedMotion ? target.y : startY,
          startX,
          startY,
          targetX: target.x,
          targetY: target.y,
          size: Math.max(0.6, particleSize * (0.75 + target.alpha * 0.45)),
          color: particleColor,
          seed,
          depth,
          delay: seed * stagger,
        });
      }

      if (palette) {
        nextParticles.sort((first, second) =>
          first.color.localeCompare(second.color),
        );
      }
      particles = nextParticles;

      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.smoothX = pointer.x;
      pointer.smoothY = pointer.y;

      if (reducedMotion || trigger !== "mount" || mountGatherStarted) {
        placeParticlesAtTargets();
      } else {
        mountGatherStarted = true;
        startGather(false);
      }

      ensureRenderLoop();
    };

    const queueSample = (): void => {
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        void sampleText();
      });
    };

    const handlePointerMove = (event: PointerEvent): void => {
      pointer.x = clamp(event.offsetX, 0, width);
      pointer.y = clamp(event.offsetY, 0, height);
      pointer.active = true;
      ensureRenderLoop();
    };

    const handlePointerLeave = (): void => {
      pointer.active = false;
      ensureRenderLoop();
    };

    const handlePointerEnter = (event: PointerEvent): void => {
      handlePointerMove(event);
      if (trigger === "hover") startGather(true);
    };

    const handleClick = (): void => {
      startGather(true);
      ensureRenderLoop();
    };

    const reduceMotionQuery = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );
    const handleReduceMotionChange = (event: MediaQueryListEvent): void => {
      reducedMotion = event.matches;
      void sampleText(true);
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "hidden") {
        cancelRenderLoop();
      } else {
        if (trigger === "mount" && !reducedMotion) {
          startGather(true);
        }
        ensureRenderLoop();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        inViewport = entry.isIntersecting;
        if (inViewport) {
          ensureRenderLoop();
        } else {
          cancelRenderLoop();
        }
      },
      { rootMargin: "100px 0px" },
    );

    reduceMotionQuery?.addEventListener("change", handleReduceMotionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    canvas.addEventListener("pointerenter", handlePointerEnter, {
      passive: true,
    });
    canvas.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    canvas.addEventListener("pointerleave", handlePointerLeave);
    if (trigger === "click") canvas.addEventListener("click", handleClick);

    const resizeObserver = new ResizeObserver(queueSample);
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    queueSample();

    return () => {
      buildId += 1;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reduceMotionQuery?.removeEventListener(
        "change",
        handleReduceMotionChange,
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("pointerenter", handlePointerEnter);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      if (trigger === "click") canvas.removeEventListener("click", handleClick);
      cancelRenderLoop();
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
    };
  }, [
    text,
    particleSize,
    density,
    color,
    highlightColor,
    scatter,
    gatherDuration,
    stagger,
    pointerRepel,
    repelRadius,
    idleDrift,
    trigger,
    fontSize,
    fontWeight,
    fontFamily,
    fontStyle,
  ]);

  return (
    <div
      ref={containerRef}
      className={`particle-text${glow ? " particle-text--glow" : ""} ${className}`.trim()}
      style={rootStyle}
    >
      <canvas
        ref={canvasRef}
        className="particle-text__canvas"
        aria-hidden="true"
      />
      <span className="particle-text__sr">{text}</span>
    </div>
  );
};

export default ParticleText;
