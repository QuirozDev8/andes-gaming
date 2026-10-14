import HeroGameStudio from "./components/hero-game-study/HeroGameStudio";
import CommandoExperience from "./components/commando-experience/CommandoExperience";
import CommandoShowcase from "./components/commando-showcase/CommandoShowcase";

export function GameStudio() {
  return (
    <>
      <HeroGameStudio />
      <CommandoExperience />
      <CommandoShowcase />
    </>
  );
}

export default GameStudio;
