import { ROUTES } from "../../routes/routePaths";
import {
  ChartNoAxesCombined,
  Gamepad2,
  Network,
  Settings2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import AnimationText from "../../components/animation-text/AnimationText";
import styles from "./Home.module.css";
import BgHero from "./components/bg-hero/BgHero";
import BtnElegant from "../../components/btn-elegant/BtnElegant";
import AboutCompany from "./components/about-company/AboutCompany";
import Metrics from "./components/metrics/Metrics";
import CardSection, {type CardSectionCardProps,} from "./components/card-section/CardSection";
import cardBackground from "../../assets/img/bg-mountain2.png";
import { SliderGames, defaultSliderGames } from "./components/SliderGames";
import ProviderCarousel, {
  type ProviderCarouselItem,
} from "./components/provider-carousel/ProviderCarousel";
import CardMundoImg from "../../assets/img/bg-mundo.webp";
import CardPiezaImg from "../../assets/img/bg-pieza.webp";
import CardCoheteImg from "../../assets/img/bg-cohete.webp";
import heroImage from "../../assets/img/img-hero.png";
import pragmaticLogo from "../../assets/logos/pragmatic.webp";
import playsonLogo from "../../assets/logos/playson.webp";
import playngoLogo from "../../assets/logos/playngo.webp";
import platiplusLogo from "../../assets/logos/platiplus.webp";


const productCards: CardSectionCardProps[] = [
  {
    color: "#120F17",
    title: "Single API",
    description:
      "Integra casino, sportsbook, pagos y servicios desde una sola capa.",
    label: "Core Layer",
    icon: Network,
    backgroundImage: cardBackground,
  },
  {
    color: "#120F17",
    title: "Proveedores",
    description:
      "Conecta estudios, agregadores y operadores con flujos centralizados.",
    label: "Ecosistema",
    icon: UsersRound,
    backgroundImage: CardMundoImg,
  },
  {
    color: "#120F17",
    title: "Operacion escalable",
    description:
      "Arquitectura preparada para crecer por marca, mercado y volumen operativo.",
    label: "Escalabilidad",
    icon: ChartNoAxesCombined,
    backgroundImage: CardCoheteImg,
  },
  {
    color: "#120F17",
    title: "Backoffice",
    description:
      "Gestiona configuraciones, contenido y visibilidad operacional desde un panel.",
    label: "Control",
    icon: Settings2,
  },
  {
    color: "#120F17",
    title: "Analitica",
    description:
      "Monitorea actividad, rendimiento e integraciones con datos accionables.",
    label: "Insights",
    icon: Gamepad2,
    backgroundImage: CardPiezaImg,
  },
  {
    color: "#120F17",
    title: "Seguridad",
    description:
      "Procesos robustos para operar integraciones B2B con mayor estabilidad.",
    label: "Proteccion",
    icon: ShieldCheck,
    backgroundImage: cardBackground,
  },
];

const providerLogos: ProviderCarouselItem[] = [
  {
    id: "pragmatic",
    src: pragmaticLogo,
    alt: "Pragmatic Play",
    
  },
  {
    id: "playson",
    src: playsonLogo,
    alt: "Playson",
  },
  {
    id: "playngo",
    src: playngoLogo,
    alt: "Play'n GO",
  },
  {
    id: "platiplus",
    src: platiplusLogo,
    alt: "Platiplus",
  },
];



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
                <h1 className={`${styles.title} mx-auto mx-lg-0`}>
                  <AnimationText
                    text="Una sola API."
                    tag="span"
                    className={styles.titleLine}
                    textAlign="inherit"
                    overflow="visible"
                    splitType="words"
                    delay={90}
                    duration={0.8}
                    from={{ opacity: 0, y: 32, rotateX: -55 }}
                    to={{ opacity: 1, y: 0, rotateX: 0 }}
                    rootMargin="0px"
                  />
                  <AnimationText
                    text="Un universo de juegos."
                    tag="span"
                    className={`${styles.titleLine} ${styles.titleLineAccent}`}
                    textAlign="inherit"
                    overflow="visible"
                    splitType="words"
                    delay={90}
                    duration={0.8}
                    from={{ opacity: 0, y: 32, rotateX: -55 }}
                    to={{ opacity: 1, y: 0, rotateX: 0 }}
                    rootMargin="0px"
                  />
                </h1>
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

            <div className="col-12 col-lg-6">
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
          <h2 className={styles.cardSectionTitle}>
            Todo lo que necesitas
            <span> para escalar</span>
          </h2>
          <p className={styles.cardSectionDescription}>
            Integra proveedores, estudios y operadores en una infraestructura
            robusta, escalable y preparada para acelerar tu operacion iGaming.
          </p>
        </div>
        <CardSection cards={productCards} />
      </section>

      {/* Providers section */}
      <section className={styles.providerSection}>
        <div className="container">
          <div className={styles.providerHeader}>
            <span className={styles.providerEyebrow}>Ecosistema conectado</span>
            <h2>
              Conectamos marcas con
              <span> proveedores de primer nivel </span>
            </h2>
            <p>
              Un hub preparado para integrar verticales, estudios y operadores
              con una experiencia B2B fluida.
            </p>
          </div>
        </div>
        <div className={styles.providerCarouselFrame}>
          <ProviderCarousel
            items={providerLogos}
            ariaLabel="Logos de proveedores integrados"
            logoWidth={170}
            logoHeight={92}
            durationSeconds={26}
          />
        </div>
        <div className={styles.providerActions}>
          <BtnElegant text="Ver todos los proveedores"
            to={ROUTES.gameProviders}
            ariaLabel="Ver todos los proveedores"
          />
        </div>
      </section>

      {/* Games section */}
      <SliderGames
        className={styles.sliderGames}
        slides={defaultSliderGames}
        eyebrow="// proveedores destacados"
        autoPlayMs={5000}
        titlePrefix="Juegos"
        titleAccent="principales"
        titleSuffix=" de nuestros proveedores."
        ariaLabel="Slider de juegos principales de proveedores"
      />

      <div style={{ height: "300px", padding: "20px" }}>
        
        separacion temporal
      </div>
    </>
  );
}

export default Home;
