import HeroAbout from './components/hero-about/HeroAbout';
import HistoryAndes from './components/history-andes/HistoryAndes';
import Metrics from '../home/components/metrics/Metrics';

export function About() {
    return (
       <>
            <HeroAbout />
            <Metrics />
            <HistoryAndes />
       </>
    )
}

export default About;
