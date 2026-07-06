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
    detail: {
      intro:
        "Centraliza la conexion de productos, proveedores y servicios clave en una sola capa tecnica para acelerar tu salida a mercado.",
      points: [
        "Integra casino, sportsbook, pagos y servicios desde una unica API.",
        "Reduce tiempos de implementacion y evita integraciones aisladas por proveedor.",
        "Prepara la base para sumar nuevos mercados, marcas y verticales con menos friccion.",
        
      ],
      outcome:
        "Una arquitectura mas simple para operar, escalar y evolucionar el ecosistema iGaming.",
    },
  },
  {
    color: "#120F17",
    title: "Proveedores",
    description:
      "Conecta estudios, agregadores y operadores con flujos centralizados.",
    label: "Ecosistema",
    icon: UsersRound,
    backgroundImage: cardMundoImg,
    detail: {
      intro:
        "Conecta estudios, agregadores y operadores dentro de un ecosistema administrado para ampliar tu oferta sin dispersar la operacion.",
      points: [
        "Gestiona conexiones con estudios y agregadores desde flujos centralizados.",
        "Acelera el onboarding de nuevos proveedores y contenidos.",
        "Controla catalogo, disponibilidad y visibilidad de juegos por operacion.",
      ],
      outcome:
        "Mayor alcance comercial con una operacion de proveedores mas ordenada y controlable.",
    },
  },
  {
    color: "#120F17",
    title: "Operacion escalable",
    description:
      "Arquitectura preparada para crecer por marca, mercado y volumen operativo.",
    label: "Escalabilidad",
    icon: ChartNoAxesCombined,
    backgroundImage: cardCoheteImg,
    detail: {
      intro:
        "Disenamos una base modular para crecer por marca, mercado y volumen sin comprometer estabilidad operacional.",
      points: [
        "Escala por marcas, jurisdicciones y necesidades comerciales.",
        "Organiza componentes modulares para crecer sin rehacer la plataforma.",
        "Mantiene estabilidad ante picos de demanda y mayor volumen operativo.",
      ],
      outcome:
        "Una operacion preparada para crecer con control tecnico y continuidad del negocio.",
    },
  },
  {
    color: "#120F17",
    title: "Backoffice",
    description:
      "Gestiona configuraciones, contenido y visibilidad operacional desde un panel.",
    label: "Control",
    icon: Settings2,
    detail: {
      intro:
        "Administra configuraciones, contenido y visibilidad operacional desde un panel pensado para equipos B2B.",
      points: [
        "Centraliza configuraciones clave sin depender de procesos manuales dispersos.",
        "Ajusta contenido, proveedores y reglas de visibilidad con mayor trazabilidad.",
        "Entrega a los equipos operativos una herramienta clara para gestionar el dia a dia.",
      ],
      outcome:
        "Mas autonomia operacional y menos friccion entre equipos tecnicos y comerciales.",
    },
  },
  {
    color: "#120F17",
    title: "Analitica",
    description:
      "Monitorea actividad, rendimiento e integraciones con datos accionables.",
    label: "Insights",
    icon: Gamepad2,
    backgroundImage: cardPiezaImg,
    detail: {
      intro:
        "Convierte actividad, rendimiento e integraciones en informacion util para tomar mejores decisiones operativas.",
      points: [
        "Monitorea actividad de productos, proveedores e integraciones conectadas.",
        "Identifica rendimiento, tendencias y puntos de atencion con datos accionables.",
        "Facilita seguimiento operativo para priorizar mejoras y detectar oportunidades.",
      ],
      outcome:
        "Visibilidad clara para operar con datos y reaccionar con mayor velocidad.",
    },
  },
  {
    color: "#120F17",
    title: "Seguridad",
    description:
      "Procesos robustos para operar integraciones B2B con mayor estabilidad.",
    label: "Proteccion",
    icon: ShieldCheck,
    backgroundImage: cardBackground,
    detail: {
      intro:
        "Fortalece la operacion B2B con controles, procesos y practicas orientadas a estabilidad y confianza.",
      points: [
        "Aplica controles para integraciones y flujos criticos del ecosistema.",
        "Reduce riesgos operativos con procesos mas robustos y trazables.",
        "Prepara la plataforma para operar en entornos exigentes con mayor continuidad.",
      ],
      outcome:
        "Una base mas confiable para proteger integraciones, datos y continuidad operativa.",
    },
  },
];
