// centraliza la gestion de las rutas definiendola en constante

export const ROUTES = {
  home: "/",
  casinoAggregation: "/productos/casino-aggregation",
  gameStudio: "/productos/game-studio",
  gameProviders: "/game-provider",
  about: "/nosotros",
  blog: "/blog",
  contact: "/contacto",
} as const;

export const PRODUCT_ROUTES = [
  ROUTES.casinoAggregation,
  ROUTES.gameStudio,
  ROUTES.gameProviders,
] as const;
