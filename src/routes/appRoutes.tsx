// encargado de que componte se renderiza en cada ruta, se importa en App.tsx
import EnDesarrollo from "../components/en-desarrollo/EnDesarrollo";
import Home from "../pages/home/Home";
import { ContactPage } from "../pages/contact-page/ContactPage";
import { ROUTES } from "./routePaths";

const pendingPage = <EnDesarrollo />;

export const appRoutes = [
  { path: ROUTES.home, element: <Home /> },
  { path: ROUTES.casinoAggregation, element: pendingPage },
  { path: ROUTES.gameStudio, element: pendingPage },
  { path: "/game-studio", element: pendingPage },
  { path: ROUTES.gameProviders, element: pendingPage },
  { path: ROUTES.about, element: pendingPage },
  { path: ROUTES.blog, element: pendingPage },
  { path: ROUTES.contact, element: <ContactPage /> },
] as const;
