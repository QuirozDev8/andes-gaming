import HeroCasinoAgregation from './components/hero-casino-agregation/HeroCasinoAgregation';
import SectionBenefits from './components/benefits/Benefits';
import Integration from './components/integration/Integration';
import ProvidersCasinoAgregation from './components/providers-casino/ProvidersCasinoAgregation';
import SliderMarcas from '../../components/slider-marcas/SliderMarcas';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../routes/routePaths';

export function CasinoAggregation() {
  const { t } = useTranslation('casinoAggregation');

  return (
    <>
      <HeroCasinoAgregation />
      <SectionBenefits />
      <Integration />
      <ProvidersCasinoAgregation />
      <SliderMarcas
        titulo={t('trustedBrands.title')}
        ariaLabel={t('trustedBrands.ariaLabel')}
        ctaTexto={t('trustedBrands.cta')}
        ctaRuta={ROUTES.contact}
        duracionSegundos={30}
        pausarAlPasar
      />
    </>
  );
}

export default CasinoAggregation;
