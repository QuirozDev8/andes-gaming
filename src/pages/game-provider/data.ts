import evolutionLogo from "../../assets/logos/logos-providers/evolution.png";
import gamebeatLogo from "../../assets/logos/logos-providers/Gamebeat.png";
import mancalaGamingLogo from "../../assets/logos/logos-providers/Mancala-Gaming.png";
import playngoLogo from "../../assets/logos/logos-providers/playngo_logo.png";
import pragmaticPlayLogo from "../../assets/logos/logos-providers/pragmaticplay.png";
import smartsoftLogo from "../../assets/logos/logos-providers/smartsoft.png";
import swinttLogo from "../../assets/logos/logos-providers/swintt.png";
import vivoGamingLogo from "../../assets/logos/logos-providers/vivo-gaming.png";
import zeusPlayLogo from "../../assets/logos/logos-providers/zeus-play.png";

export interface GameProviderItem {
  id: string;
  name: string;
  src: string;
  alt: string;
}

export const gameProviders: GameProviderItem[] = [
  {
    id: "pragmatic-play",
    name: "Pragmatic Play",
    src: pragmaticPlayLogo,
    alt: "Pragmatic Play",
  },
  { id: "evolution", name: "Evolution", src: evolutionLogo, alt: "Evolution" },
  { id: "playngo", name: "Play'n GO", src: playngoLogo, alt: "Play'n GO" },
  { id: "gamebeat", name: "Gamebeat", src: gamebeatLogo, alt: "Gamebeat" },
  {
    id: "mancala-gaming",
    name: "Mancala Gaming",
    src: mancalaGamingLogo,
    alt: "Mancala Gaming",
  },
  {
    id: "smartsoft",
    name: "Smartsoft",
    src: smartsoftLogo,
    alt: "Smartsoft",
  },
  { id: "swintt", name: "Swintt", src: swinttLogo, alt: "Swintt" },
  {
    id: "vivo-gaming",
    name: "Vivo Gaming",
    src: vivoGamingLogo,
    alt: "Vivo Gaming",
  },
  { id: "zeus-play", name: "Zeus Play", src: zeusPlayLogo, alt: "Zeus Play" },
];
