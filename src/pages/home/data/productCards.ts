import { ChartNoAxesCombined, Gamepad2,Network,Settings2,ShieldCheck, UsersRound,} from "lucide-react";
import cardBackground from "../../../assets/img/bg-mountain2.png";
import cardMundoImg from "../../../assets/img/bg-mundo.webp";
import cardPiezaImg from "../../../assets/img/bg-pieza.webp";
import cardCoheteImg from "../../../assets/img/bg-cohete.webp";
import type { CardSectionCardProps } from "../components";



export const productCards: CardSectionCardProps[] = [
  {
    color: "#120F17",
    title: "Single API",
    description:
      "Integra casino, sportsbook, pagos y servicios desde una sola capa.",
    label: "Core Layer",
    icon: Network,
    backgroundImage: cardBackground,
  },
  {
    color: "#120F17",
    title: "Proveedores",
    description:
      "Conecta estudios, agregadores y operadores con flujos centralizados.",
    label: "Ecosistema",
    icon: UsersRound,
    backgroundImage: cardMundoImg,
  },
  {
    color: "#120F17",
    title: "Operacion escalable",
    description:
      "Arquitectura preparada para crecer por marca, mercado y volumen operativo.",
    label: "Escalabilidad",
    icon: ChartNoAxesCombined,
    backgroundImage: cardCoheteImg,
  },
  {
    color: "#120F17",
    title: "Backoffice",
    description:
      "Gestiona configuraciones, contenido y visibilidad operacional desde un panel.",
    label: "Control",
    icon: Settings2,
  },
  {
    color: "#120F17",
    title: "Analitica",
    description:
      "Monitorea actividad, rendimiento e integraciones con datos accionables.",
    label: "Insights",
    icon: Gamepad2,
    backgroundImage: cardPiezaImg,
  },
  {
    color: "#120F17",
    title: "Seguridad",
    description:
      "Procesos robustos para operar integraciones B2B con mayor estabilidad.",
    label: "Proteccion",
    icon: ShieldCheck,
    backgroundImage: cardBackground,
  },
];
