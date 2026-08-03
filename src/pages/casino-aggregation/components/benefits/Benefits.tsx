import {
  ChartNoAxesCombined,
  Gamepad2,
  Network,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Benefits.module.css';

type Benefit = {
  number: string;
  translationKey: 'faster' | 'relevant' | 'control' | 'scale';
  icon: LucideIcon;
};

const benefits: Benefit[] = [
  { number: '01', translationKey: 'faster', icon: Network },
  { number: '02', translationKey: 'relevant', icon: Gamepad2 },
  { number: '03', translationKey: 'control', icon: SlidersHorizontal },
  { number: '04', translationKey: 'scale', icon: ChartNoAxesCombined },
];

export default function Benefits() {
  const { t } = useTranslation('casinoAggregation');

  return (
    <section className={styles.benefits} aria-labelledby="benefits-title">
      <span className={styles.glowViolet} aria-hidden="true" />
      <span className={styles.glowCyan} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {t('benefits.eyebrow')}
            <span aria-hidden="true" />
          </p>

          <h2 className={styles.title} id="benefits-title">
            <span>{t('benefits.title.primary')}</span>
            <span className={styles.titleAccent}>{t('benefits.title.accent')}</span>
          </h2>

          <p className={styles.introduction}>{t('benefits.description')}</p>
        </header>

        <div
          className={styles.railViewport}
          role="region"
          aria-label={t('benefits.ariaLabel')}
          tabIndex={0}
        >
          <ol className={styles.rail}>
            {benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;
              const benefitKey = `benefits.items.${benefit.translationKey}`;

              return (
                <li className={styles.railItem} key={benefit.number}>
                  <span className={styles.connector} aria-hidden="true" />
                  <span className={styles.node} aria-hidden="true">
                    <span />
                  </span>

                  <article className={styles.card}>
                    <span className={styles.number} aria-hidden="true">
                      {benefit.number}
                    </span>

                    <span className={styles.icon} aria-hidden="true">
                      <BenefitIcon strokeWidth={1.7} />
                    </span>

                    <h3>{t(`${benefitKey}.title`)}</h3>
                    <p>{t(`${benefitKey}.description`)}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <p className={styles.swipeHint} aria-hidden="true">
          {t('benefits.swipeHint')} <span>→</span>
        </p>
      </div>
    </section>
  );
}
