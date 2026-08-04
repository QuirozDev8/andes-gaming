const gameProviderEn = {
  hero: {
    eyebrow: "ANDES GAMING PROVIDERS",
    title: {
      firstLine: "A game provider hub",
      secondLine: "built to scale",
    },
    description:
      "At Andes Gaming, we centralize integrations and connect multiple game, casino, live casino, and ecosystem service providers through a single infrastructure.",
  },
  catalog: {
    title: "All providers",
    searchLabel: "Search provider",
    searchPlaceholder: "Search provider",
    ariaLabel: "Game provider catalog",
    searchResults_one: "{{count}} result for “{{query}}”.",
    searchResults_other: "{{count}} results for “{{query}}”.",
    showing: "Showing {{visible}} of {{total}} providers.",
    emptyTitle: "No providers found",
    emptyDescription: "Try another name or search term.",
    loadMore: "View more",
    loadMoreLabel_one: "Show {{count}} more provider",
    loadMoreLabel_other: "Show {{count}} more providers",
  },
  partner: {
    title: "Ready to grow with Andes Gaming?",
    description:
      "Connect your operation to a network of premium providers and infrastructure built to scale with you.",
    cta: "Become a partner",
  },
} as const;

export default gameProviderEn;
