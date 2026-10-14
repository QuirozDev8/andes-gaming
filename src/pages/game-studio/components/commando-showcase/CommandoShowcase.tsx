import { useEffect, useRef, useState } from "react";
import { LogOut, Maximize, Minimize, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import {
  COMMANDO_CONTACT_FORM_PATH,
  COMMANDO_DEMO_URL,
} from "../../gameStudio.config";
import "./CommandoShowcase.css";

export default function CommandoShowcase() {
  const { t } = useTranslation("gameStudio");
  const playerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const restoreStartFocus = useRef(false);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const canFullscreen = Boolean(
    typeof document !== "undefined" &&
      document.fullscreenEnabled &&
      document.documentElement.requestFullscreen,
  );

  useEffect(() => {
    const updateFullscreen = () => {
      setFullscreen(document.fullscreenElement === playerRef.current);
    };
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => document.removeEventListener("fullscreenchange", updateFullscreen);
  }, []);

  useEffect(() => {
    if (started) frameRef.current?.focus({ preventScroll: true });
    else if (restoreStartFocus.current) {
      startRef.current?.focus({ preventScroll: true });
      restoreStartFocus.current = false;
    }
  }, [started]);

  const stopDemo = async () => {
    // Unmount the iframe immediately to stop the game, audio and connections.
    restoreStartFocus.current = true;
    setStarted(false);
    setLoading(false);
    setFullscreenError(false);
    if (document.fullscreenElement === playerRef.current) {
      try {
        await document.exitFullscreen();
      } catch {
        setFullscreenError(true);
      }
    }
  };

  const toggleFullscreen = async () => {
    setFullscreenError(false);
    try {
      if (document.fullscreenElement === playerRef.current) {
        await document.exitFullscreen();
      } else {
        await playerRef.current?.requestFullscreen();
      }
    } catch {
      setFullscreenError(true);
    }
  };

  const FullscreenIcon = fullscreen ? Minimize : Maximize;

  return (
    <section
      id="commando-demo"
      className="commando-showcase"
      aria-labelledby="commando-showcase-title"
    >
      <div className="container commando-showcase-container">
        <header className="commando-showcase-heading">
          <p className="commando-showcase-eyebrow">{t("showcase.eyebrow")}</p>
          <h2 id="commando-showcase-title" className="commando-showcase-title">
            {t("showcase.title")}
          </h2>
          <p className="commando-showcase-description">{t("showcase.description")}</p>
        </header>

        <div className="commando-showcase-player" ref={playerRef}>
          <div className="commando-showcase-toolbar">
            <span className="commando-showcase-status" role="status">
              {loading ? t("showcase.loading") : null}
            </span>
            <div className="commando-showcase-controls">
              {started ? (
                <button
                  type="button"
                  className="commando-showcase-exit"
                  onClick={stopDemo}
                >
                  <LogOut size={18} aria-hidden="true" focusable="false" />
                  {t("showcase.exit")}
                </button>
              ) : null}
              {canFullscreen && COMMANDO_DEMO_URL ? (
                <button
                  type="button"
                  className="commando-showcase-fullscreen"
                  onClick={toggleFullscreen}
                  aria-pressed={fullscreen}
                >
                  <FullscreenIcon size={18} aria-hidden="true" focusable="false" />
                  {t(fullscreen ? "showcase.exitFullscreen" : "showcase.fullscreen")}
                </button>
              ) : null}
            </div>
          </div>
          <div className="commando-showcase-stage">
            {!COMMANDO_DEMO_URL ? (
              <p className="commando-showcase-unavailable" role="status">
                {t("showcase.unavailable")}
              </p>
            ) : started ? (
              <iframe
                className="commando-showcase-frame"
                src={COMMANDO_DEMO_URL}
                title={t("showcase.iframeTitle")}
                allow="fullscreen"
                allowFullScreen
                ref={frameRef}
                // This only ends the navigation indicator, not a game-ready check.
                onLoad={() => setLoading(false)}
              />
            ) : (
              <button
                type="button"
                ref={startRef}
                className="commando-showcase-start"
                onClick={() => {
                  setLoading(true);
                  setStarted(true);
                }}
              >
                <span className="commando-showcase-play-icon" aria-hidden="true">
                  <Play size={42} fill="currentColor" focusable="false" />
                </span>
                {t("showcase.start")}
              </button>
            )}
          </div>
          <p className="commando-showcase-feedback" role="status">
            {fullscreenError ? t("showcase.fullscreenError") : null}
          </p>
        </div>

        <div className="commando-showcase-cta">
          <p className="commando-showcase-prompt">{t("showcase.prompt")}</p>
          <BtnElegant
            variant="blog"
            className="commando-showcase-contact"
            to={COMMANDO_CONTACT_FORM_PATH}
            text={t("showcase.contact")}
          />
        </div>
      </div>
    </section>
  );
}
