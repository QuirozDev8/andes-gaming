import RevealOnScroll from "../../components/reveal-on-scroll/RevealOnScroll";
import HeroGameProvider from "./components/hero-game-provider/HeroGameProvider";
import AllProviders from "./components/all-providers/AllProviders";
import BecomePartner from "./components/become-partner/BecomePartner";
import styles from "./GameProvider.module.css";

export function GameProvider() {
  return (
    <>
      <HeroGameProvider />

      <RevealOnScroll className={styles.catalogReveal}>
        <AllProviders />
      </RevealOnScroll>

      <RevealOnScroll className={styles.partnerReveal}>
        <BecomePartner />
      </RevealOnScroll>
    </>
  );
}

export default GameProvider;
