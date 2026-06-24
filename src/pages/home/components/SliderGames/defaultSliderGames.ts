import type { SliderGameSlide } from './SliderGames';
import SharkFeastImg from '../../../../assets/img/img-shark-feast.webp';
import OlympusImg from '../../../../assets/img/img-olympus.webp';

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
    id: 'poker',
    title: 'POKER',
    description: 'Cash - MTT - Sit & Go - Multimesa',
    imageSrc: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DSFxZu8uDjHlOKZEo87WYHr2qH/hf_20260528_135900_a86c2b3a-15ce-4bf0-a5bd-bee342704125.png',
    imageAlt: 'Poker chips and cards 3D',
    accent: '#ff2bd6',
    particleType: 'cards',
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
    id: 'live-casino',
    title: 'LIVE CASINO',
    description: 'Dealers en espanol - 24/7 - Streaming HD',
    imageSrc: 'https://d8j0ntlcm91z4.cloudfront.net/user_3DSFxZu8uDjHlOKZEo87WYHr2qH/hf_20260528_135949_97fb0234-dd52-419f-a605-79ce904e8b86.png',
    imageAlt: 'Roulette wheel 3D',
    accent: '#a45bff',
    particleType: 'orbit',
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
