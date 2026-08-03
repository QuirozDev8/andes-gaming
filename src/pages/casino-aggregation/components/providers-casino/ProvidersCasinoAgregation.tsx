import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { providerLogos } from '../../../home/data/providerLogos';
import { ROUTES } from '../../../../routes/routePaths';
import styles from './Providers.module.css';

const featuredProviders = providerLogos.slice(0, 30);

export default function ProvidersCasinoAgregation() {
  return (
    <section className={styles.providers} aria-labelledby="casino-providers-title">
      <div className={styles.container}>
        <div className={styles.panel}>
          <header className={styles.panelHeader}>
            <span className={styles.eyebrow}>Nuestras alianzas</span>
            <h2 id="casino-providers-title">Proveedores con los que colaboramos</h2>
            <p>
              Colaboramos con proveedores líderes de la industria para ofrecer un catálogo diverso,
              competitivo y listo para crecer.
            </p>
          </header>

          <div className={styles.providersPreview}>
            <ul className={styles.providersGrid} aria-label="Proveedores destacados">
              {featuredProviders.map((provider) => (
                <li className={styles.providerCard} key={provider.id ?? provider.src}>
                  <img src={provider.src} alt={provider.alt} loading="lazy" />
                </li>
              ))}
            </ul>

            <div className={styles.fade} aria-hidden="true" />

            <Link className={styles.cta} to={ROUTES.gameProviders}>
              Ver todos los proveedores
              <ArrowRight aria-hidden="true" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
