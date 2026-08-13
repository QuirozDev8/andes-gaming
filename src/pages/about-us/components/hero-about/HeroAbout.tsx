import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import StrokeText from "../../../../components/stroke-text";
import styles from "./HeroAbout.module.css";

type StarTone = "white" | "cyan" | "violet";
type StarKind = "spark" | "cross";

type HeroStar = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
  tone: StarTone;
  kind: StarKind;
};

type StarStyle = CSSProperties & {
  "--star-x": string;
  "--star-y": string;
  "--star-size": string;
  "--star-duration": string;
  "--star-delay": string;
  "--star-drift-x": string;
  "--star-drift-y": string;
  "--star-opacity": string;
};

const HERO_STARS: readonly HeroStar[] = [
  { x: 5, y: 14, size: 3, duration: 6.8, delay: -1.2, driftX: 13, driftY: -11, opacity: 0.9, tone: "cyan", kind: "spark" },
  { x: 12, y: 34, size: 7, duration: 8.4, delay: -4.7, driftX: 8, driftY: -15, opacity: 0.78, tone: "white", kind: "cross" },
  { x: 18, y: 9, size: 4, duration: 7.6, delay: -3.1, driftX: -9, driftY: -10, opacity: 0.72, tone: "violet", kind: "spark" },
  { x: 25, y: 26, size: 2, duration: 5.9, delay: -2.8, driftX: 10, driftY: -14, opacity: 0.86, tone: "cyan", kind: "spark" },
  { x: 31, y: 12, size: 8, duration: 9.2, delay: -6.2, driftX: -11, driftY: -8, opacity: 0.68, tone: "white", kind: "cross" },
  { x: 39, y: 38, size: 3, duration: 6.5, delay: -4.3, driftX: 7, driftY: -12, opacity: 0.74, tone: "violet", kind: "spark" },
  { x: 47, y: 8, size: 2, duration: 7.2, delay: -2.2, driftX: -8, driftY: -13, opacity: 0.84, tone: "white", kind: "spark" },
  { x: 55, y: 31, size: 6, duration: 8.8, delay: -5.4, driftX: 9, driftY: -9, opacity: 0.7, tone: "cyan", kind: "cross" },
  { x: 63, y: 13, size: 3, duration: 6.1, delay: -1.7, driftX: -10, driftY: -14, opacity: 0.86, tone: "violet", kind: "spark" },
  { x: 70, y: 36, size: 2, duration: 7.9, delay: -5.9, driftX: 8, driftY: -10, opacity: 0.78, tone: "white", kind: "spark" },
  { x: 77, y: 7, size: 7, duration: 9.6, delay: -3.8, driftX: -7, driftY: -12, opacity: 0.72, tone: "cyan", kind: "cross" },
  { x: 85, y: 27, size: 3, duration: 6.9, delay: -4.9, driftX: 11, driftY: -8, opacity: 0.82, tone: "violet", kind: "spark" },
  { x: 93, y: 12, size: 4, duration: 7.4, delay: -2.6, driftX: -9, driftY: -13, opacity: 0.88, tone: "white", kind: "spark" },
  { x: 8, y: 55, size: 2, duration: 6.2, delay: -5.2, driftX: 12, driftY: -10, opacity: 0.76, tone: "violet", kind: "spark" },
  { x: 16, y: 69, size: 6, duration: 8.7, delay: -2.1, driftX: -8, driftY: -14, opacity: 0.66, tone: "cyan", kind: "cross" },
  { x: 28, y: 53, size: 3, duration: 7.1, delay: -4.1, driftX: 9, driftY: -9, opacity: 0.78, tone: "white", kind: "spark" },
  { x: 37, y: 72, size: 2, duration: 6.6, delay: -3.4, driftX: -11, driftY: -12, opacity: 0.72, tone: "cyan", kind: "spark" },
  { x: 46, y: 59, size: 7, duration: 9.1, delay: -6.8, driftX: 7, driftY: -8, opacity: 0.64, tone: "violet", kind: "cross" },
  { x: 57, y: 74, size: 3, duration: 7.7, delay: -1.9, driftX: -9, driftY: -13, opacity: 0.76, tone: "white", kind: "spark" },
  { x: 67, y: 56, size: 2, duration: 6.4, delay: -4.6, driftX: 10, driftY: -11, opacity: 0.82, tone: "cyan", kind: "spark" },
  { x: 75, y: 71, size: 6, duration: 8.5, delay: -3.6, driftX: -8, driftY: -9, opacity: 0.68, tone: "white", kind: "cross" },
  { x: 83, y: 51, size: 3, duration: 7.3, delay: -5.6, driftX: 11, driftY: -12, opacity: 0.8, tone: "violet", kind: "spark" },
  { x: 90, y: 66, size: 2, duration: 6, delay: -2.4, driftX: -10, driftY: -10, opacity: 0.86, tone: "cyan", kind: "spark" },
  { x: 96, y: 45, size: 7, duration: 9.4, delay: -7.1, driftX: 7, driftY: -14, opacity: 0.7, tone: "white", kind: "cross" },
];

export default function HeroAbout() {
  const { i18n, t } = useTranslation("aboutPage");
  const language = i18n.resolvedLanguage ?? i18n.language;
  const firstTitleLine = t("hero.title.firstLine");
  const secondTitleLine = t("hero.title.secondLine");

  return (
    <section className={styles.hero} aria-labelledby="about-hero-title">
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.starField} aria-hidden="true">
        {HERO_STARS.map((star, index) => {
          const starStyle: StarStyle = {
            "--star-x": `${star.x}%`,
            "--star-y": `${star.y}%`,
            "--star-size": `${star.size}px`,
            "--star-duration": `${star.duration}s`,
            "--star-delay": `${star.delay}s`,
            "--star-drift-x": `${star.driftX}px`,
            "--star-drift-y": `${star.driftY}px`,
            "--star-opacity": String(star.opacity),
          };

          return (
            <span
              className={`${styles.star} ${styles[star.tone]} ${styles[star.kind]}`}
              key={`${star.x}-${star.y}-${index}`}
              style={starStyle}
            />
          );
        })}
      </div>

      <div className={styles.content}>
        <span className={styles.eyebrow}>{t("hero.eyebrow")}</span>

        <h1
          aria-label={`${firstTitleLine} ${secondTitleLine}`}
          id="about-hero-title"
          className={styles.title}
        >
          <StrokeText
            className={styles.titleLine}
            drawDuration={1.25}
            fillColor="var(--andes-white)"
            fillDelay={0.12}
            fillMode="fade"
            fontSize={96}
            fontWeight={900}
            key={`${language}-${firstTitleLine}`}
            letterSpacing={-2}
            stagger={0.028}
            strokeColor="rgba(var(--andes-white-rgb), 0.96)"
            strokeWidth={1.35}
            text={firstTitleLine.toLocaleUpperCase(language)}
            trigger="mount"
          />
          <StrokeText
            className={styles.titleLine}
            drawDuration={1.4}
            fillDelay={0.16}
            fillGradient={{
              from: "var(--andes-violet)",
              to: "var(--andes-cyan)",
            }}
            fillMode="fade"
            fontSize={96}
            fontWeight={900}
            key={`${language}-${secondTitleLine}`}
            letterSpacing={-2}
            reverse
            stagger={0.028}
            strokeColor="var(--andes-violet)"
            strokeWidth={1.35}
            text={secondTitleLine.toLocaleUpperCase(language)}
            trigger="mount"
          />
        </h1>

        <p className={styles.description}>{t("hero.description")}</p>
      </div>
    </section>
  );
}
