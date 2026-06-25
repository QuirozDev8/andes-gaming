import type { SliderGameSlide } from './SliderGames';
import SharkFeastImg from '../../../../assets/img/img-shark-feast.webp';
import OlympusImg from '../../../../assets/img/img-olympus.webp';
import EnergyCoinsImg from '../../../../assets/img/img-energy-coins.webp';
import BlueWizardImg from '../../../../assets/img/img-blue-wizard.webp';
import GrandExpressImg from '../../../../assets/img/img-grand-express.webp';

export const defaultSliderGames: SliderGameSlide[] = [
  {
    id: 'shark-feast',
    title: 'SHARK FEAST',
    description: 'Play\'n GO - Uno de los juegos mas demandados por su tematica acuatica',
    imageSrc: SharkFeastImg,
    imageAlt: 'Shark Feast slot game',
    accent: '#3bf0ff',
    particleType: 'bubbles',
  },
  {
    id: 'grand-express',
    title: 'GRAND EXPRESS',
    description: 'RubyPlay - First Class, Express Respins y premios instantaneos',
    imageSrc: GrandExpressImg,
    imageAlt: 'Grand Express slot game',
    accent: '#ff2bd6',
    glowColor: '#ff64e8',
    particleType: 'expressTiles',
  },
  {
    id: 'crash',
    title: 'OLYMPUS',
    description: 'Pragmatic - Fortune of Olympus Crash',
    imageSrc: OlympusImg,
    imageAlt: 'Olympus slot game',
    accent: '#ffd24a',
    particleType: 'sparks',
  },
  {
    id: 'energy-coins',
    title: 'ENERGY COINS',
    description: 'Playson - Hold and Win con monedas energeticas y multiplicadores',
    imageSrc: EnergyCoinsImg,
    imageAlt: 'Energy Coins slot game',
    accent: '#ffd24a',
    glowColor: '#39ffbf',
    particleType: 'energyCoins',
  },
  {
    id: 'blue-wizard',
    title: 'BLUE WIZARD',
    description: 'PlayTech - Bosque encantado con hechizos, calderos y giros gratis',
    imageSrc: BlueWizardImg,
    imageAlt: 'Blue Wizard slot game',
    accent: '#5ee7ff',
    glowColor: '#8a7cff',
    particleType: 'wizardMagic',
  },
  {
    id: 'instant',
    title: 'INSTANT',
    description: 'Dice - Mines - Plinko - Hi-Lo - Goal',
    imageSrc: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DSFxZu8uDjHlOKZEo87WYHr2qH/hf_20260528_140046_6471b3dc-9da9-43e3-ba47-008e3a09d5d5.png',
    imageAlt: 'Dice cluster 3D',
    accent: '#34d399',
    particleType: 'dice',
  },
];
