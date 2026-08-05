import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Pause,
  Play,
} from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type TouchEvent,
  type TransitionEvent,
} from "react";
import { useTranslation } from "react-i18next";
import camanbetLogo from "../../../../assets/logos/logos-marcas/camanbet.webp";
import doradobetLogo from "../../../../assets/logos/logos-marcas/doradobet.webp";
import ecuabetLogo from "../../../../assets/logos/logos-marcas/ecuabet.webp";
import latinbetLogo from "../../../../assets/logos/logos-marcas/latinbet-logo.webp";
import redCasinoLogo from "../../../../assets/logos/logos-marcas/redcasino.webp";
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import { ROUTES } from "../../../../routes/routePaths";
import styles from "./CasosExitos.module.css";

export interface SuccessCaseMetric {
  value: string;
  label: string;
}

export interface SuccessCaseItem {
  id: string;
  brand: string;
  logoSrc: string;
  logoAlt: string;
  title: string;
  description: string;
  brandUrl?: string;
  brandLinkText?: string;
  brandLinkAriaLabel?: string;
  metrics: SuccessCaseMetric[];
  ctaText?: string;
  ctaAriaLabel?: string;
  ctaTo?: string;
}

export interface CasosExitosProps {
  items?: SuccessCaseItem[];
  autoPlayMs?: number;
  pauseOnHover?: boolean;
}

type RenderedCase = {
  key: string;
  item: SuccessCaseItem;
  originalIndex: number;
  isClone: boolean;
};

type NavigationCase = {
  item: SuccessCaseItem;
  originalIndex: number;
  position: "previous" | "current" | "next";
};

type CarouselStyle = CSSProperties & {
  "--autoplay-duration": string;
  "--track-index": number;
};

type SuccessCaseSlideProps = {
  item: SuccessCaseItem;
  originalIndex: number;
  isClone: boolean;
  resultsLabel: string;
  slideLabel?: string;
  slideRole: string;
};

const DEFAULT_AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD_PX = 50;
const TRANSITION_FALLBACK_MS = 1000;
const METRIC_INDEXES = [0, 1, 2] as const;
const CASE_CONTACT_ROUTE = `${ROUTES.casinoAggregation}#contact-casino-aggregation`;
const DEFAULT_CASE_DEFINITIONS = [
  { id: "ecuabet", logoSrc: ecuabetLogo, brandUrl: "https://ecuabet.com/" },
  {
    id: "doradobet",
    logoSrc: doradobetLogo,
    brandUrl: "https://doradobet.com/home",
  },
  { id: "camanbet", logoSrc: camanbetLogo, brandUrl: "https://camanbet.com/" },
  { id: "latinbet", logoSrc: latinbetLogo, brandUrl: "https://latinbet.bet/" },
  { id: "redcasino", logoSrc: redCasinoLogo, brandUrl: "https://www.redcasino.com/" },
] as const;

function clampIndex(index: number, total: number) {
  if (total <= 0 || !Number.isFinite(index)) return 0;
  return Math.min(Math.max(Math.floor(index), 0), total - 1);
}

function getActiveIndex(loopIndex: number, total: number) {
  if (total <= 1) return 0;
  if (loopIndex === 0) return total - 1;
  if (loopIndex === total + 1) return 0;
  return clampIndex(loopIndex - 1, total);
}

function formatPosition(value: number) {
  return String(value).padStart(2, "0");
}

function createNavigationItems(items: SuccessCaseItem[], activeIndex: number) {
  const itemCount = items.length;
  if (itemCount === 0) return [];

  const current: NavigationCase = {
    item: items[activeIndex],
    originalIndex: activeIndex,
    position: "current",
  };

  if (itemCount === 1) return [current];

  const previousIndex = (activeIndex - 1 + itemCount) % itemCount;
  const previous: NavigationCase = {
    item: items[previousIndex],
    originalIndex: previousIndex,
    position: "previous",
  };

  if (itemCount === 2) return [previous, current];

  const nextIndex = (activeIndex + 1) % itemCount;
  return [
    previous,
    current,
    { item: items[nextIndex], originalIndex: nextIndex, position: "next" },
  ] satisfies NavigationCase[];
}

function createRenderedItems(items: SuccessCaseItem[]): RenderedCase[] {
  if (items.length <= 1) {
    return items.map((item, originalIndex) => ({
      key: item.id,
      item,
      originalIndex,
      isClone: false,
    }));
  }

  const lastIndex = items.length - 1;
  return [
    {
      key: `clone-start-${items[lastIndex].id}`,
      item: items[lastIndex],
      originalIndex: lastIndex,
      isClone: true,
    },
    ...items.map((item, originalIndex) => ({
      key: item.id,
      item,
      originalIndex,
      isClone: false,
    })),
    {
      key: `clone-end-${items[0].id}`,
      item: items[0],
      originalIndex: 0,
      isClone: true,
    },
  ];
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  return prefersReducedMotion;
}

const SuccessCaseSlide = memo(function SuccessCaseSlide({
  item,
  originalIndex,
  isClone,
  resultsLabel,
  slideLabel,
  slideRole,
}: SuccessCaseSlideProps) {
  return (
    <article
      aria-hidden={isClone || undefined}
      aria-label={isClone ? undefined : slideLabel}
      aria-roledescription={isClone ? undefined : slideRole}
      className={styles.slide}
      role={isClone ? undefined : "group"}
    >
      <div className={styles.story}>
        <div className={styles.logoPlate}>
          <img
            alt={isClone ? "" : item.logoAlt}
            decoding="async"
            draggable={false}
            loading="lazy"
            src={item.logoSrc}
          />
        </div>

        <h3>{item.title}</h3>
        <p className={styles.summary}>{item.description}</p>
        {!isClone && item.brandUrl && item.brandLinkText && (
          <a
            aria-label={item.brandLinkAriaLabel}
            className={styles.brandLink}
            href={item.brandUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {item.brandLinkText}
            <ExternalLink aria-hidden="true" strokeWidth={1.8} />
          </a>
        )}
      </div>

      <div className={styles.results}>
        <div className={styles.caseNumber} aria-hidden="true">
          {formatPosition(originalIndex + 1)}
        </div>
        <p className={styles.resultsLabel}>{resultsLabel}</p>
        <ul className={styles.metrics}>
          {item.metrics.map((metric, metricIndex) => (
            <li key={`${item.id}-metric-${metricIndex}`}>
              <Activity aria-hidden="true" strokeWidth={1.7} />
              <span>
                <strong>{metric.value}</strong>
                <small>{metric.label}</small>
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.ctaSlot}>
          {!isClone && item.ctaText && item.ctaTo ? (
            <BtnElegant
              ariaLabel={item.ctaAriaLabel}
              className={styles.cta}
              text={item.ctaText}
              to={item.ctaTo}
            />
          ) : (
            <span className={styles.ctaPlaceholder} aria-hidden="true" />
          )}
        </div>
      </div>
    </article>
  );
});

export default function CasosExitos({
  items,
  autoPlayMs = DEFAULT_AUTOPLAY_MS,
  pauseOnHover = true,
}: CasosExitosProps) {
  const { t } = useTranslation("casinoAggregation");

  const defaultItems = useMemo<SuccessCaseItem[]>(
    () =>
      DEFAULT_CASE_DEFINITIONS.map(({ id, logoSrc, brandUrl }) => {
        const brand = t(`successCases.items.${id}.brand`);

        return {
          id,
          brand,
          logoSrc,
          logoAlt: t(`successCases.items.${id}.logoAlt`),
          title: t(`successCases.items.${id}.title`),
          description: t(`successCases.items.${id}.description`),
          brandUrl,
          brandLinkText: t("successCases.brandLink", { brand }),
          brandLinkAriaLabel: t("successCases.brandLinkLabel", { brand }),
          metrics: METRIC_INDEXES.map((metricIndex) => ({
            value: t(`successCases.items.${id}.metrics.${metricIndex}.value`),
            label: t(`successCases.items.${id}.metrics.${metricIndex}.label`),
          })),
          ctaText: t(`successCases.items.${id}.cta`),
          ctaAriaLabel: t(`successCases.items.${id}.ctaLabel`),
          ctaTo: CASE_CONTACT_ROUTE,
        };
      }),
    [t],
  );
  const resolvedItems = items ?? defaultItems;
  const itemCount = resolvedItems.length;
  const hasMultipleItems = itemCount > 1;
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const restoreTransitionFrameRef = useRef<number | null>(null);
  const [loopIndex, setLoopIndex] = useState(hasMultipleItems ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"previous" | "next">("next");
  const [announcement, setAnnouncement] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeIndex = getActiveIndex(loopIndex, itemCount);

  const navigationItems = useMemo(
    () => createNavigationItems(resolvedItems, activeIndex),
    [activeIndex, resolvedItems],
  );
  const renderedItems = useMemo(() => createRenderedItems(resolvedItems), [resolvedItems]);

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  const jumpWithoutTransition = useCallback(
    (nextIndex: number) => {
      clearTransitionTimer();
      setTransitionEnabled(false);
      setIsTransitioning(false);
      setLoopIndex(nextIndex);

      if (restoreTransitionFrameRef.current !== null) {
        window.cancelAnimationFrame(restoreTransitionFrameRef.current);
      }

      restoreTransitionFrameRef.current = window.requestAnimationFrame(() => {
        restoreTransitionFrameRef.current = window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
          restoreTransitionFrameRef.current = null;
        });
      });
    },
    [clearTransitionTimer],
  );

  const completeTransition = useCallback(
    (currentLoopIndex: number) => {
      clearTransitionTimer();

      if (currentLoopIndex === itemCount + 1) {
        jumpWithoutTransition(1);
        return;
      }

      if (currentLoopIndex === 0) {
        jumpWithoutTransition(itemCount);
        return;
      }

      setIsTransitioning(false);
    },
    [clearTransitionTimer, itemCount, jumpWithoutTransition],
  );

  const beginTransition = useCallback(
    (nextLoopIndex: number) => {
      if (!hasMultipleItems || isTransitioning) return;

      clearTransitionTimer();
      setTransitionEnabled(true);
      setIsTransitioning(true);
      setLoopIndex(nextLoopIndex);
      transitionTimerRef.current = window.setTimeout(() => {
        completeTransition(nextLoopIndex);
      }, TRANSITION_FALLBACK_MS);
    },
    [clearTransitionTimer, completeTransition, hasMultipleItems, isTransitioning],
  );

  const announceSlide = useCallback(
    (index: number) => {
      setAnnouncement(
        t("successCases.controls.status", {
          current: index + 1,
          total: itemCount,
        }),
      );
    },
    [itemCount, t],
  );

  const advance = useCallback(
    (delta: -1 | 1, manual = false) => {
      if (!hasMultipleItems || isTransitioning) return;

      const nextActiveIndex = (activeIndex + delta + itemCount) % itemCount;
      setSlideDirection(delta > 0 ? "next" : "previous");
      beginTransition(loopIndex + delta);

      if (manual) {
        announceSlide(nextActiveIndex);
      }
    },
    [
      activeIndex,
      announceSlide,
      beginTransition,
      hasMultipleItems,
      isTransitioning,
      itemCount,
      loopIndex,
    ],
  );

  useEffect(() => {
    const nextLoopIndex = itemCount > 1 ? 1 : 0;
    const frame = window.requestAnimationFrame(() => {
      jumpWithoutTransition(nextLoopIndex);
      setUserPaused(false);
      setAnnouncement("");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [itemCount, jumpWithoutTransition]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const autoplayRunning =
    hasMultipleItems &&
    autoPlayMs > 0 &&
    isInView &&
    isDocumentVisible &&
    !interactionPaused &&
    !userPaused &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!autoplayRunning) return;

    const timer = window.setTimeout(() => advance(1), autoPlayMs);
    return () => window.clearTimeout(timer);
  }, [advance, autoPlayMs, autoplayRunning]);

  useEffect(
    () => () => {
      clearTransitionTimer();
      if (restoreTransitionFrameRef.current !== null) {
        window.cancelAnimationFrame(restoreTransitionFrameRef.current);
      }
    },
    [clearTransitionTimer],
  );

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform" || !hasMultipleItems) return;
    completeTransition(loopIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!hasMultipleItems) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      advance(-1, true);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      advance(1, true);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    setInteractionPaused(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;

    if (startX !== null) {
      const endX = event.changedTouches[0]?.clientX ?? startX;
      const deltaX = endX - startX;

      if (Math.abs(deltaX) >= SWIPE_THRESHOLD_PX) {
        advance(deltaX < 0 ? 1 : -1, true);
      }
    }

    setInteractionPaused(false);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setInteractionPaused(false);
    }
  };

  if (itemCount === 0) return null;

  const carouselStyle: CarouselStyle = {
    "--autoplay-duration": `${Math.max(autoPlayMs, 1000)}ms`,
    "--track-index": loopIndex,
  };
  const resultsLabel = t("successCases.resultsLabel");
  const slideRole = t("successCases.slideRole");

  return (
    <section
      aria-labelledby="success-cases-title"
      aria-roledescription={t("successCases.carouselRole")}
      className={styles.successCases}
      onBlurCapture={handleBlur}
      onFocusCapture={() => setInteractionPaused(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => pauseOnHover && setInteractionPaused(true)}
      onMouseLeave={() => pauseOnHover && setInteractionPaused(false)}
      onTouchCancel={() => setInteractionPaused(false)}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      ref={sectionRef}
      style={carouselStyle}
      tabIndex={hasMultipleItems ? 0 : undefined}
    >
      <span className={styles.glowViolet} aria-hidden="true" />
      <span className={styles.glowCyan} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {t("successCases.eyebrow")}
            <span aria-hidden="true" />
          </p>
          <h2 className={styles.title} id="success-cases-title">
            <span>{t("successCases.title.primary")}</span>
            <span className={styles.titleAccent}>{t("successCases.title.accent")}</span>
          </h2>
          <p className={styles.introduction}>{t("successCases.description")}</p>
        </header>

        <div className={styles.carousel} aria-label={t("successCases.ariaLabel")}>
          <div className={styles.viewport}>
            <div
              className={styles.track}
              data-transition={transitionEnabled || undefined}
              onTransitionEnd={handleTransitionEnd}
            >
              {renderedItems.map(({ item, key, originalIndex, isClone }) => (
                <SuccessCaseSlide
                  isClone={isClone}
                  item={item}
                  key={key}
                  originalIndex={originalIndex}
                  resultsLabel={resultsLabel}
                  slideLabel={
                    isClone
                      ? undefined
                      : t("successCases.slideLabel", {
                          brand: item.brand,
                          current: originalIndex + 1,
                          total: itemCount,
                        })
                  }
                  slideRole={slideRole}
                />
              ))}
            </div>
          </div>

          <div className={styles.navigation} data-multiple={hasMultipleItems || undefined}>
            <span className={styles.counter} aria-hidden="true">
              <strong>{formatPosition(activeIndex + 1)}</strong>
              <span>/</span>
              {formatPosition(itemCount)}
            </span>

            {hasMultipleItems && (
              <>
                <div className={styles.arrowControls}>
                  <button
                    aria-label={t("successCases.controls.previous")}
                    className={styles.navButton}
                    onClick={() => advance(-1, true)}
                    type="button"
                  >
                    <ArrowLeft aria-hidden="true" strokeWidth={1.8} />
                  </button>
                  <button
                    aria-label={t("successCases.controls.next")}
                    className={styles.navButton}
                    onClick={() => advance(1, true)}
                    type="button"
                  >
                    <ArrowRight aria-hidden="true" strokeWidth={1.8} />
                  </button>
                </div>

                <div
                  className={styles.brandTabs}
                  aria-label={t("successCases.controls.pagination")}
                  data-direction={slideDirection}
                  key={`navigation-${activeIndex}`}
                >
                  {navigationItems.map(({ item, originalIndex, position }) => (
                    <button
                      aria-current={position === "current" ? "true" : undefined}
                      aria-label={t("successCases.controls.goTo", {
                        index: originalIndex + 1,
                      })}
                      className={styles.brandTab}
                      data-active={position === "current" || undefined}
                      data-position={position}
                      key={`${position}-${item.id}`}
                      onClick={() => {
                        if (position === "previous") advance(-1, true);
                        if (position === "next") advance(1, true);
                      }}
                      type="button"
                    >
                      <span className={styles.tabLogo} aria-hidden="true">
                        <img alt="" src={item.logoSrc} />
                      </span>
                      <span className={styles.tabCopy}>
                        <small>{formatPosition(originalIndex + 1)}</small>
                        <strong>{item.brand}</strong>
                      </span>
                    </button>
                  ))}
                </div>

                <div className={styles.autoplayControls}>
                  <div
                    aria-hidden="true"
                    className={styles.progress}
                    data-running={autoplayRunning || undefined}
                    key={`${activeIndex}-${userPaused ? "paused" : "playing"}`}
                  >
                    <span />
                  </div>
                  <button
                    aria-label={
                      userPaused
                        ? t("successCases.controls.play")
                        : t("successCases.controls.pause")
                    }
                    className={styles.playButton}
                    onClick={() => setUserPaused((current) => !current)}
                    type="button"
                  >
                    {userPaused ? (
                      <Play aria-hidden="true" strokeWidth={1.8} />
                    ) : (
                      <Pause aria-hidden="true" strokeWidth={1.8} />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <p className={styles.announcement} aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </section>
  );
}
