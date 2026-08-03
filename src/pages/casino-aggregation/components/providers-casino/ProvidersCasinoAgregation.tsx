import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../routes/routePaths';
import { providerLogos } from '../../../home/data/providerLogos';
import styles from './Providers.module.css';

const featuredProviders = providerLogos.slice(0, 30);

export default function ProvidersCasinoAgregation() {
  const { t } = useTranslation('casinoAggregation');

  return (
    <section className={styles.providers} aria-labelledby="casino-providers-title">
      <div className={styles.container}>
        <div className={styles.panel}>
          <header className={styles.panelHeader}>
            <span className={styles.eyebrow}>{t('providers.eyebrow')}</span>
            <h2 id="casino-providers-title">{t('providers.title')}</h2>
            <p>{t('providers.description')}</p>
          </header>

          <div className={styles.providersPreview}>
            <ul className={styles.providersGrid} aria-label={t('providers.ariaLabel')}>
              {featuredProviders.map((provider) => (
                <li className={styles.providerCard} key={provider.id ?? provider.src}>
                  <img src={provider.src} alt={provider.alt} loading="lazy" />
                </li>
              ))}
            </ul>

            <div className={styles.fade} aria-hidden="true" />

            <Link className={styles.cta} to={ROUTES.gameProviders}>
              {t('providers.cta')}
              <ArrowRight aria-hidden="true" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
