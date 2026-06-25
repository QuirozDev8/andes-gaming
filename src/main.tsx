import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
// para los estilos de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/globals.css";
// para los scripts de bootstrap y componentes interactivos como modales, dropdowns, etc.
// import 'bootstrap/dist/js/bootstrap.bundle.min.js' (No lo necesitamos de momento)


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
