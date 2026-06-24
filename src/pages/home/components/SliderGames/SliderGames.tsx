import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
  type TransitionEvent,
} from 'react';
import styles from './SliderGames.module.css';

export type SliderGameParticleType = 'bubbles' | 'cards' | 'orbit' | 'sparks' | 'dice' | 'none';

export type SliderGameSlide = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  accent: string;
  particleType: SliderGameParticleType;
  glowColor?: string;
};

export type SliderGamesProps = {
  slides: SliderGameSlide[];
  eyebrow?: string;
  titlePrefix?: string;
  titleAccent?: string;
  titleSuffix?: string;
  initialIndex?: number;
  autoPlayMs?: number;
  pauseOnHover?: boolean;
  className?: string;
  ariaLabel?: string;
};

type CSSVariableStyle = CSSProperties & Record<`--${string}`, string | number>;

type ParticleModel = {
  id: string;
  type: Exclude<SliderGameParticleType, 'none'>;
  style: CSSVariableStyle;
};

type RenderedSlide = {
  key: string;
  originalIndex: number;
  slide: SliderGameSlide;
};

const SWIPE_THRESHOLD = 50;
const DEFAULT_AUTOPLAY_MS = 2200;
const TRANSITION_FALLBACK_MS = 1100;

const particleClassByType: Record<Exclude<SliderGameParticleType, 'none'>, string> = {
  bubbles: styles.bubbleRise,
  cards: styles.cardFloat,
  orbit: styles.ballOrbit,
  sparks: styles.sparkRise,
  dice: styles.diceTumble,
};

function clampIndex(index: number, total: number) {
  if (total <= 0) return 0;
  if (!Number.isFinite(index)) return 0;
  return Math.min(Math.max(Math.floor(index), 0), total - 1);
}

function getLoopIndex(index: number, total: number) {
  if (total <= 1) return 0;
  if (index <= 0) return total;
  if (index >= total + 1) return 1;
  return index;
}

function getActiveIndexFromLoopIndex(index: number, total: number) {
  if (total <= 0) return 0;
  if (total === 1) return 0;
  if (index === 0) return total - 1;
  if (index === total + 1) return 0;
  return clampIndex(index - 1, total);
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function formatSeconds(value: number) {
  return `${value.toFixed(2)}s`;
}

function withHexAlpha(color: string, alpha: string) {
  return /^#[0-9a-f]{6}$/i.test(color) ? `${color}${alpha}` : color;
}

function createParticles(type: SliderGameParticleType): ParticleModel[] {
  if (type === 'none') return [];

  if (type === 'bubbles') {
    return Array.from({ length: 18 }, (_, index) => ({
      id: `bubble-${index}`,
      type,
      style: {
        '--x': `${(index / 18 * 100 + randomBetween(-4, 4)).toFixed(1)}%`,
        '--delay': formatSeconds(randomBetween(0, 5)),
        '--dur': formatSeconds(randomBetween(4.2, 7.2)),
        '--size': `${randomBetween(8, 28).toFixed(0)}px`,
        '--drift': `${randomBetween(-44, 44).toFixed(0)}px`,
        '--bubble-opacity': randomBetween(0.35, 0.82).toFixed(2),
      },
    }));
  }

  if (type === 'cards') {
    return Array.from({ length: 10 }, (_, index) => ({
      id: `card-${index}`,
      type,
      style: {
        '--x': `${(index / 10 * 100 + randomBetween(-2, 2)).toFixed(1)}%`,
        '--delay': formatSeconds(randomBetween(0, 5)),
        '--dur': formatSeconds(randomBetween(5, 7.5)),
      },
    }));
  }

  if (type === 'orbit') {
    return [
      {
        id: 'orbit-0',
        type,
        style: {
          '--dur': '4s',
          '--delay': '0s',
          '--radius': 'clamp(220px, 28vw, 340px)',
        },
      },
      {
        id: 'orbit-1',
        type,
        style: {
          '--dur': '5.5s',
          '--delay': '1.2s',
          '--radius': 'clamp(160px, 20vw, 260px)',
        },
      },
    ];
  }

  if (type === 'sparks') {
    return Array.from({ length: 16 }, (_, index) => ({
      id: `spark-${index}`,
      type,
      style: {
        '--x': `${(index / 16 * 100 + randomBetween(-3, 3)).toFixed(1)}%`,
        '--delay': formatSeconds(randomBetween(0, 3)),
        '--dur': formatSeconds(randomBetween(2, 3.5)),
      },
    }));
  }

  const dicePositions = [
    { x: '15%', y: '25%' },
    { x: '78%', y: '22%' },
    { x: '20%', y: '70%' },
    { x: '75%', y: '68%' },
    { x: '50%', y: '15%' },
    { x: '10%', y: '50%' },
    { x: '88%', y: '50%' },
    { x: '50%', y: '82%' },
  ];

  return dicePositions.map((position, index) => ({
    id: `dice-${index}`,
    type,
    style: {
      '--x': position.x,
      '--y': position.y,
      '--delay': `${(index * 0.4).toFixed(2)}s`,
      '--dur': formatSeconds(randomBetween(5, 7)),
    },
  }));
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', syncPreference);
      return () => mediaQuery.removeEventListener('change', syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  return prefersReducedMotion;
}

export function SliderGames({
  slides,
  eyebrow = '// ecosistema en expansion',
  titlePrefix = 'Cinco',
  titleAccent = 'verticales',
  titleSuffix = '. Una integracion.',
  initialIndex = 0,
  autoPlayMs = DEFAULT_AUTOPLAY_MS,
  pauseOnHover = true,
  className,
  ariaLabel = 'Slider de juegos destacados',
}: SliderGamesProps) {
  const slideCount = slides.length;
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const releasePauseTimerRef = useRef<number | null>(null);
  const restoreTransitionFrameRef = useRef<number | null>(null);
  const transitionFallbackTimerRef = useRef<number | null>(null);
  const isInViewRef = useRef(false);
  const initialLoopIndex = slideCount > 1
    ? clampIndex(initialIndex, slideCount) + 1
    : clampIndex(initialIndex, slideCount);
  const [isInView, setIsInView] = useState(false);
  const [loopIndex, setLoopIndex] = useState(initialLoopIndex);
  const [previousLoopIndex, setPreviousLoopIndex] = useState(initialLoopIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [paused, setPaused] = useState(false);
  const [autoResetKey, setAutoResetKey] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeIndex = getActiveIndexFromLoopIndex(loopIndex, slideCount);

  const renderedSlides = useMemo<RenderedSlide[]>(() => {
    if (slideCount <= 1) {
      return slides.map((slide, index) => ({
        key: slide.id,
        originalIndex: index,
        slide,
      }));
    }

    return [
      {
        key: `clone-start-${slides[slideCount - 1].id}`,
        originalIndex: slideCount - 1,
        slide: slides[slideCount - 1],
      },
      ...slides.map((slide, index) => ({
        key: slide.id,
        originalIndex: index,
        slide,
      })),
      {
        key: `clone-end-${slides[0].id}`,
        originalIndex: 0,
        slide: slides[0],
      },
    ];
  }, [slideCount, slides]);

  const particleKey = slides.map((slide) => `${slide.id}:${slide.particleType}`).join('|');
  const particlesBySlide = useMemo(
    () => slides.map((slide) => createParticles(slide.particleType)),
    // The key keeps particle positions stable unless slide identity or particle type changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [particleKey],
  );

  const resetAutoTimer = useCallback(() => {
    setAutoResetKey((current) => current + 1);
  }, []);

  const clearTransitionFallback = useCallback(() => {
    if (transitionFallbackTimerRef.current !== null) {
      window.clearTimeout(transitionFallbackTimerRef.current);
      transitionFallbackTimerRef.current = null;
    }
  }, []);

  const jumpWithoutTransition = useCallback((nextLoopIndex: number) => {
    clearTransitionFallback();
    setIsTransitioning(false);
    setPreviousLoopIndex(nextLoopIndex);
    setTransitionEnabled(false);
    setLoopIndex(nextLoopIndex);

    if (restoreTransitionFrameRef.current !== null) {
      window.cancelAnimationFrame(restoreTransitionFrameRef.current);
    }

    restoreTransitionFrameRef.current = window.requestAnimationFrame(() => {
      restoreTransitionFrameRef.current = window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
        restoreTransitionFrameRef.current = null;
      });
    });
  }, [clearTransitionFallback]);

  const beginSlideTransition = useCallback((nextLoopIndex: number) => {
    if (slideCount <= 1 || isTransitioning) return;

    const normalizedLoopIndex = getLoopIndex(loopIndex, slideCount);

    if (nextLoopIndex === normalizedLoopIndex) return;

    clearTransitionFallback();
    setPreviousLoopIndex(normalizedLoopIndex);
    setIsTransitioning(true);
    setTransitionEnabled(true);
    setLoopIndex(nextLoopIndex);

    transitionFallbackTimerRef.current = window.setTimeout(() => {
      if (nextLoopIndex === slideCount + 1) {
        jumpWithoutTransition(1);
        return;
      }

      if (nextLoopIndex === 0) {
        jumpWithoutTransition(slideCount);
        return;
      }

      setPreviousLoopIndex(nextLoopIndex);
      setIsTransitioning(false);
      transitionFallbackTimerRef.current = null;
    }, TRANSITION_FALLBACK_MS);
  }, [clearTransitionFallback, isTransitioning, jumpWithoutTransition, loopIndex, slideCount]);

  const advance = useCallback((delta: number) => {
    if (slideCount <= 1) return;
    beginSlideTransition(getLoopIndex(loopIndex, slideCount) + delta);
  }, [beginSlideTransition, loopIndex, slideCount]);

  const goToSlide = useCallback((nextIndex: number) => {
    const nextActiveIndex = clampIndex(nextIndex, slideCount);
    let nextLoopIndex = slideCount > 1 ? nextActiveIndex + 1 : nextActiveIndex;

    if (slideCount > 1 && activeIndex === slideCount - 1 && nextActiveIndex === 0) {
      nextLoopIndex = slideCount + 1;
    }

    if (slideCount > 1 && activeIndex === 0 && nextActiveIndex === slideCount - 1) {
      nextLoopIndex = 0;
    }

    beginSlideTransition(nextLoopIndex);
    resetAutoTimer();
  }, [activeIndex, beginSlideTransition, resetAutoTimer, slideCount]);

  const goNext = useCallback(() => {
    advance(1);
    resetAutoTimer();
  }, [advance, resetAutoTimer]);

  const goPrev = useCallback(() => {
    advance(-1);
    resetAutoTimer();
  }, [advance, resetAutoTimer]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const nextIndex = clampIndex(initialIndex, slideCount);
      jumpWithoutTransition(slideCount > 1 ? nextIndex + 1 : nextIndex);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialIndex, jumpWithoutTransition, slideCount]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (slideCount <= 1) {
        setLoopIndex(0);
        return;
      }

      setLoopIndex((current) => getLoopIndex(current, slideCount));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [slideCount]);

  useEffect(() => {
    if (!prefersReducedMotion || slideCount <= 1) return;

    const frame = window.requestAnimationFrame(() => {
      if (loopIndex === slideCount + 1) {
        jumpWithoutTransition(1);
        return;
      }

      if (loopIndex === 0) {
        jumpWithoutTransition(slideCount);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [jumpWithoutTransition, loopIndex, prefersReducedMotion, slideCount]);

  useEffect(() => {
    if (slideCount <= 1 || autoPlayMs <= 0 || paused || prefersReducedMotion || !isInView) return;

    const timer = window.setInterval(() => {
      advance(1);
    }, autoPlayMs);

    return () => window.clearInterval(timer);
  }, [advance, autoPlayMs, autoResetKey, isInView, paused, prefersReducedMotion, slideCount]);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      const frame = globalThis.requestAnimationFrame(() => {
        isInViewRef.current = true;
        setIsInView(true);
      });

      return () => globalThis.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsInView = entry.isIntersecting;
        isInViewRef.current = nextIsInView;
        setIsInView(nextIsInView);
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (slideCount <= 1) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isInViewRef.current) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, slideCount]);

  useEffect(() => {
    return () => {
      if (releasePauseTimerRef.current !== null) {
        window.clearTimeout(releasePauseTimerRef.current);
      }

      if (restoreTransitionFrameRef.current !== null) {
        window.cancelAnimationFrame(restoreTransitionFrameRef.current);
      }

      clearTransitionFallback();
    };
  }, [clearTransitionFallback]);

  const handleTrackTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'transform' || slideCount <= 1) return;

    clearTransitionFallback();

    if (loopIndex === slideCount + 1) {
      jumpWithoutTransition(1);
      return;
    }

    if (loopIndex === 0) {
      jumpWithoutTransition(slideCount);
      return;
    }

    setPreviousLoopIndex(loopIndex);
    setIsTransitioning(false);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;

    if (!pauseOnHover) return;
    if (releasePauseTimerRef.current !== null) {
      window.clearTimeout(releasePauseTimerRef.current);
    }
    setPaused(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;

    if (startX !== null) {
      const deltaX = event.changedTouches[0].clientX - startX;
      if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
        if (deltaX < 0) goNext();
        else goPrev();
      }
    }

    if (!pauseOnHover) return;
    releasePauseTimerRef.current = window.setTimeout(() => setPaused(false), 1500);
  };

  if (slideCount === 0) return null;

  const activeSlide = slides[activeIndex] ?? slides[0];
  const activeAccent = activeSlide.accent;
  const activeGlow = activeSlide.glowColor ?? activeAccent;
  const rootStyle: CSSVariableStyle = {
    '--active-accent': activeAccent,
    '--active-accent-shadow': withHexAlpha(activeAccent, '99'),
    '--active-glow': activeGlow,
  };
  const trackStyle: CSSProperties = {
    transform: `translate3d(-${loopIndex * 100}%, 0, 0)`,
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.sliderGames} ${isInView ? '' : styles.isIdle} ${isTransitioning ? styles.isTransitioning : ''} ${className ?? ''}`}
      style={rootStyle}
      aria-label={ariaLabel}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <header className={styles.header}>
        {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
        <h2 className={styles.title}>
          {titlePrefix ? `${titlePrefix} ` : ''}
          <span className={styles.titleAccent}>{titleAccent}</span>
          {titleSuffix}
        </h2>
      </header>

      <div className={styles.bigTextWrap} aria-hidden="true">
        <div className={styles.bigText}>{activeSlide.title}</div>
      </div>

      <div
        className={`${styles.track} ${transitionEnabled ? '' : styles.trackNoTransition}`}
        style={trackStyle}
        onTransitionEnd={handleTrackTransitionEnd}
      >
        {renderedSlides.map(({ key, originalIndex, slide }, renderedIndex) => {
          const slideGlow = slide.glowColor ?? slide.accent;
          const isRenderedSlideActive = renderedIndex === loopIndex;
          const isNeighborSlide = Math.abs(renderedIndex - loopIndex) <= 1;
          const shouldRenderSlideContent = isRenderedSlideActive
            || isNeighborSlide
            || (isTransitioning && renderedIndex === previousLoopIndex);
          const particles = isRenderedSlideActive && isInView && !prefersReducedMotion && !isTransitioning
            ? particlesBySlide[originalIndex] ?? []
            : [];
          const particleStyle: CSSVariableStyle = {
            '--particle-accent': slide.accent,
            '--particle-glow': withHexAlpha(slideGlow, '99'),
          };
          const shouldLoadImageEagerly = isRenderedSlideActive || isNeighborSlide;

          return (
            <article
              className={`${styles.slide} ${isRenderedSlideActive ? styles.activeSlide : styles.inactiveSlide}`}
              key={key}
              aria-hidden={!isRenderedSlideActive}
            >
              {particles.length > 0 ? (
                <div className={styles.particles} style={particleStyle} aria-hidden="true">
                  {particles.map((particle) => (
                    <span
                      className={particleClassByType[particle.type]}
                      key={particle.id}
                      style={particle.style}
                    />
                  ))}
                </div>
              ) : null}

              {shouldRenderSlideContent ? (
                <div className={styles.slideContent}>
                  <div className={styles.iconGlow} style={{ color: slideGlow }} aria-hidden="true" />
                  <img
                    className={styles.iconMain}
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    draggable={false}
                    loading={shouldLoadImageEagerly ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ color: slideGlow }}
                  />
                  <h3 className={styles.slideTitle}>{slide.title}</h3>
                  <p className={styles.description}>{slide.description}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        type="button"
        aria-label="Slide anterior"
        disabled={slideCount <= 1}
        onClick={goPrev}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        type="button"
        aria-label="Slide siguiente"
        disabled={slideCount <= 1}
        onClick={goNext}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className={styles.dots} aria-label="Seleccionar juego">
        {slides.map((slide, index) => {
          const dotStyle: CSSVariableStyle = {
            '--dot-accent': slide.accent,
          };

          return (
            <button
              className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
              type="button"
              key={slide.id}
              style={dotStyle}
              aria-label={`Mostrar ${slide.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => goToSlide(index)}
            />
          );
        })}
      </div>
    </section>
  );
}
