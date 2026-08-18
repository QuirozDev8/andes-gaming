import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import mapBackground from "../../../../assets/img/bg-map-about.webp";
import latamMap from "../../../../assets/img/mapa-about-sinfondo.webp";
import flagArgentina from "../../../../assets/img/flags/ar.svg";
import flagBolivia from "../../../../assets/img/flags/bo.svg";
import flagBrazil from "../../../../assets/img/flags/br.svg";
import flagChile from "../../../../assets/img/flags/cl.svg";
import flagColombia from "../../../../assets/img/flags/co.svg";
import flagCostaRica from "../../../../assets/img/flags/cr.svg";
import flagDominicanRepublic from "../../../../assets/img/flags/do.svg";
import flagEcuador from "../../../../assets/img/flags/ec.svg";
import flagGuatemala from "../../../../assets/img/flags/gt.svg";
import flagHonduras from "../../../../assets/img/flags/hn.svg";
import flagMexico from "../../../../assets/img/flags/mx.svg";
import flagNicaragua from "../../../../assets/img/flags/ni.svg";
import flagPanama from "../../../../assets/img/flags/pa.svg";
import flagParaguay from "../../../../assets/img/flags/py.svg";
import flagPeru from "../../../../assets/img/flags/pe.svg";
import flagElSalvador from "../../../../assets/img/flags/sv.svg";
import flagUruguay from "../../../../assets/img/flags/uy.svg";
import flagVenezuela from "../../../../assets/img/flags/ve.svg";
import RevealOnScroll from "../../../../components/reveal-on-scroll/RevealOnScroll";
import styles from "./MapAbout.module.css";

const MARKETS = [
  { flag: flagArgentina, translationKey: "argentina" },
  { flag: flagBolivia, translationKey: "bolivia" },
  { flag: flagBrazil, translationKey: "brazil" },
  { flag: flagChile, translationKey: "chile" },
  { flag: flagColombia, translationKey: "colombia" },
  { flag: flagCostaRica, translationKey: "costaRica" },
  { flag: flagEcuador, translationKey: "ecuador" },
  { flag: flagElSalvador, translationKey: "elSalvador" },
  { flag: flagGuatemala, translationKey: "guatemala" },
  { flag: flagHonduras, translationKey: "honduras" },
  { flag: flagMexico, translationKey: "mexico" },
  { flag: flagNicaragua, translationKey: "nicaragua" },
  { flag: flagPanama, translationKey: "panama" },
  { flag: flagParaguay, translationKey: "paraguay" },
  { flag: flagPeru, translationKey: "peru" },
  { flag: flagDominicanRepublic, translationKey: "dominicanRepublic" },
  { flag: flagUruguay, translationKey: "uruguay" },
  { flag: flagVenezuela, translationKey: "venezuela" },
] as const;

export default function MapAbout() {
  const { t } = useTranslation("aboutPage");
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const mapRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const map = mapRef.current;

    if (!section || !background || !map || typeof window === "undefined") {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      {
        precisePointer: "(hover: hover) and (pointer: fine)",
        reducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { precisePointer, reducedMotion } = context.conditions as {
          precisePointer: boolean;
          reducedMotion: boolean;
        };

        gsap.set([background, map], { x: 0, y: 0 });

        if (!precisePointer || reducedMotion) return;

        let animationFrame: number | null = null;
        let pointerIsActive = false;
        const pointerPosition = { x: 0, y: 0 };

        const moveBackgroundX = gsap.quickTo(background, "x", {
          duration: 0.48,
          ease: "power3.out",
        });
        const moveBackgroundY = gsap.quickTo(background, "y", {
          duration: 0.48,
          ease: "power3.out",
        });
        const moveMapX = gsap.quickTo(map, "x", {
          duration: 0.44,
          ease: "power3.out",
        });
        const moveMapY = gsap.quickTo(map, "y", {
          duration: 0.44,
          ease: "power3.out",
        });

        const resetParallax = () => {
          moveBackgroundX(0);
          moveBackgroundY(0);
          moveMapX(0);
          moveMapY(0);
        };

        const updateParallax = () => {
          animationFrame = null;

          if (!pointerIsActive) return;

          const bounds = section.getBoundingClientRect();
          const pointerIsInside =
            pointerPosition.x >= bounds.left &&
            pointerPosition.x <= bounds.right &&
            pointerPosition.y >= bounds.top &&
            pointerPosition.y <= bounds.bottom;

          if (!pointerIsInside) {
            pointerIsActive = false;
            resetParallax();
            return;
          }

          const normalizedX =
            ((pointerPosition.x - bounds.left) / bounds.width - 0.5) * 2;
          const normalizedY =
            ((pointerPosition.y - bounds.top) / bounds.height - 0.5) * 2;

          moveBackgroundX(normalizedX * -7);
          moveBackgroundY(normalizedY * -5);
          moveMapX(normalizedX * 14);
          moveMapY(normalizedY * 9);
        };

        const scheduleParallaxUpdate = () => {
          if (!pointerIsActive || animationFrame !== null) return;
          animationFrame = window.requestAnimationFrame(updateParallax);
        };

        const handlePointerMove = (event: PointerEvent) => {
          pointerPosition.x = event.clientX;
          pointerPosition.y = event.clientY;
          pointerIsActive = true;
          scheduleParallaxUpdate();
        };

        const handlePointerLeave = () => {
          pointerIsActive = false;
          resetParallax();
        };

        section.addEventListener("pointermove", handlePointerMove);
        section.addEventListener("pointerleave", handlePointerLeave);
        window.addEventListener("scroll", scheduleParallaxUpdate, {
          passive: true,
        });
        window.addEventListener("resize", scheduleParallaxUpdate);

        return () => {
          section.removeEventListener("pointermove", handlePointerMove);
          section.removeEventListener("pointerleave", handlePointerLeave);
          window.removeEventListener("scroll", scheduleParallaxUpdate);
          window.removeEventListener("resize", scheduleParallaxUpdate);

          if (animationFrame !== null) {
            window.cancelAnimationFrame(animationFrame);
          }

          moveBackgroundX.tween.kill();
          moveBackgroundY.tween.kill();
          moveMapX.tween.kill();
          moveMapY.tween.kill();
          gsap.killTweensOf([background, map]);
        };
      },
    );

    return () => {
      media.revert();
      gsap.killTweensOf([background, map]);
      gsap.set([background, map], { x: 0, y: 0 });
    };
  }, []);

  return (
    <section
      className={styles.section}
      aria-labelledby="map-about-title"
      ref={sectionRef}
    >
      <img
        className={styles.backgroundImage}
        src={mapBackground}
        alt=""
        aria-hidden="true"
        width={2006}
        height={784}
        loading="lazy"
        decoding="async"
        ref={backgroundRef}
      />
      <div className={styles.backdropOverlay} aria-hidden="true" />
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        <RevealOnScroll distancePx={22} durationMs={900}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              {t("map.eyebrow")}
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </span>

            <h2 className={styles.title} id="map-about-title">
              <span>{t("map.titlePrefix")}</span>
              <span className={styles.titleAccent}>{t("map.titleAccent")}</span>
            </h2>
          </header>
        </RevealOnScroll>

        <RevealOnScroll delayMs={90} distancePx={16} durationMs={850}>
          <div
            className={styles.marketsViewport}
            role="region"
            aria-label={t("map.marketsAriaLabel")}
            tabIndex={0}
          >
            <ul className={styles.markets}>
              {MARKETS.map((market) => (
                <li className={styles.market} key={market.translationKey}>
                  <img
                    className={styles.flag}
                    src={market.flag}
                    alt=""
                    aria-hidden="true"
                    width={36}
                    height={36}
                    decoding="async"
                    draggable={false}
                  />
                  <span className={styles.marketName}>
                    {t(`map.markets.${market.translationKey}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150} distancePx={28} durationMs={1050}>
          <div className={styles.mapStage}>
            <img
              className={styles.mapImage}
              src={latamMap}
              alt={t("map.imageAlt")}
              width={2007}
              height={784}
              loading="lazy"
              decoding="async"
              ref={mapRef}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
