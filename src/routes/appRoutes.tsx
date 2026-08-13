// encargado de que componte se renderiza en cada ruta, se importa en App.tsx
import EnDesarrollo from "../components/en-desarrollo/EnDesarrollo";
import Home from "../pages/home/Home";
import { ContactPage } from "../pages/contact-page/ContactPage";
import { ROUTES } from "./routePaths";
import { CasinoAggregation } from "../pages/casino-aggregation/CasinoAggregation";
import { GameProvider } from "../pages/game-provider/GameProvider";
import {Blog} from "../pages/blog/Blog";
import { About } from "../pages/about-us/About";

const pendingPage = <EnDesarrollo />;

export const appRoutes = [
  { path: ROUTES.home, element: <Home /> },
  { path: ROUTES.casinoAggregation, element: <CasinoAggregation /> },
  { path: ROUTES.gameStudio, element: pendingPage },
  { path: "/game-studio", element: pendingPage },
  { path: ROUTES.gameProviders, element: <GameProvider /> },
  { path: ROUTES.about, element: <About /> },
  { path: ROUTES.blog, element: <Blog /> },
  { path: ROUTES.contact, element: <ContactPage /> },
] as const;
