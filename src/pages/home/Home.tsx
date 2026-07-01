import { ROUTES } from "../../routes/routePaths";
import AnimationText from "../../components/animation-text/AnimationText";
import SectionTitle from "../../components/section-title/SectionTitle";
import styles from "./Home.module.css";
import BtnElegant from "../../components/btn-elegant/BtnElegant";
import heroImage from "../../assets/img/img-hero.png";
import {
  AboutCompany,
  BgHero,
  CardSection,
  defaultSliderGames,
  Metrics,
  ProviderCarousel,
  SliderGames,
  PresenciaLatam,
  FlowIntegration,
  InfraTecnology,
  Contact, JuegosPropios
} from "./components";
import { productCards, providerLogos } from "./data";


function Home() {
  return (
    <>
      {/* Hero section */}
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
                <span className={styles.eyebrow}> iGaming B2B Platform </span>
                <SectionTitle
                  as="h1"
                  className={`${styles.title} mx-auto mx-lg-0`}
                  lineClassName={styles.titleLine}
                  accentClassName={styles.titleLineAccent}
                  lines={[
                    {
                      content: (
                        <AnimationText
                          text="Una sola API."
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
                          text="Un universo de juegos."
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
                  Integra proveedores, estudios y operadores en una
                  infraestructura robusta, escalable y preparada para acelerar
                  tu operacion iGaming.
                </p>

                <div className={styles.actions}>
                  <BtnElegant text="Become a partner" to={ROUTES.contact} />
                  <a className={styles.secondaryLink} href="#single-api">
                    Explorar tecnologia
                  </a>
                </div>
              </div>
            </div>

            <div className={`col-12 col-lg-6 ${styles.heroMediaColumn}`}>
              <div className={`${styles.heroMedia} ms-lg-auto`}>
                <div
                  className={styles.heroVisualStage}
                  aria-label="Imagen principal de Andes Gaming"
                >
                  <div className={styles.heroVisualFrame}>
                    <img
                      className={styles.heroVisualImage}
                      src={heroImage}
                      alt="hero img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics section */}
      <Metrics />

      {/* What is Andesgaming? section */}
      <AboutCompany />

      {/* Card section */}
      <section className={`${styles.bgCardSection} container-fluid`}>
        <div className={styles.cardSectionHeader}>
          <span className={styles.sectionEyebrow}>Stack iGaming B2B</span>
          <SectionTitle
            className={styles.cardSectionTitle}
            accentClassName={styles.cardSectionTitleAccent}
            lines={[
              "Todo lo que necesitas",
              { content: "para escalar", accent: true },
            ]}
          />
          <p className={styles.cardSectionDescription}>
            Integra proveedores, estudios y operadores en una infraestructura
            robusta, escalable y preparada para acelerar tu operacion iGaming.
          </p>
        </div>
        <CardSection cards={productCards} />
      </section>

       <JuegosPropios />

      {/* Providers section */}
      <section className={styles.providerSection}>
        <div className="container position-relative">
          <div className={styles.providerPanel}>
            <div className={styles.providerHeader}>
              <span className={styles.providerEyebrow}>Ecosistema conectado</span>
              <SectionTitle
                className={styles.providerTitle}
                accentClassName={styles.providerTitleAccent}
                lines={[
                  "Conectamos marcas con",
                  { content: "proveedores de primer nivel", accent: true },
                ]}
              />
              <p>
              Tu camino hacia una diversa colección de más de 200 proveedores de
              juegos premium para crear una experiencia de juego personalizada
              para tus jugadores.
              </p>
            </div>

            <div className={styles.providerCarouselFrame}>
              <ProviderCarousel
                items={providerLogos}
                ariaLabel="Logos de proveedores integrados"
                logoWidth={180}
                logoHeight={92}
                durationSeconds={82}
              />
            </div>

            <div className={styles.providerActions}>
              <BtnElegant
                text="Ver todos los proveedores"
                to={ROUTES.gameProviders}
                ariaLabel="Ver todos los proveedores"
              />
            </div>
          </div>
        </div>
      </section>

      <SliderGames
        className={styles.sliderGames}
        slides={defaultSliderGames}
        eyebrow="// proveedores destacados"
        autoPlayMs={6000}
        titlePrefix="Juegos"
        titleAccent="destacados"
        titleSuffix=" de nuestros proveedores."
        ariaLabel="Slider de juegos principales de proveedores"
      />
  
      
      <section className={styles.presenciaLatamSection}>
        <PresenciaLatam />
      </section>

      <FlowIntegration />
      
      

     
      <InfraTecnology />
        <section>
          <p className="text-black text-center"> pendiente desarrollo </p> 
        </section>
       <Contact /> 
    </>
  );
}

export default Home;
