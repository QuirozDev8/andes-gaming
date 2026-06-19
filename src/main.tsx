import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/globals.css";
// para los estilos de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// para los scripts de bootstrap y componentes interactivos como modales, dropdowns, etc.
// import 'bootstrap/dist/js/bootstrap.bundle.min.js' (No lo necesitamos de momento)


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
