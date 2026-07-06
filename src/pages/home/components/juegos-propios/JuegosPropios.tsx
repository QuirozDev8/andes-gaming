import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "../../../../components/section-title/SectionTitle";
import "./JuegosPropios.css";
import comandoImg from "../../../../assets/img/comando.webp";
import egyptImg from "../../../../assets/img/egypt.webp";


type OwnGame = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  youtubeId: string;
};

const ownGames: OwnGame[] = [
  {
    id: "comando",
    title: "Comando",
    imageSrc: comandoImg,
    imageAlt: "Banner temporal del juego Comando",
    youtubeId: "kXxVkRHKhQI",
  },
  {
    id: "neon-rush",
    title: "Andres gaming",
    imageSrc: egyptImg,
    imageAlt: "Banner temporal del juego Neon Rush",
    youtubeId: "ysz5S6PUM-U",
  },
  {
    id: "andes-wild",
    title: "Andes Wild",
    imageSrc: comandoImg,
    imageAlt: "Banner temporal del juego Andes Wild",
    youtubeId: "aqz-KE-bpKQ",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedGame, setSelectedGame] = useState<OwnGame | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const slideCount = ownGames.length;
  const activeGame = ownGames[activeIndex] ?? ownGames[0];

  const goToGame = useCallback((nextIndex: number) => {
    setActiveIndex(getCarouselIndex(nextIndex, slideCount));
  }, [slideCount]);

  const goToPreviousGame = useCallback(() => {
    setActiveIndex((currentIndex) => getCarouselIndex(currentIndex - 1, slideCount));
  }, [slideCount]);

  const goToNextGame = useCallback(() => {
    setActiveIndex((currentIndex) => getCarouselIndex(currentIndex + 1, slideCount));
  }, [slideCount]);

  const closeModal = useCallback(() => {
    setSelectedGame(null);
  }, []);

  useEffect(() => {
    if (slideCount <= 1 || isPaused || selectedGame || prefersReducedMotion) return;

    const timer = window.setInterval(goToNextGame, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goToNextGame, isPaused, prefersReducedMotion, selectedGame, slideCount]);

  useEffect(() => {
    if (!selectedGame) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, selectedGame]);

  useEffect(() => {
    if (!selectedGame) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedGame]);

  if (!activeGame) return null;

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
              <span className="juegos-propios__eyebrow">Game Studio</span>

              <SectionTitle
                className="juegos-propios__title py-1"
                lineClassName="juegos-propios__titleLine"
                id="juegos-propios-title"
                lines={["Creamos experiencias", "que marcan la diferencia"]}
              />

              <p className="juegos-propios__description">
                En Andes Gaming Studio desarrollamos contenido propio innovador y
                de alto rendimiento.
              </p>

              <Link className="juegos-propios__link" to="/game-studio">
                Conoce nuestros juegos
                <ArrowRight aria-hidden="true" strokeWidth={2} />
              </Link>
            </div>

            <div
              className="juegos-propios__carousel"
              id="juegos-propios-carousel"
              aria-label="Juegos desarrollados por Andes Gaming"
            >
              <div className="juegos-propios__viewport">
                <div
                  className="juegos-propios__track"
                  style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
                >
                  {ownGames.map((game, index) => (
                    <button
                      className="juegos-propios__slide"
                      key={game.id}
                      type="button"
                      aria-label={`Ver video de ${game.title}`}
                      aria-hidden={index !== activeIndex}
                      tabIndex={index === activeIndex ? 0 : -1}
                      onClick={() => setSelectedGame(game)}
                    >
                      <img
                        className="juegos-propios__image"
                        src={game.imageSrc}
                        alt={game.imageAlt}
                        loading={index === activeIndex ? "eager" : "lazy"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {slideCount > 1 ? (
                <>
                  <button
                    className="juegos-propios__nav juegos-propios__nav--prev"
                    type="button"
                    aria-label="Juego anterior"
                    onClick={goToPreviousGame}
                  >
                    <ChevronLeft aria-hidden="true" strokeWidth={2.4} />
                  </button>

                  <button
                    className="juegos-propios__nav juegos-propios__nav--next"
                    type="button"
                    aria-label="Juego siguiente"
                    onClick={goToNextGame}
                  >
                    <ChevronRight aria-hidden="true" strokeWidth={2.4} />
                  </button>

                  <div className="juegos-propios__dots" aria-label="Seleccionar juego">
                    {ownGames.map((game, index) => (
                      <button
                        className={`juegos-propios__dot ${
                          index === activeIndex ? "juegos-propios__dot--active" : ""
                        }`}
                        key={game.id}
                        type="button"
                        aria-label={`Mostrar ${game.title}`}
                        aria-current={index === activeIndex ? "true" : undefined}
                        onClick={() => goToGame(index)}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {selectedGame ? (
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
                aria-label="Cerrar video"
                onClick={closeModal}
              >
                <X aria-hidden="true" strokeWidth={2.3} />
              </button>
            </div>

            <div className="juegos-propios-modal__video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedGame.youtubeId}?autoplay=1&rel=0`}
                title={`Video de ${selectedGame.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default JuegosPropios;
