import type { TFunction } from "i18next";
import BlueWizardImg from "../../../../assets/img/img-blue-wizard.webp";
import EnergyCoinsImg from "../../../../assets/img/img-energy-coins.webp";
import GrandExpressImg from "../../../../assets/img/img-grand-express.webp";
import OlympusImg from "../../../../assets/img/img-olympus.webp";
import SharkFeastImg from "../../../../assets/img/img-shark-feast.webp";
import type { SliderGameSlide } from "./SliderGames";

export function getDefaultSliderGames(
  t: TFunction<"home">,
): SliderGameSlide[] {
  return [
    {
      id: "shark-feast",
      title: "SHARK FEAST",
      description: t("slider.slides.sharkFeast.description"),
      imageSrc: SharkFeastImg,
      imageAlt: t("slider.slides.sharkFeast.imageAlt"),
      accent: "#3bf0ff",
      particleType: "bubbles",
    },
    {
      id: "grand-express",
      title: "GRAND EXPRESS",
      description: t("slider.slides.grandExpress.description"),
      imageSrc: GrandExpressImg,
      imageAlt: t("slider.slides.grandExpress.imageAlt"),
      accent: "#ff2bd6",
      glowColor: "#ff64e8",
      particleType: "expressTiles",
    },
    {
      id: "crash",
      title: "OLYMPUS",
      description: t("slider.slides.olympus.description"),
      imageSrc: OlympusImg,
      imageAlt: t("slider.slides.olympus.imageAlt"),
      accent: "#ffd24a",
      particleType: "sparks",
    },
    {
      id: "energy-coins",
      title: "ENERGY COINS",
      description: t("slider.slides.energyCoins.description"),
      imageSrc: EnergyCoinsImg,
      imageAlt: t("slider.slides.energyCoins.imageAlt"),
      accent: "#ffd24a",
      glowColor: "#39ffbf",
      particleType: "energyCoins",
    },
    {
      id: "blue-wizard",
      title: "BLUE WIZARD",
      description: t("slider.slides.blueWizard.description"),
      imageSrc: BlueWizardImg,
      imageAlt: t("slider.slides.blueWizard.imageAlt"),
      accent: "#5ee7ff",
      glowColor: "#8a7cff",
      particleType: "wizardMagic",
    },
    
    
    /* pendiente demas juegos */

  ];
}
