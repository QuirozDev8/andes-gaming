// encargado de que componte se renderiza en cada ruta, se importa en App.tsx

import About from "../pages/about-us/About";
import Blog from "../pages/blog/Blog";
import CasinoAggregation from "../pages/casino-aggregation/CasinoAggregation";
import Contact from "../pages/contact-page/ContactPage";
import GameProvider from "../pages/game-provider/GameProvider";
import GameStudio from "../pages/game-studio/GameStudio";
import Home from "../pages/home/Home";
import { ROUTES } from "./routePaths";


export const appRoutes = [
  { path: ROUTES.home, element: <Home /> },
  { path: ROUTES.casinoAggregation, element: <CasinoAggregation /> },
  { path: ROUTES.gameStudio, element: <GameStudio /> },
  { path: "/game-studio", element: <GameStudio /> },
  { path: ROUTES.gameProviders, element: <GameProvider /> },
  { path: ROUTES.about, element: <About /> },
  { path: ROUTES.blog, element: <Blog /> },
  { path: ROUTES.contact, element: <Contact /> },
] as const;
