import HeroAbout from './components/hero-about/HeroAbout';
import HistoryAndes from './components/history-andes/HistoryAndes';
import Metrics from '../home/components/metrics/Metrics';
import MisionVisionValores from './components/mision-vision-valores/MisionVisionValores';


export function About() {
    return (
       <>
            <HeroAbout />
            <Metrics />
            
            <HistoryAndes />

            <MisionVisionValores />
       </>
    )
}

export default About;
