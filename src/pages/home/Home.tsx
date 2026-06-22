import { ROUTES } from "../../routes/routePaths";
import AnimationText from "../../components/animation-text/AnimationText";
import styles from "./Home.module.css";
import BgHero from "./components/bg-hero/BgHero";
import BtnElegant from "../../components/btn-elegant/BtnElegant";
import AboutCompany from "./components/about-company/AboutCompany";


function Home() {
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
        glow={0.92}
        density={0.72}
        twinkle={0.55}
        zoom={2.8}
        backgroundGlow={0.28}
        opacity={0.88}
        mouseInteraction
        mouseStrength={1.35}
        mouseRadius={0.46}
        mouseDampening={0.08} />

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
                  rootMargin="0px" />
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
                  rootMargin="0px" />
              </h1>
              <p className={`${styles.description} mx-auto mx-lg-0`}>
                Integra proveedores, estudios y operadores en una
                infraestructura robusta, escalable y preparada para acelerar tu
                operacion iGaming.
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
              <div className={styles.imagePlaceholder}>
                <span className={styles.imagePlaceholderLabel}>
                  Imagen hero
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    
    <AboutCompany />
    
    
    </> 
  );
}

export default Home;
