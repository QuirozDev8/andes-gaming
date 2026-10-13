import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Gamepad2, Globe2, Network, UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./Metrics.module.css";

type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  suffixKey?: string;
  decimals?: number;
  labelKey: string;
  icon: LucideIcon;
};

const metrics: readonly Metric[] = [
  {
    value: 90,
    prefix: "+",
    labelKey: "metrics.providers",
    icon: UsersRound,
  },
  {
    value: 12000,
    prefix: "+",
    labelKey: "metrics.games",
    icon: Gamepad2,
  },
  {
    value: 6,
    prefix: "+",
    labelKey: "metrics.experience",
    suffixKey: "metrics.yearsSuffix",
    icon: Globe2,
  },
  {
    value: 1,
    labelKey: "metrics.integration",
    suffixKey: "metrics.apiSuffix",
    icon: Network,
  },
];

const animationDurationMs = 1500;

function formatMetricValue(
  metric: Metric,
  value: number,
  locale: string,
  suffixText = "",
) {
  const formattedValue = value.toLocaleString(locale, {
    minimumFractionDigits: metric.decimals ?? 0,
    maximumFractionDigits: metric.decimals ?? 0,
  });

  return `${metric.prefix ?? ""}${formattedValue}${suffixText}`;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

function useCountUp(
  target: number,
  decimals: number,
  shouldStart: boolean,
  shouldReduceMotion: boolean,
) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    if (!shouldStart) return;

    let animationFrame = 0;
    let startTime = 0;

    const animate = (time: number) => {
      if (startTime === 0) {
        startTime = time;
      }

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / animationDurationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = target * easedProgress;

      setCurrentValue(
        decimals > 0
          ? Number(nextValue.toFixed(decimals))
          : Math.round(nextValue),
      );

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }

      setCurrentValue(target);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [decimals, shouldReduceMotion, shouldStart, target]);

  return shouldReduceMotion ? target : currentValue;
}

function AnimatedMetricValue({
  metric,
  shouldStart,
  shouldReduceMotion,
  locale,
  suffixText = "",
}: {
  metric: Metric;
  shouldStart: boolean;
  shouldReduceMotion: boolean;
  locale: string;
  suffixText?: string;
}) {
  const value = useCountUp(
    metric.value,
    metric.decimals ?? 0,
    shouldStart,
    shouldReduceMotion,
  );
  const finalValue = formatMetricValue(
    metric,
    metric.value,
    locale,
    suffixText,
  );
  const visualValue = formatMetricValue(metric, value, locale, suffixText);

  return (
    <strong className={styles.value} aria-label={finalValue}>
      <span aria-hidden="true">{visualValue}</span>
    </strong>
  );
}

export function Metrics() {
  const { t, i18n } = useTranslation("home");
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldStartCounter = hasEnteredView || prefersReducedMotion;
  const numberLocale = i18n.resolvedLanguage?.startsWith("en")
    ? "en-US"
    : "es-CO";

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const section = sectionRef.current;
    if (!section || hasEnteredView) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackFrame = requestAnimationFrame(() => {
        setHasEnteredView(true);
      });

      return () => {
        cancelAnimationFrame(fallbackFrame);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setHasEnteredView(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.28,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasEnteredView, prefersReducedMotion]);

  return (
    <section
      className={styles.metrics}
      aria-label={t("metrics.ariaLabel")}
      ref={sectionRef}
    >
      <div className="container position-relative">
        <ul className={styles.grid}>
          {metrics.map((metric) => {
            const MetricIcon = metric.icon;
            const suffixText = metric.suffixKey
              ? t(metric.suffixKey)
              : (metric.suffix ?? "");

            return (
              <li className={styles.item} key={metric.labelKey}>
                <div className={styles.iconWrap}>
                  <MetricIcon aria-hidden="true" strokeWidth={1.7} />
                </div>
                <div className={styles.content}>
                  <AnimatedMetricValue
                    metric={metric}
                    shouldStart={shouldStartCounter}
                    shouldReduceMotion={prefersReducedMotion}
                    locale={numberLocale}
                    suffixText={suffixText}
                  />
                  <span className={styles.label}>{t(metric.labelKey)}</span>
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
