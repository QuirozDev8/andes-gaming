import coolGamesLogo from "../../assets/logos/logos-providers/cool games.png";
import coggStudiosLogo from "../../assets/logos/logos-providers/cogg-studios.png";
import conceptGamingLogo from "../../assets/logos/logos-providers/concept-gaming.png";
import cq9Logo from "../../assets/logos/logos-providers/cQ9.png";
import crazyBillionsLogo from "../../assets/logos/logos-providers/crazy-billions.png";
import ebetLogo from "../../assets/logos/logos-providers/ebet.png";
import egyptQuestLogo from "../../assets/logos/logos-providers/Egypt-Quest.png";
import elbetLogo from "../../assets/logos/logos-providers/elbet.png";
import elysiumStudiosLogo from "../../assets/logos/logos-providers/elysium-studios.png";
import evolutionLogo from "../../assets/logos/logos-providers/evolution.png";
import fusionLogo from "../../assets/logos/logos-providers/fusion.png";
import gaLogo from "../../assets/logos/logos-providers/GA.png";
import gamebeatLogo from "../../assets/logos/logos-providers/Gamebeat.png";
import gamshyLogo from "../../assets/logos/logos-providers/Gamshy.png";
import globalBetLogo from "../../assets/logos/logos-providers/Global Bet.png";
import igniteLogo from "../../assets/logos/logos-providers/ignite.png";
import igrosoftLogo from "../../assets/logos/logos-providers/igrosoft.png";
import kalambaGamesLogo from "../../assets/logos/logos-providers/kalamba-games.png";
import mancalaGamingLogo from "../../assets/logos/logos-providers/Mancala-Gaming.png";
import maxwinGamingLogo from "../../assets/logos/logos-providers/Maxwin-gaming.png";
import playngoLogo from "../../assets/logos/logos-providers/playngo_logo.png";
import pragmaticPlayLogo from "../../assets/logos/logos-providers/pragmaticplay.png";
import reelNrgSlotsLogo from "../../assets/logos/logos-providers/reel-NRG-slots.png";
import skyWindGroupLogo from "../../assets/logos/logos-providers/Sky-wind-Group.png";
import smartsoftLogo from "../../assets/logos/logos-providers/smartsoft.png";
import spearheadLogo from "../../assets/logos/logos-providers/spearhead.png";
import spinomenalLogo from "../../assets/logos/logos-providers/spinomenal.png";
import spinthonLogo from "../../assets/logos/logos-providers/spinthon.png";
import swinttLogo from "../../assets/logos/logos-providers/swintt.png";
import thunderkickLogo from "../../assets/logos/logos-providers/thunderkick.png";
import tripleProftsGamesLogo from "../../assets/logos/logos-providers/triple-profts-games.png";
import truelabLogo from "../../assets/logos/logos-providers/Truelab.png";
import virtualGenerationLogo from "../../assets/logos/logos-providers/virtual-generation.png";
import vivoGamingLogo from "../../assets/logos/logos-providers/vivo-gaming.png";
import weAreCasinoLogo from "../../assets/logos/logos-providers/we-are-casino.png";
import zeusPlayLogo from "../../assets/logos/logos-providers/zeus-play.png";
import zillionGamesLogo from "../../assets/logos/logos-providers/zillion-games.png";

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
  { id: "cool-games", name: "Cool Games", src: coolGamesLogo, alt: "Cool Games" },
  {
    id: "cogg-studios",
    name: "Cogg Studios",
    src: coggStudiosLogo,
    alt: "Cogg Studios",
  },
  { id: "playngo", name: "Play'n GO", src: playngoLogo, alt: "Play'n GO" },
  {
    id: "concept-gaming",
    name: "Concept Gaming",
    src: conceptGamingLogo,
    alt: "Concept Gaming",
  },
  { id: "cq9", name: "CQ9", src: cq9Logo, alt: "CQ9" },
  {
    id: "crazy-billions",
    name: "Crazy Billions",
    src: crazyBillionsLogo,
    alt: "Crazy Billions",
  },
  { id: "ebet", name: "Ebet", src: ebetLogo, alt: "Ebet" },
  {
    id: "egypt-quest",
    name: "Egypt Quest",
    src: egyptQuestLogo,
    alt: "Egypt Quest",
  },
  { id: "elbet", name: "Elbet", src: elbetLogo, alt: "Elbet" },
  {
    id: "elysium-studios",
    name: "Elysium Studios",
    src: elysiumStudiosLogo,
    alt: "Elysium Studios",
  },
  { id: "fusion", name: "Fusion", src: fusionLogo, alt: "Fusion" },
  { id: "ga", name: "GA", src: gaLogo, alt: "GA" },
  { id: "gamebeat", name: "Gamebeat", src: gamebeatLogo, alt: "Gamebeat" },
  { id: "gamshy", name: "Gamshy", src: gamshyLogo, alt: "Gamshy" },
  {
    id: "global-bet",
    name: "Global Bet",
    src: globalBetLogo,
    alt: "Global Bet",
  },
  { id: "igrosoft", name: "Igrosoft", src: igrosoftLogo, alt: "Igrosoft" },
  { id: "ignite", name: "Ignite", src: igniteLogo, alt: "Ignite" },
  {
    id: "kalamba-games",
    name: "Kalamba Games",
    src: kalambaGamesLogo,
    alt: "Kalamba Games",
  },
  {
    id: "mancala-gaming",
    name: "Mancala Gaming",
    src: mancalaGamingLogo,
    alt: "Mancala Gaming",
  },
  {
    id: "maxwin-gaming",
    name: "Maxwin Gaming",
    src: maxwinGamingLogo,
    alt: "Maxwin Gaming",
  },
  {
    id: "reel-nrg-slots",
    name: "Reel NRG Slots",
    src: reelNrgSlotsLogo,
    alt: "Reel NRG Slots",
  },
  {
    id: "sky-wind-group",
    name: "Skywind Group",
    src: skyWindGroupLogo,
    alt: "Skywind Group",
  },
  {
    id: "smartsoft",
    name: "Smartsoft",
    src: smartsoftLogo,
    alt: "Smartsoft",
  },
  {
    id: "spearhead",
    name: "Spearhead",
    src: spearheadLogo,
    alt: "Spearhead",
  },
  {
    id: "spinomenal",
    name: "Spinomenal",
    src: spinomenalLogo,
    alt: "Spinomenal",
  },
  { id: "spinthon", name: "Spinthon", src: spinthonLogo, alt: "Spinthon" },
  { id: "swintt", name: "Swintt", src: swinttLogo, alt: "Swintt" },
  {
    id: "thunderkick",
    name: "Thunderkick",
    src: thunderkickLogo,
    alt: "Thunderkick",
  },
  {
    id: "triple-profts-games",
    name: "Triple Profts Games",
    src: tripleProftsGamesLogo,
    alt: "Triple Profts Games",
  },
  { id: "truelab", name: "Truelab", src: truelabLogo, alt: "Truelab" },
  {
    id: "virtual-generation",
    name: "Virtual Generation",
    src: virtualGenerationLogo,
    alt: "Virtual Generation",
  },
  {
    id: "vivo-gaming",
    name: "Vivo Gaming",
    src: vivoGamingLogo,
    alt: "Vivo Gaming",
  },
  {
    id: "we-are-casino",
    name: "We Are Casino",
    src: weAreCasinoLogo,
    alt: "We Are Casino",
  },
  { id: "zeus-play", name: "Zeus Play", src: zeusPlayLogo, alt: "Zeus Play" },
  {
    id: "zillion-games",
    name: "Zillion Games",
    src: zillionGamesLogo,
    alt: "Zillion Games",
  },
];
