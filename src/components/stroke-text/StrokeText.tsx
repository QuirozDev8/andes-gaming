import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./StrokeText.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type StrokeTextTrigger = "mount" | "hover" | "scroll" | "loop";
export type StrokeTextFillMode = "wipe" | "fade" | "none";
export type StrokeTextAlignment = "start" | "center" | "end";

export interface StrokeTextGradient {
  from: string;
  to: string;
}

export interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  fillGradient?: StrokeTextGradient;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: StrokeTextTrigger;
  fillMode?: StrokeTextFillMode;
  align?: StrokeTextAlignment;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface StrokeTextBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

type StrokeTextStyle = CSSProperties & {
  "--stroke-text-height"?: string;
};

const DEFAULT_TEXT = "Draw Attention";

const StrokeText = ({
  text = DEFAULT_TEXT,
  strokeColor = "var(--andes-violet, #9912f3)",
  fillColor = "var(--andes-white, #ffffff)",
  fillGradient,
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  align = "center",
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  reverse = false,
  className = "",
  style = {},
}: StrokeTextProps) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const strokeTextRef = useRef<SVGTextElement | null>(null);
  const wipeRectRef = useRef<SVGRectElement | null>(null);
  const [box, setBox] = useState<StrokeTextBox | null>(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const gradientId = `stroke-text-gradient-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const characters = useMemo(() => Array.from(String(text ?? "")), [text]);
  const dash = Math.max(fontSize * 7, 200);

  const fontStyle = useMemo<CSSProperties>(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing],
  );

  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;

      let boundingBox: DOMRect | undefined;
      try {
        boundingBox = strokeTextRef.current.getBBox();
      } catch {
        return;
      }

      if (!boundingBox || !boundingBox.width) return;

      const padding = Math.max(Number(strokeWidth) || 1, fontSize * 0.1);
      const nextBox = {
        x: boundingBox.x - padding,
        y: boundingBox.y - padding,
        width: boundingBox.width + padding * 2,
        height: boundingBox.height + padding * 2,
      };

      setBox((previousBox) =>
        previousBox &&
        Math.abs(previousBox.x - nextBox.x) < 0.5 &&
        Math.abs(previousBox.width - nextBox.width) < 0.5 &&
        Math.abs(previousBox.y - nextBox.y) < 0.5
          ? previousBox
          : nextBox,
      );
    };

    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => undefined);
    }

    return () => {
      cancelled = true;
    };
  }, [characters, fontSize, fontWeight, letterSpacing, strokeWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === "undefined" || !root || !box) return undefined;

    const strokes = gsap.utils.toArray<SVGElement>(
      root.querySelectorAll("[data-stroke-char]"),
    );
    const fills = gsap.utils.toArray<SVGElement>(
      root.querySelectorAll("[data-fill-char]"),
    );
    const wipe = wipeRectRef.current;

    if (!strokes.length) return undefined;

    const fillEnabled = fillMode !== "none";
    const useWipe = fillEnabled && fillMode === "wipe";
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig: number | gsap.StaggerVars = reverse
      ? { each: stagger, from: "end" }
      : stagger;
    const targets = [...strokes, ...fills, wipe].filter(
      (target): target is SVGElement => Boolean(target),
    );

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) {
        gsap.set(wipe, { attr: { width: fillEnabled ? box.width : 0 } });
      }
    };

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setEnd();
      return () => gsap.killTweensOf(targets);
    }

    const buildTimeline = () => {
      setStart();

      const timeline = gsap.timeline({
        paused: true,
        repeat: trigger === "loop" ? -1 : 0,
        repeatDelay: trigger === "loop" ? 0.9 : 0,
        defaults: { overwrite: "auto" },
      });

      timeline.to(
        strokes,
        {
          strokeDashoffset: 0,
          duration: drawDuration,
          ease,
          stagger: staggerConfig,
        },
        0,
      );

      if (useWipe && wipe) {
        timeline.to(
          wipe,
          {
            attr: { width: box.width },
            duration: fillDuration,
            ease: "power2.inOut",
          },
          drawDuration + fillDelay,
        );
      } else if (fillEnabled) {
        timeline.to(
          fills,
          {
            opacity: 1,
            duration: fillDuration,
            ease: "power2.out",
            stagger: staggerConfig,
          },
          drawDuration + fillDelay,
        );
      }

      return timeline;
    };

    let timeline: gsap.core.Timeline | null = null;
    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;
    let removeHover: (() => void) | null = null;

    if (trigger === "hover") {
      setEnd();

      const play = () => {
        timeline?.kill();
        timeline = buildTimeline();
        timeline.play(0);
      };

      root.addEventListener("pointerenter", play);
      removeHover = () => root.removeEventListener("pointerenter", play);
    } else {
      timeline = buildTimeline();

      if (trigger === "scroll") {
        scrollTrigger = ScrollTrigger.create({
          trigger: root,
          start: "top 82%",
          once: true,
          onEnter: () => timeline?.play(0),
        });
      } else {
        timeline.play(0);
      }
    }

    return () => {
      removeHover?.();
      scrollTrigger?.kill();
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [box, dash, drawDuration, fillDelay, stagger, ease, trigger, fillMode, reverse]);

  const viewBox = box
    ? `${box.x} ${box.y} ${box.width} ${box.height}`
    : `0 ${-fontSize} 600 ${fontSize * 1.3}`;
  const rootStyle: StrokeTextStyle = {
    "--stroke-text-height": `${Math.round(fontSize * 1.3)}px`,
    ...style,
  };
  const preserveAspectRatio = {
    start: "xMinYMid meet",
    center: "xMidYMid meet",
    end: "xMaxYMid meet",
  }[align];

  return (
    <span
      ref={rootRef}
      className={`stroke-text ${trigger === "hover" ? "stroke-text--hover" : ""} ${className}`.trim()}
      style={rootStyle}
      role="img"
      aria-label={String(text ?? "")}
    >
      <svg
        className="stroke-text__svg"
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
        aria-hidden="true"
      >
        {(fillGradient || (fillMode === "wipe" && box)) && (
          <defs>
            {fillGradient && (
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={fillGradient.from} />
                <stop offset="100%" stopColor={fillGradient.to} />
              </linearGradient>
            )}
            {fillMode === "wipe" && box && (
              <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
                <rect
                  ref={wipeRectRef}
                  x={box.x}
                  y={box.y}
                  width="0"
                  height={box.height}
                />
              </clipPath>
            )}
          </defs>
        )}

        <text
          ref={strokeTextRef}
          className="stroke-text__stroke"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={fontStyle}
        >
          {characters.map((character, index) => (
            <tspan data-stroke-char key={`stroke-${index}`}>
              {character}
            </tspan>
          ))}
        </text>

        <text
          className="stroke-text__fill"
          x="0"
          y="0"
          fill={fillGradient ? `url(#${gradientId})` : fillColor}
          stroke="none"
          style={fontStyle}
          clipPath={
            fillMode === "wipe" && box ? `url(#${wipeId})` : undefined
          }
        >
          {characters.map((character, index) => (
            <tspan data-fill-char key={`fill-${index}`}>
              {character}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
};

export { StrokeText };
export default StrokeText;
