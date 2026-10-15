import { useTranslation } from "react-i18next";
import Contact from "../../components/contact/Contact";
import RevealOnScroll from "../../components/reveal-on-scroll/RevealOnScroll";
import SliderMarcas from "../../components/slider-marcas/SliderMarcas";
import { ROUTES } from "../../routes/routePaths";
import SectionBenefits from "./components/benefits/Benefits";
// import CasosExitos from "./components/casos-exitos/CasosExitos";
import HeroCasinoAgregation from "./components/hero-casino-agregation/HeroCasinoAgregation";
import Integration from "./components/integration/Integration";
import ProvidersCasinoAgregation from "./components/providers-casino/ProvidersCasinoAgregation";
import styles from "./CasinoAggregation.module.css";

export function CasinoAggregation() {
  const { t } = useTranslation("casinoAggregation");

  return (
    <>
      <HeroCasinoAgregation />
      <RevealOnScroll className={styles.revealBackdrop}>
        <SliderMarcas
          titulo={t("trustedBrands.title")}
          ariaLabel={t("trustedBrands.ariaLabel")}
          ctaTexto={t("trustedBrands.cta")}
          ctaRuta={ROUTES.contact}
          ctaShowIcon={false}
          duracionSegundos={30}
          pausarAlPasar
          transicionHero
        />
      </RevealOnScroll>
      <RevealOnScroll className={styles.revealBackdrop}>
        <SectionBenefits />
      </RevealOnScroll>
      <RevealOnScroll className={styles.revealBackdrop}>
        <Integration />
      </RevealOnScroll>
      <RevealOnScroll className={styles.revealBackdrop}>
        <ProvidersCasinoAgregation />
      </RevealOnScroll>

      {/* <RevealOnScroll className={styles.revealBackdrop}>
        <CasosExitos />
      </RevealOnScroll> */}

      <RevealOnScroll className={styles.revealBackdrop}>
        <Contact
          sectionId="contact-casino-aggregation"
          translationNamespace="casinoAggregation"
        />
      </RevealOnScroll>
    </>
  );
}

export default CasinoAggregation;
