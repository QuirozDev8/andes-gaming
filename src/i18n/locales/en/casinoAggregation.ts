const casinoAggregationEn = {
  trustedBrands: {
    title: "These brands already trust our technology",
    ariaLabel: "Brands that trust Andes Gaming technology",
    cta: "Let's talk about your project",
  },
  hero: {
    eyebrow: "Casino Aggregation",
    title: {
      primaryFirst: "One single",
      primarySecond: "connection",
      accentFirst: "A whole world",
      accentSecond: "of games.",
    },
    description:
      "Connect your operation with an ecosystem of engaging, flexible casino experiences ready to grow with your business.",
    categories: {
      ariaLabel: "Game categories",
      slots: "Slots",
      liveCasino: "Live casino",
      instantGames: "Crash & instant games",
    },
    metrics: {
      ariaLabel: "Casino Aggregation key figures",
      providers: {
        value: "+200",
        label: "Integrated providers",
      },
      games: {
        value: "+15,000",
        label: "Available games",
      },
    },
    actions: {
      expert: "Talk to an expert",
      expertLabel: "Talk to an Andes Gaming expert",
      explore: "Explore the universe",
    },
    world: {
      badgeTitle: "Explore without limits",
      badgeHint: "Drag to discover",
      caption: "Every image represents a new possibility for your catalog.",
      images: {
        sharkFeast: "Shark Feast game",
        grandExpress: "Grand Express game",
        olympus: "Olympus game",
        energyCoins: "Energy Coins game",
        blueWizard: "Blue Wizard game",
        gigaMatchEgypt: "Giga Match Egypt game",
        wildWildRiches: "Wild Wild Riches game",
      },
    },
  },
  integration: {
    eyebrow: "How integration works",
    title: {
      primary: "One connection.",
      accent: "Your entire casino ecosystem.",
    },
    description:
      "Connect your platform once and access providers, games, and operational tools through one unified integration layer.",
    diagramLabel:
      "Interactive diagram showing the connection between your platform, Andes Gaming API, and the casino ecosystem",
    navigationLabel: "Explore the integration flow",
    activeStatus: "Active",
    exploreStatus: "Explore",
    detailLabel: "Integration layer",
    nodes: {
      platform: {
        title: "Your platform",
        summary: "Your operation and player experience",
        description:
          "Your existing channels connect to Andes Gaming through a single, consistent integration point.",
        capabilities: {
          0: "Website and mobile app",
          1: "Player wallet",
          2: "Back office",
          3: "Your existing technology stack",
        },
      },
      andes: {
        title: "Andes Gaming API",
        summary: "One secure and scalable connection",
        description:
          "A unified technology layer centralizes content, sessions, operations, and control so your team can move faster.",
        capabilities: {
          0: "Unified game catalog",
          1: "Sessions and wallet",
          2: "Reporting and control",
          3: "Secure, scalable infrastructure",
        },
      },
      ecosystem: {
        title: "Casino ecosystem",
        summary: "Content ready to grow with you",
        description:
          "Expand your offering from one connection with a broad ecosystem of providers and experiences for every player profile.",
        capabilities: {
          0: "200+ integrated providers",
          1: "15,000+ available games",
          2: "Slots and live casino",
          3: "Crash and instant games",
        },
      },
    },
  },
} as const;

export default casinoAggregationEn;
