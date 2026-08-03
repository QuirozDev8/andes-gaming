import { useTranslation } from 'react-i18next';
import blueWizardImage from '../../../../assets/img/img-blue-wizard.webp';
import energyCoinsImage from '../../../../assets/img/img-energy-coins.webp';
import grandExpressImage from '../../../../assets/img/img-grand-express.webp';
import olympusImage from '../../../../assets/img/img-olympus.webp';
import sharkFeastImage from '../../../../assets/img/img-shark-feast.webp';
import egyptImage from '../../../../assets/img/egypt.webp';
import wildRichesImage from '../../../../assets/img/wild.webp';
import BtnElegant from '../../../../components/btn-elegant/BtnElegant';
import { ROUTES } from '../../../../routes/routePaths';
import DomeGallery from '../domo-galery/DomeGallery';
import styles from './HeroCasinoAgregation.module.css';

export function HeroCasinoAgregation() {
  const { t } = useTranslation('casinoAggregation');
  const gameImages = [
    { src: sharkFeastImage, alt: t('hero.world.images.sharkFeast') },
    { src: grandExpressImage, alt: t('hero.world.images.grandExpress') },
    { src: olympusImage, alt: t('hero.world.images.olympus') },
    { src: energyCoinsImage, alt: t('hero.world.images.energyCoins') },
    { src: blueWizardImage, alt: t('hero.world.images.blueWizard') },
    { src: egyptImage, alt: t('hero.world.images.gigaMatchEgypt') },
    { src: wildRichesImage, alt: t('hero.world.images.wildWildRiches') }
  ];
  const gameCategories = [
    t('hero.categories.slots'),
    t('hero.categories.liveCasino'),
    t('hero.categories.instantGames')
  ];
  const metrics = [
    {
      value: t('hero.metrics.providers.value'),
      label: t('hero.metrics.providers.label')
    },
    {
      value: t('hero.metrics.games.value'),
      label: t('hero.metrics.games.label')
    }
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="casino-aggregation-title">
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {t('hero.eyebrow')}
          </p>

          <h1 className={styles.title} id="casino-aggregation-title">
            <span className={styles.titlePrimary}>
              <span>{t('hero.title.primaryFirst')}</span>{' '}
              <span>{t('hero.title.primarySecond')}</span>
            </span>
            <span className={styles.titleAccent}>
              <span>{t('hero.title.accentFirst')}</span>{' '}
              <span>{t('hero.title.accentSecond')}</span>
            </span>
          </h1>

          <p className={styles.description}>{t('hero.description')}</p>

          <ul className={styles.categories} aria-label={t('hero.categories.ariaLabel')}>
            {gameCategories.map(category => (
              <li key={category}>{category}</li>
            ))}
          </ul>

          <ul className={styles.metrics} aria-label={t('hero.metrics.ariaLabel')}>
            {metrics.map(metric => (
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
                <strong>{t('hero.world.badgeTitle')}</strong>
                {t('hero.world.badgeHint')}
              </span>
            </div>
          </div>

          <p className={styles.visualCaption}>{t('hero.world.caption')}</p>
        </div>

        <div className={styles.actions}>
          <BtnElegant
            ariaLabel={t('hero.actions.expertLabel')}
            text={t('hero.actions.expert')}
            to={ROUTES.contact}
          />
          <a className={styles.secondaryAction} href="#game-world">
            {t('hero.actions.explore')}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default HeroCasinoAgregation;
