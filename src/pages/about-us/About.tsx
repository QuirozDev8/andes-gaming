import HeroAbout from "./components/hero-about/HeroAbout";
import HistoryAndes from "./components/history-andes/HistoryAndes";
import Metrics from "../home/components/metrics/Metrics";
import Contact from "../../components/contact/Contact";
import RevealOnScroll from "../../components/reveal-on-scroll/RevealOnScroll";
import MisionVisionValores from "./components/mision-vision-valores/MisionVisionValores";
// import Certificaciones from "./components/certificaciones/Certificaciones";
import MapAbout from "./components/map-about/MapAbout";
import styles from "./About.module.css";

export function About() {
  return (
    <>
      <HeroAbout />
      <Metrics />

      <HistoryAndes />

      <MisionVisionValores />

      <MapAbout />

     {/*  <Certificaciones /> */}
     
      <RevealOnScroll className={styles.revealBackdrop}>
        <Contact sectionId="contact-about" translationNamespace="aboutPage" />
      </RevealOnScroll>
    </>
  );
}

export default About;
