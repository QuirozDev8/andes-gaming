import React, { useRef, useEffect, useCallback, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ArrowRight, X } from 'lucide-react';
import SectionTitle from '../../../../components/section-title/SectionTitle';
import styles from './CardSection.module.css';


export interface CardSectionCardDetail {
  intro: string;
  points: string[];
  outcome?: string;
}

export interface CardSectionCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  backgroundImage?: string;
  detail?: CardSectionCardDetail;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
}

export interface CardSectionProps {
  cards?: CardSectionCardProps[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  modalCtaLabel?: string;
  modalCtaHref?: string;
}

const DEFAULT_PARTICLE_COUNT = 15;
const DEFAULT_SPOTLIGHT_RADIUS = 380;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const defaultCards: CardSectionCardProps[] = [
  {
    color: '#120F17',
    title: 'Analytics',
    description: 'Track user behavior',
    label: 'Insights'
  },
  {
    color: '#120F17',
    title: 'Dashboard',
    description: 'Centralized data view',
    label: 'Overview'
  },
  {
    color: '#120F17',
    title: 'Collaboration',
    description: 'Work together seamlessly',
    label: 'Teamwork'
  },
  {
    color: '#120F17',
    title: 'Automation',
    description: 'Streamline workflows',
    label: 'Efficiency'
  },
  {
    color: '#120F17',
    title: 'Integration',
    description: 'Connect favorite tools',
    label: 'Connectivity'
  },
  {
    color: '#120F17',
    title: 'Security',
    description: 'Enterprise-grade protection',
    label: 'Protection'
  }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = styles['card-section-particle'];
  el.style.cssText = `
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow:
      0 0 8px rgba(${color}, 0.85),
      0 0 18px rgba(${color}, 0.42);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  enableParticles?: boolean;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  enableParticles = true,
  ariaLabel,
  onClick
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (!enableParticles || particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [enableParticles, particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!enableParticles || !cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 130,
          y: (Math.random() - 0.5) * 130,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.52,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [enableParticles, initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      if (enableParticles) {
        animateParticles();
      }

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
      if (enableTilt || enableMagnetism) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
    enableParticles
  ]);

  return (
    <button
      ref={cardRef}
      type="button"
      aria-label={ariaLabel}
      className={[
        className,
        enableParticles ? styles['card-section-particle-container'] : ''
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </button>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = styles['card-section-spotlight'];
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.26) 0%,
        rgba(${glowColor}, 0.15) 14%,
        rgba(${glowColor}, 0.08) 28%,
        rgba(${glowColor}, 0.04) 45%,
        rgba(${glowColor}, 0.018) 66%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(`.${styles['card-section']}`);
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll(`.${styles['card-section-card']}`);

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.95
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.95
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll(`.${styles['card-section-card']}`).forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const CardSectionGrid: React.FC<{
  children: React.ReactNode;
  gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
  <div className={`${styles['card-section']} ${styles['card-section-grid']}`} ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const CardSection: React.FC<CardSectionProps> = ({
  cards = defaultCards,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  modalCtaLabel = 'Hablar con ventas',
  modalCtaHref = '#contact-home'
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const modalTitleId = useId();
  const modalDescriptionId = useId();
  const isMobile = useMobileDetection();
  const [selectedCard, setSelectedCard] = useState<CardSectionCardProps | null>(null);
  const shouldDisableAnimations = disableAnimations || isMobile || Boolean(selectedCard);

  const closeModal = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const openCardDetail = useCallback((card: CardSectionCardProps) => {
    setSelectedCard(card);
  }, []);

  useEffect(() => {
    if (!selectedCard) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCard]);

  useEffect(() => {
    if (!selectedCard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal, selectedCard]);

  useEffect(() => {
    if (!selectedCard) return;

    previousActiveElementRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    };
  }, [selectedCard]);

  const renderCard = (card: CardSectionCardProps, index: number) => {
    const Icon = card.icon;
    const cardTitle = card.title ?? 'servicio';
    const baseClassName = [
      styles['card-section-card'],
      card.backgroundImage ? styles['card-section-card--has-background'] : '',
      textAutoHide ? styles['card-section-card--text-autohide'] : '',
      enableBorderGlow ? styles['card-section-card--border-glow'] : ''
    ]
      .filter(Boolean)
      .join(' ');

    const cardProps = {
      className: baseClassName,
      style: {
        backgroundColor: card.color,
        '--glow-color': glowColor
      } as React.CSSProperties
    };

    const cardContent = (
      <>
        {card.backgroundImage && (
          <span
            className={styles['card-section-card__background']}
            style={{ backgroundImage: `url(${card.backgroundImage})` }}
            aria-hidden="true"
          />
        )}

        <span className={styles['card-section-card__header']}>
          <span className={styles['card-section-card__meta']}>
            {Icon && (
              <span className={styles['card-section-card__icon-wrap']} aria-hidden="true">
                <Icon className={styles['card-section-card__icon']} strokeWidth={1.8} />
              </span>
            )}
            <span className={styles['card-section-card__label']}>{card.label}</span>
          </span>
        </span>
        <span className={styles['card-section-card__content']}>
          <span className={styles['card-section-card__title']}>{cardTitle}</span>
          <span className={styles['card-section-card__description']}>{card.description}</span>
        </span>
      </>
    );

    return (
      <ParticleCard
        key={`${cardTitle}-${index}`}
        {...cardProps}
        ariaLabel={`Ver detalle de ${cardTitle}`}
        disableAnimations={shouldDisableAnimations}
        enableMagnetism={enableMagnetism}
        enableParticles={enableStars}
        enableTilt={enableTilt}
        clickEffect={clickEffect}
        glowColor={glowColor}
        onClick={() => openCardDetail(card)}
        particleCount={particleCount}
      >
        {cardContent}
      </ParticleCard>
    );
  };

  const renderModal = () => {
    if (!selectedCard || typeof document === 'undefined') return null;

    const Icon = selectedCard.icon;
    const title = selectedCard.title ?? 'Servicio Andes Gaming';
    const label = selectedCard.label ?? 'Solucion';
    const intro = selectedCard.detail?.intro ?? selectedCard.description ?? '';
    const points = selectedCard.detail?.points ?? [];
    const outcome = selectedCard.detail?.outcome;

    return createPortal(
      <div
        className={styles['card-section-modal']}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={intro ? modalDescriptionId : undefined}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className={styles['card-section-modal__content']} ref={modalRef}>
          {selectedCard.backgroundImage && (
            <span
              aria-hidden="true"
              className={styles['card-section-modal__background']}
              style={{ backgroundImage: `url(${selectedCard.backgroundImage})` }}
            />
          )}

          <div className={styles['card-section-modal__header']}>
            <div className={styles['card-section-modal__identity']}>
              {Icon && (
                <span className={styles['card-section-modal__icon-wrap']} aria-hidden="true">
                  <Icon className={styles['card-section-modal__icon']} strokeWidth={1.8} />
                </span>
              )}
              <span className={styles['card-section-modal__eyebrow']}>{label}</span>
            </div>

            <button
              ref={closeButtonRef}
              className={styles['card-section-modal__close']}
              type="button"
              aria-label={`Cerrar detalle de ${title}`}
              onClick={closeModal}
            >
              <X aria-hidden="true" strokeWidth={2.3} />
            </button>
          </div>

          <div className={styles['card-section-modal__body']}>
            <SectionTitle
              as="h3"
              className={styles['card-section-modal__title']}
              id={modalTitleId}
              lines={[title]}
              nowrap={false}
            />

            {intro && (
              <p className={styles['card-section-modal__intro']} id={modalDescriptionId}>
                {intro}
              </p>
            )}

            {points.length > 0 && (
              <ul className={styles['card-section-modal__points']}>
                {points.map((point) => (
                  <li className={styles['card-section-modal__point']} key={point}>
                    <span className={styles['card-section-modal__point-marker']} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {outcome && (
              <p className={styles['card-section-modal__outcome']}>{outcome}</p>
            )}

            <a
              className={styles['card-section-modal__cta']}
              href={modalCtaHref}
              onClick={closeModal}
            >
              <span>{modalCtaLabel}</span>
              <ArrowRight aria-hidden="true" strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {enableSpotlight && !selectedCard && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight && !selectedCard}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <CardSectionGrid gridRef={gridRef}>
        {cards.map((card, index) => renderCard(card, index))}
      </CardSectionGrid>

      {renderModal()}
    </>
  );
};

export default CardSection;
