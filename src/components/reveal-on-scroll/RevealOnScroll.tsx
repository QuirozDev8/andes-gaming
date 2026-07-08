import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./RevealOnScroll.module.css";

type RevealTag = "div" | "section" | "article";

type RevealStyle = CSSProperties & Record<`--${string}`, string | number>;

export type RevealOnScrollProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  children: ReactNode;
  delayMs?: number;
  durationMs?: number;
  distancePx?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getPrefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function RevealOnScroll({
  as: Tag = "div",
  children,
  className,
  delayMs = 0,
  durationMs = 850,
  distancePx = 16,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
  once = true,
  style,
  ...restProps
}: RevealOnScrollProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(getPrefersReducedMotion);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === "undefined") return;

    if (getPrefersReducedMotion()) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackFrame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(fallbackFrame);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.disconnect();
          }

          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  const revealStyle: RevealStyle = {
    "--reveal-delay": `${delayMs}ms`,
    "--reveal-duration": `${durationMs}ms`,
    "--reveal-distance": `${distancePx}px`,
  };

  return (
    <Tag
      {...restProps}
      className={cx(styles.root, className)}
      ref={(element) => {
        elementRef.current = element;
      }}
      style={style}
    >
      <div
        className={cx(styles.content, isVisible && styles.visible)}
        style={revealStyle}
      >
        {children}
      </div>
    </Tag>
  );
}

export default RevealOnScroll;
