import { useState } from "react";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import RevealOnScroll from "../../../../components/reveal-on-scroll/RevealOnScroll";
import styles from "./HistoryAndes.module.css";

const YOUTUBE_VIDEO_ID = "-DLlrlVbiX8";
const MAX_RES_THUMBNAIL = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const FALLBACK_THUMBNAIL = `https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;

export default function HistoryAndes() {
  const { i18n, t } = useTranslation("aboutPage");
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(MAX_RES_THUMBNAIL);
  const isEnglish = (i18n.resolvedLanguage ?? i18n.language).startsWith("en");

  return (
    <section className={styles.section} aria-labelledby="history-andes-title">
      <div className={styles.gridPattern} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <RevealOnScroll
              className={styles.headerReveal}
              distancePx={20}
              durationMs={850}
            >
              <div className={styles.copyHeader}>
                <span className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} aria-hidden="true" />
                  {t("history.eyebrow")}
                </span>

                <h2
                  className={`${styles.title} ${isEnglish ? styles.titleEnglish : ""}`}
                  id="history-andes-title"
                >
                  <span className={styles.titlePrefix}>
                    {t("history.titlePrefix")}
                  </span>
                  <span className={styles.titleAccent}>
                    {t("history.titleAccent")}
                  </span>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              className={styles.bodyReveal}
              delayMs={90}
              distancePx={16}
              durationMs={850}
            >
              <div className={styles.copyBody}>
                <p className={styles.lead}>{t("history.lead")}</p>
                <p className={styles.description}>{t("history.description")}</p>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            className={styles.mediaReveal}
            delayMs={170}
            distancePx={28}
            durationMs={1000}
          >
            <div className={styles.mediaStage}>
              <div className={styles.bottomHalo} aria-hidden="true" />

              <div className={styles.cinemaFrame}>
                <div className={styles.frameHeader} aria-hidden="true">
                  <span className={styles.frameIdentity}>
                    <span className={styles.frameDot} />
                    ANDES / ORIGIN
                  </span>
                  <span className={styles.frameIndex}>FILM · 01</span>
                </div>

                <div
                  className={`${styles.portal} ${isPlaying ? styles.isPlaying : ""}`}
                >
                  {isPlaying ? (
                    <iframe
                      className={styles.iframe}
                      src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&playsinline=1`}
                      title={t("history.videoTitle")}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <button
                      className={styles.posterButton}
                      type="button"
                      aria-label={t("history.playVideo")}
                      onClick={() => setIsPlaying(true)}
                    >
                      <img
                        className={styles.thumbnail}
                        src={thumbnailSrc}
                        alt={t("history.thumbnailAlt")}
                        loading="lazy"
                        onError={() => setThumbnailSrc(FALLBACK_THUMBNAIL)}
                      />
                      <span className={styles.posterShade} aria-hidden="true" />

                      <span className={styles.playCluster} aria-hidden="true">
                        <span className={styles.playButton}>
                          <Play fill="currentColor" strokeWidth={1.8} />
                        </span>
                        <span className={styles.playLabel}>
                          {t("history.playLabel")}
                        </span>
                      </span>
                    </button>
                  )}
                </div>

                <div className={styles.frameFooter} aria-hidden="true">
                  <span className={styles.frameRule} />
                  <span>EST. 2019</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
