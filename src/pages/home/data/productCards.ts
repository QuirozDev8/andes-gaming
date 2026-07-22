import type { TFunction } from "i18next";
import {
  ChartNoAxesCombined,
  Gamepad2,
  Network,
  Settings2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import cardImgBo from "../../../assets/img/bg-card-bo.webp";
import cardCoheteImg from "../../../assets/img/bg-cohete.webp";
import cardBackground from "../../../assets/img/bg-mountain2.png";
import cardMundoImg from "../../../assets/img/bg-mundo.webp";
import cardPiezaImg from "../../../assets/img/bg-pieza.webp";
import type { CardSectionCardProps } from "../components";

export function getProductCards(
  t: TFunction<"home">,
): CardSectionCardProps[] {
  const card = (key: string) => `stack.cards.${key}`;

  return [
    {
      color: "#120F17",
      title: t(`${card("singleApi")}.title`),
      description: t(`${card("singleApi")}.description`),
      label: t(`${card("singleApi")}.label`),
      icon: Network,
      backgroundImage: cardBackground,
      detail: {
        intro: t(`${card("singleApi")}.intro`),
        points: [
          t(`${card("singleApi")}.point1`),
          t(`${card("singleApi")}.point2`),
          t(`${card("singleApi")}.point3`),
        ],
        outcome: t(`${card("singleApi")}.outcome`),
      },
    },
    {
      color: "#120F17",
      title: t(`${card("providers")}.title`),
      description: t(`${card("providers")}.description`),
      label: t(`${card("providers")}.label`),
      icon: UsersRound,
      backgroundImage: cardMundoImg,
      detail: {
        intro: t(`${card("providers")}.intro`),
        points: [
          t(`${card("providers")}.point1`),
          t(`${card("providers")}.point2`),
          t(`${card("providers")}.point3`),
        ],
        outcome: t(`${card("providers")}.outcome`),
      },
    },
    {
      color: "#120F17",
      title: t(`${card("scalable")}.title`),
      description: t(`${card("scalable")}.description`),
      label: t(`${card("scalable")}.label`),
      icon: ChartNoAxesCombined,
      backgroundImage: cardCoheteImg,
      detail: {
        intro: t(`${card("scalable")}.intro`),
        points: [
          t(`${card("scalable")}.point1`),
          t(`${card("scalable")}.point2`),
          t(`${card("scalable")}.point3`),
        ],
        outcome: t(`${card("scalable")}.outcome`),
      },
    },
    {
      color: "#120F17",
      title: t(`${card("backoffice")}.title`),
      description: t(`${card("backoffice")}.description`),
      label: t(`${card("backoffice")}.label`),
      icon: Settings2,
      backgroundImage: cardImgBo,
      detail: {
        intro: t(`${card("backoffice")}.intro`),
        points: [
          t(`${card("backoffice")}.point1`),
          t(`${card("backoffice")}.point2`),
          t(`${card("backoffice")}.point3`),
        ],
        outcome: t(`${card("backoffice")}.outcome`),
      },
    },
    {
      color: "#120F17",
      title: t(`${card("analytics")}.title`),
      description: t(`${card("analytics")}.description`),
      label: t(`${card("analytics")}.label`),
      icon: Gamepad2,
      backgroundImage: cardPiezaImg,
      detail: {
        intro: t(`${card("analytics")}.intro`),
        points: [
          t(`${card("analytics")}.point1`),
          t(`${card("analytics")}.point2`),
          t(`${card("analytics")}.point3`),
        ],
        outcome: t(`${card("analytics")}.outcome`),
      },
    },
    {
      color: "#120F17",
      title: t(`${card("security")}.title`),
      description: t(`${card("security")}.description`),
      label: t(`${card("security")}.label`),
      icon: ShieldCheck,
      backgroundImage: cardBackground,
      detail: {
        intro: t(`${card("security")}.intro`),
        points: [
          t(`${card("security")}.point1`),
          t(`${card("security")}.point2`),
          t(`${card("security")}.point3`),
        ],
        outcome: t(`${card("security")}.outcome`),
      },
    },
  ];
}
