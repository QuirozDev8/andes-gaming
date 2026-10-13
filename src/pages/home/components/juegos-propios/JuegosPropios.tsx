import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import comandoDesktopImg from "../../../../assets/img/COMMANDO-DESKTOP.webp";
import comandoMobileImg from "../../../../assets/img/COMMANDO-MOVIL.webp";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import "./JuegosPropios.css";

type OwnGameDefinition = {
  id: string;
  translationKey: "commando"  | "andes-wild";
  imageSrc: string;
  mobileImageSrc?: string;
  youtubeId: string;
};

type OwnGame = OwnGameDefinition & {
  title: string;
  imageAlt: string;
};

const ownGameDefinitions: OwnGameDefinition[] = [
  {
    id: "commando",
    translationKey: "commando",
    imageSrc: comandoDesktopImg,
    mobileImageSrc: comandoMobileImg,
    youtubeId: "vugCplUn6bk",
  },
  {
    id: "commando",
    translationKey: "commando",
    imageSrc: comandoDesktopImg,
    mobileImageSrc: comandoMobileImg,
    youtubeId: "vugCplUn6bk",
  },
];

const AUTOPLAY_MS = 5200;

function getCarouselIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return (index + total) % total;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncPreference);
      return () => mediaQuery.removeEventListener("change", syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  return prefersReducedMotion;
}

export function JuegosPropios() {
  const { t } = useTranslation("home");
  const games = useMemo<OwnGame[]>(
    () =>
      ownGameDefinitions.map((game) => ({
        ...game,
        title: t(`ownGames.games.${game.translationKey}.title`),
        imageAlt: t(`ownGames.games.${game.translationKey}.imageAlt`),
      })),
    [t],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const slideCount = games.length;
  const activeGame = games[activeIndex] ?? games[0];
  const selectedGame = games.find((game) => game.id === selectedGameId) ?? null;

  const goToGame = useCallback(
    (nextIndex: number) => {
      setActiveIndex(getCarouselIndex(nextIndex, slideCount));
    },
    [slideCount],
  );

  const goToPreviousGame = useCallback(() => {
    setActiveIndex((currentIndex) =>
      getCarouselIndex(currentIndex - 1, slideCount),
    );
  }, [slideCount]);

  const goToNextGame = useCallback(() => {
    setActiveIndex((currentIndex) =>
      getCarouselIndex(currentIndex + 1, slideCount),
    );
  }, [slideCount]);

  const closeModal = useCallback(() => {
    setSelectedGameId(null);
  }, []);

  useEffect(() => {
    if (
      slideCount <= 1 ||
      isPaused ||
      selectedGameId ||
      prefersReducedMotion
    ) {
      return;
    }

    const timer = window.setInterval(goToNextGame, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goToNextGame, isPaused, prefersReducedMotion, selectedGameId, slideCount]);

  useEffect(() => {
    if (!selectedGameId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, selectedGameId]);

  useEffect(() => {
    if (!selectedGameId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedGameId]);

  if (!activeGame) return null;

  const modal =
    selectedGame && typeof document !== "undefined" ? (
      <div
        className="juegos-propios-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="juegos-propios-modal-title"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className="juegos-propios-modal__content">
          <div className="juegos-propios-modal__header">
            <h3 id="juegos-propios-modal-title">{selectedGame.title}</h3>
            <button
              className="juegos-propios-modal__close"
              type="button"
              aria-label={t("ownGames.closeVideo")}
              onClick={closeModal}
            >
              <X aria-hidden="true" strokeWidth={2.3} />
            </button>
          </div>

          <div className="juegos-propios-modal__video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedGame.youtubeId}?autoplay=1&rel=0`}
              title={t("ownGames.videoTitle", { title: selectedGame.title })}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <section
        className="juegos-propios"
        aria-labelledby="juegos-propios-title"
        onBlur={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container">
          <div className="juegos-propios__panel">
            <div className="juegos-propios__content">
              <div className="juegos-propios__header">
                <span className="juegos-propios__eyebrow">
                  {t("ownGames.eyebrow")}
                </span>

                <SectionTitle
                  className="juegos-propios__title"
                  lineClassName="juegos-propios__titleLine"
                  id="juegos-propios-title"
                  lines={[
                    t("ownGames.titleFirst"),
                    t("ownGames.titleSecond"),
                  ]}
                />
              </div>

              <div className="juegos-propios__details">
                <p className="juegos-propios__description">
                  {t("ownGames.description")}
                </p>

                <Link
                  className="juegos-propios__link juegos-propios__link--desktop"
                  to="/game-studio"
                >
                  {t("ownGames.cta")}
                  <ArrowRight aria-hidden="true" strokeWidth={2} />
                </Link>
              </div>
            </div>

            <div
              className="juegos-propios__carousel"
              id="juegos-propios-carousel"
              aria-label={t("ownGames.carouselLabel")}
            >
              <div className="juegos-propios__viewport">
                <div
                  className="juegos-propios__track"
                  style={{
                    transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
                  }}
                >
                  {games.map((game, index) => (
                    <button
                      className="juegos-propios__slide"
                      key={game.id}
                      type="button"
                      aria-label={t("ownGames.viewVideo", {
                        title: game.title,
                      })}
                      aria-hidden={index !== activeIndex}
                      tabIndex={index === activeIndex ? 0 : -1}
                      onClick={() => setSelectedGameId(game.id)}
                    >
                      <picture className="juegos-propios__picture">
                        {game.mobileImageSrc ? (
                          <source
                            media="(max-width: 991.98px)"
                            srcSet={game.mobileImageSrc}
                          />
                        ) : null}
                        <img
                          className="juegos-propios__image"
                          src={game.imageSrc}
                          alt={game.imageAlt}
                          loading={index === activeIndex ? "eager" : "lazy"}
                        />
                      </picture>
                    </button>
                  ))}
                </div>
              </div>

              {slideCount > 1 ? (
                <>
                  <button
                    className="juegos-propios__nav juegos-propios__nav--prev"
                    type="button"
                    aria-label={t("ownGames.previous")}
                    onClick={goToPreviousGame}
                  >
                    <ChevronLeft aria-hidden="true" strokeWidth={2.4} />
                  </button>

                  <button
                    className="juegos-propios__nav juegos-propios__nav--next"
                    type="button"
                    aria-label={t("ownGames.next")}
                    onClick={goToNextGame}
                  >
                    <ChevronRight aria-hidden="true" strokeWidth={2.4} />
                  </button>

                  <div
                    className="juegos-propios__dots"
                  aria-label={t("ownGames.select")}
                  >
                    {games.map((game, index) => (
                      <button
                        className={`juegos-propios__dot ${
                          index === activeIndex
                            ? "juegos-propios__dot--active"
                            : ""
                        }`}
                        key={game.id}
                        type="button"
                        aria-label={t("ownGames.show", { title: game.title })}
                        aria-current={
                          index === activeIndex ? "true" : undefined
                        }
                        onClick={() => goToGame(index)}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <Link
              className="juegos-propios__link juegos-propios__link--mobile"
              to="/game-studio"
            >
                  {t("ownGames.cta")}
              <ArrowRight aria-hidden="true" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}

export default JuegosPropios;
