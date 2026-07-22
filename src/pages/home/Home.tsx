import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import heroImage from "../../assets/img/img-hero.png";
import AnimationText from "../../components/animation-text/AnimationText";
import BtnElegant from "../../components/btn-elegant/BtnElegant";
import RevealOnScroll from "../../components/reveal-on-scroll/RevealOnScroll";
import SectionTitle from "../../components/section-title/SectionTitle";
import { ROUTES } from "../../routes/routePaths";
import styles from "./Home.module.css";
import {
  AboutCompany,
  BgHero,
  CardSection,
  Contact,
  FlowIntegration,
  getDefaultSliderGames,
  InfraTecnology,
  JuegosPropios,
  Metrics,
  PresenciaLatam,
  ProviderCarousel,
  SliderGames,
} from "./components";
import { getProductCards, providerLogos } from "./data";

function Home() {
  const { t } = useTranslation("home");
  const productCards = getProductCards(t);
  const sliderGames = getDefaultSliderGames(t);

  return (
    <>
      <section className={styles.hero}>
        <BgHero
          className={styles.heroBackground}
          colors={["#9912F3", "#940DF0", "#07F2F2"]}
          backgroundColor="#0b0f14"
          speed={0.38}
          streakCount={3}
          streakWidth={1.15}
          streakLength={1.1}
          glow={0.65}
          backgroundGlow={0.28}
          opacity={0.6}
          density={0.72}
          twinkle={0.55}
          zoom={2.8}
          mouseInteraction
          mouseStrength={1.35}
          mouseRadius={0.46}
          mouseDampening={0.08}
        />

        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className="container position-relative">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <div className={`${styles.heroContent} mx-auto mx-lg-0`}>
                <span className={styles.eyebrow}>{t("hero.eyebrow")}</span>
                <SectionTitle
                  as="h1"
                  className={`${styles.title} mx-auto mx-lg-0`}
                  lineClassName={styles.titleLine}
                  accentClassName={styles.titleLineAccent}
                  lines={[
                    {
                      content: (
                        <AnimationText
                          text={t("hero.titleFirst")}
                          tag="span"
                          textAlign="inherit"
                          overflow="visible"
                          splitType="words"
                          delay={90}
                          duration={0.8}
                          from={{ opacity: 0, y: 32, rotateX: -55 }}
                          to={{ opacity: 1, y: 0, rotateX: 0 }}
                          rootMargin="0px"
                        />
                      ),
                    },
                    {
                      accent: true,
                      content: (
                        <AnimationText
                          text={t("hero.titleSecond")}
                          tag="span"
                          textAlign="inherit"
                          overflow="visible"
                          splitType="words"
                          delay={90}
                          duration={0.8}
                          from={{ opacity: 0, y: 32, rotateX: -55 }}
                          to={{ opacity: 1, y: 0, rotateX: 0 }}
                          rootMargin="0px"
                        />
                      ),
                    },
                  ]}
                />
                <p className={`${styles.description} mx-auto mx-lg-0`}>
                  {t("hero.description")}
                </p>

                <div className={styles.actions}>
                  <BtnElegant
                    text={t("hero.primaryCta")}
                    to={ROUTES.contact}
                  />
                  <a className={styles.secondaryLink} href="#single-api">
                    {t("hero.secondaryCta")}
                  </a>
                </div>
              </div>
            </div>

            <div className={`col-12 col-lg-6 ${styles.heroMediaColumn}`}>
              <div className={`${styles.heroMedia} ms-lg-auto`}>
                <div
                  className={styles.heroVisualStage}
                  aria-label={t("hero.visualLabel")}
                >
                  <div className={styles.heroVisualFrame}>
                    <img
                      className={styles.heroVisualImage}
                      src={heroImage}
                      alt={t("hero.imageAlt")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RevealOnScroll className={styles.revealBackdrop}>
        <Metrics />
      </RevealOnScroll>

      <RevealOnScroll className={styles.revealBackdrop}>
        <AboutCompany />
      </RevealOnScroll>

      <RevealOnScroll as="section" className={styles.presenciaLatamSection}>
        <PresenciaLatam />
      </RevealOnScroll>

      <RevealOnScroll
        as="section"
        className={`${styles.bgCardSection} container-fluid`}
      >
        <div className={styles.cardSectionHeader}>
          <span className={styles.sectionEyebrow}>{t("stack.eyebrow")}</span>
          <SectionTitle
            className={styles.cardSectionTitle}
            accentClassName={styles.cardSectionTitleAccent}
            lines={[
              t("stack.titleFirst"),
              { content: t("stack.titleSecond"), accent: true },
            ]}
          />
          <p className={styles.cardSectionDescription}>
            {t("stack.description")}
          </p>
        </div>
        <CardSection cards={productCards} />

        <div
          className={styles.cardSectionLinks}
          aria-label={t("stack.actionsLabel")}
        >
          <a className={styles.cardSectionLinkPrimary} href="#contact-home">
            {t("stack.salesCta")}
          </a>
          <Link className={styles.cardSectionLinkSecondary} to={ROUTES.about}>
            {t("stack.aboutCta")}
          </Link>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className={styles.revealBackdrop}>
        <JuegosPropios />
      </RevealOnScroll>

      <RevealOnScroll as="section" className={styles.providerSection}>
        <div className="container position-relative">
          <div className={styles.providerPanel}>
            <div className={styles.providerHeader}>
              <span className={styles.providerEyebrow}>
                {t("providers.eyebrow")}
              </span>
              <SectionTitle
                className={styles.providerTitle}
                accentClassName={styles.providerTitleAccent}
                lines={[
                  t("providers.titleFirst"),
                  { content: t("providers.titleSecond"), accent: true },
                ]}
              />
              <p>{t("providers.description")}</p>
            </div>

            <div className={styles.providerCarouselFrame}>
              <ProviderCarousel
                items={providerLogos}
                ariaLabel={t("providers.carouselLabel")}
                logoWidth={180}
                logoHeight={92}
                durationSeconds={92}
              />
            </div>

            <div className={styles.providerActions}>
              <BtnElegant
                text={t("providers.cta")}
                to={ROUTES.gameProviders}
                ariaLabel={t("providers.cta")}
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll className={styles.revealBackdrop}>
        <SliderGames
          className={styles.sliderGames}
          slides={sliderGames}
          eyebrow={t("slider.eyebrow")}
          autoPlayMs={6000}
          titlePrefix={t("slider.titlePrefix")}
          titleAccent={t("slider.titleAccent")}
          titleSuffix={t("slider.titleSuffix")}
          ariaLabel={t("slider.ariaLabel")}
        />
      </RevealOnScroll>

      <RevealOnScroll className={styles.revealBackdrop}>
        <FlowIntegration />
      </RevealOnScroll>

      <RevealOnScroll className={styles.revealBackdropLight}>
        <InfraTecnology />
      </RevealOnScroll>

      <RevealOnScroll className={styles.revealBackdrop}>
        <Contact />
      </RevealOnScroll>
    </>
  );
}

export default Home;
