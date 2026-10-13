import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import adventuresBeyondImage from "../../../../assets/img/games-img/Adventures_Beyond.webp";
import aviatorImage from "../../../../assets/img/games-img/Aviator.webp";
import aviatrixImage from "../../../../assets/img/games-img/Aviatrix.webp";
import baccaratImage from "../../../../assets/img/games-img/Baccarat_6.webp";
import coinStrikeImage from "../../../../assets/img/games-img/CoinStrike.webp";
import ecuabetRouletteImage from "../../../../assets/img/games-img/Ecuabet_roulette.webp";
import fire88Image from "../../../../assets/img/games-img/Fire88.webp";
import gatesOlympusImage from "../../../../assets/img/games-img/GatesOlympus.webp";
import goldenTreeImage from "../../../../assets/img/games-img/GoldenTree.webp";
import hotToBurnImage from "../../../../assets/img/games-img/HotToBurn.webp";
import jetXImage from "../../../../assets/img/games-img/JetX.webp";
import megaRouletteImage from "../../../../assets/img/games-img/Mega_Roulette.webp";
import rouletteImage from "../../../../assets/img/games-img/Roulette_1.webp";
import rouletteThreeImage from "../../../../assets/img/games-img/Roulette_3.webp";
import rouletteVegasImage from "../../../../assets/img/games-img/Roulette_500_Vegas.webp";
import roulettePlaytechImage from "../../../../assets/img/games-img/Roulette_Playtech.webp";
import ruletaLatinaImage from "../../../../assets/img/games-img/Ruleta_Latina_Doradobet.webp";
import superSevensImage from "../../../../assets/img/games-img/Super 7s.webp";
import sweetBonanzaImage from "../../../../assets/img/games-img/SweetBonanza.webp";
import thunderCoinsImage from "../../../../assets/img/games-img/ThunderCoins.webp";
import blueWizardImage from "../../../../assets/img/img-blue-wizard.webp";
import energyCoinsImage from "../../../../assets/img/img-energy-coins.webp";
import grandExpressImage from "../../../../assets/img/img-grand-express.webp";
import olympusImage from "../../../../assets/img/img-olympus.webp";
import sharkFeastImage from "../../../../assets/img/img-shark-feast.webp";
import egyptImage from "../../../../assets/img/egypt.webp";
import wildRichesImage from "../../../../assets/img/wild.webp";
import BtnElegant from "../../../../components/btn-elegant/BtnElegant";
import { ROUTES } from "../../../../routes/routePaths";
import DomeGallery from "../domo-galery/DomeGallery";
import styles from "./HeroCasinoAgregation.module.css";

export function HeroCasinoAgregation() {
  const { t } = useTranslation("casinoAggregation");

  /* imagenes que se renderizan en el domo-galery */
  const gameImages = [
    { src: adventuresBeyondImage, alt: "Adventures Beyond" },
    { src: aviatorImage, alt: "Aviator" },
    { src: aviatrixImage, alt: "Aviatrix" },
    { src: baccaratImage, alt: "Baccarat" },
    { src: coinStrikeImage, alt: "Coin Strike" },
    { src: ecuabetRouletteImage, alt: "Ecuabet Roulette" },
    { src: fire88Image, alt: "Fire 88" },
    { src: gatesOlympusImage, alt: "Gates of Olympus" },
    { src: goldenTreeImage, alt: "Golden Tree" },
    { src: hotToBurnImage, alt: "Hot to Burn" },
    { src: jetXImage, alt: "JetX" },
    { src: megaRouletteImage, alt: "Mega Roulette" },
    { src: rouletteImage, alt: "Roulette" },
    { src: rouletteThreeImage, alt: "Roulette 3" },
    { src: rouletteVegasImage, alt: "500x Vegas Roulette" },
    { src: roulettePlaytechImage, alt: "Playtech Roulette" },
    { src: ruletaLatinaImage, alt: "Ruleta Latina Doradobet" },
    { src: superSevensImage, alt: "Super 7s" },
    { src: sweetBonanzaImage, alt: "Sweet Bonanza" },
    { src: thunderCoinsImage, alt: "Thunder Coins" },
    { src: sharkFeastImage, alt: "Shark Feast" },
    { src: grandExpressImage, alt: "Grand Express" },
    { src: olympusImage, alt: "Olympus" },
    { src: energyCoinsImage, alt: "Energy Coins" },
    { src: blueWizardImage, alt: "Blue Wizard" },
    { src: egyptImage, alt: "Giga Match Egypt" },
    { src: wildRichesImage, alt: "Wild Wild Riches" },
  ];
  const gameCategories = [
    t("hero.categories.slots"),
    t("hero.categories.liveCasino"),
    t("hero.categories.instantGames"),
    t("hero.categories.tableGames"),
  ];
  const metrics = [
    {
      value: t("hero.metrics.providers.value"),
      label: t("hero.metrics.providers.label"),
    },
    {
      value: t("hero.metrics.games.value"),
      label: t("hero.metrics.games.label"),
    },
  ];

  return (
    <div className={styles.page}>
      <section
        className={styles.hero}
        aria-labelledby="casino-aggregation-title"
      >
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {t("hero.eyebrow")}
          </p>

          <h1 className={styles.title} id="casino-aggregation-title">
            <span className={styles.titlePrimary}>
              <span>{t("hero.title.primaryFirst")}</span>{" "}
              <span>{t("hero.title.primarySecond")}</span>
            </span>
            <span className={styles.titleAccent}>
              <span>{t("hero.title.accentFirst")}</span>{" "}
              <span>{t("hero.title.accentSecond")}</span>
            </span>
          </h1>

          <p className={styles.description}>{t("hero.description")}</p>

          <ul
            className={styles.categories}
            aria-label={t("hero.categories.ariaLabel")}
          >
            {gameCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>

          <ul
            className={styles.metrics}
            aria-label={t("hero.metrics.ariaLabel")}
          >
            {metrics.map((metric) => (
              <li className={styles.metric} key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual} id="game-world">
          <div className={styles.globeStage}>
            <div className={styles.globeShell}>
              <div className={styles.globeSurface}>
                <DomeGallery
                  images={gameImages}
                  autoRotate
                  autoRotateSpeed={1.8}
                  fit={0.78}
                  minRadius={380}
                  maxRadius={560}
                  padFactor={0.02}
                  overlayBlurColor="#050428"
                  maxVerticalRotationDeg={2}
                  dragSensitivity={24}
                  openedImageWidth=""
                  openedImageHeight=""
                  imageBorderRadius="10px"
                  openedImageBorderRadius="50%"
                  grayscale={false}
                />
              </div>
            </div>

            <div className={styles.worldBadge}>
              <span className={styles.liveDot} aria-hidden="true" />
              <span>
                <strong>{t("hero.world.badgeTitle")}</strong>
                {t("hero.world.badgeHint")}
              </span>
            </div>
          </div>

          <p className={styles.visualCaption}>{t("hero.world.caption")}</p>
        </div>

        <div className={styles.actions}>
          <BtnElegant
            ariaLabel={t("hero.actions.expertLabel")}
            text={t("hero.actions.expert")}
            to={ROUTES.contact}
          />
          <Link className={styles.secondaryAction} to={ROUTES.gameProviders}>
            {t("hero.actions.explore")}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HeroCasinoAgregation;
