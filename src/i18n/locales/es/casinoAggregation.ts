const casinoAggregationEs = {
  trustedBrands: {
    title: "Estas marcas ya confían en nuestra tecnología",
    ariaLabel: "Marcas que confían en la tecnología de Andes Gaming",
    cta: "Hablemos de tu proyecto",
  },
  hero: {
    eyebrow: "Casino Aggregation",
    title: {
      primaryFirst: "Una sola",
      primarySecond: "conexión",
      accentFirst: "Todo un mundo",
      accentSecond: "de juegos.",
    },
    description:
      "Conecta tu operación con un ecosistema de experiencias de casino atractivas, flexibles y listas para crecer con tu negocio.",
    categories: {
      ariaLabel: "Categorías de juegos",
      slots: "Slots",
      liveCasino: "Casino en vivo",
      instantGames: "Crash e instantáneos",
    },
    metrics: {
      ariaLabel: "Cifras de Casino Aggregation",
      providers: {
        value: "+200",
        label: "Proveedores integrados",
      },
      games: {
        value: "+15.000",
        label: "Juegos disponibles",
      },
    },
    actions: {
      expert: "Hablar con un experto",
      expertLabel: "Hablar con un experto de Andes Gaming",
      explore: "Explorar el universo",
    },
    world: {
      badgeTitle: "Explora sin límites",
      badgeHint: "Arrastra para descubrir",
      caption: "Cada imagen representa una nueva posibilidad para tu catálogo.",
      images: {
        sharkFeast: "Juego Shark Feast",
        grandExpress: "Juego Grand Express",
        olympus: "Juego Olympus",
        energyCoins: "Juego Energy Coins",
        blueWizard: "Juego Blue Wizard",
        gigaMatchEgypt: "Juego Giga Match Egypt",
        wildWildRiches: "Juego Wild Wild Riches",
      },
    },
  },
  integration: {
    eyebrow: "Cómo funciona la integración",
    title: {
      primary: "Una conexión.",
      accent: "Todo tu ecosistema de casino.",
    },
    description:
      "Conecta tu plataforma una sola vez y accede a proveedores, juegos y herramientas operativas desde una capa de integración unificada.",
    diagramLabel:
      "Diagrama interactivo de la conexión entre tu plataforma, la API de Andes Gaming y el ecosistema de casino",
    navigationLabel: "Explora el flujo de integración",
    activeStatus: "Activo",
    exploreStatus: "Explorar",
    detailLabel: "Capa de integración",
    nodes: {
      platform: {
        title: "Tu plataforma",
        summary: "Tu operación y experiencia de jugador",
        description:
          "Tus canales actuales se conectan con Andes Gaming mediante un único punto de integración consistente.",
        capabilities: {
          0: "Sitio web y aplicación móvil",
          1: "Wallet del jugador",
          2: "Back office",
          3: "Tu stack tecnológico actual",
        },
      },
      andes: {
        title: "API de Andes Gaming",
        summary: "Una conexión segura y escalable",
        description:
          "Una capa tecnológica unificada centraliza contenido, sesiones, operación y control para que tu equipo avance más rápido.",
        capabilities: {
          0: "Catálogo de juegos unificado",
          1: "Sesiones y wallet",
          2: "Reportes y control",
          3: "Infraestructura segura y escalable",
        },
      },
      ecosystem: {
        title: "Ecosistema de casino",
        summary: "Contenido listo para crecer contigo",
        description:
          "Amplía tu oferta desde una sola conexión con un extenso ecosistema de proveedores y experiencias para cada perfil de jugador.",
        capabilities: {
          0: "Más de 200 proveedores integrados",
          1: "Más de 15.000 juegos disponibles",
          2: "Slots y casino en vivo",
          3: "Juegos crash e instantáneos",
        },
      },
    },
  },
} as const;

export default casinoAggregationEs;
