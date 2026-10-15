import HeroGameStudio from "./components/hero-game-study/HeroGameStudio";
import CommandoExperience from "./components/commando-experience/CommandoExperience";
import CommandoShowcase from "./components/commando-showcase/CommandoShowcase";
import CasinoBenefits from "./components/casino-benefits/CasinoBenefits";
import OriginalGamesPreview from "./components/original-games-preview/OriginalGamesPreview";

export function GameStudio() {
  return (
    <>
      <HeroGameStudio />
      <CommandoExperience />
      <CommandoShowcase />
      <CasinoBenefits />
      <OriginalGamesPreview />
    </>
  );
}

export default GameStudio;
