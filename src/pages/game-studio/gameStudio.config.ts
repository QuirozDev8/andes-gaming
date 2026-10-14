import { ROUTES } from "../../routes/routePaths";

// Vite exposes VITE_* values to the browser; this must be a public demo URL.
export const COMMANDO_DEMO_URL =
  import.meta.env.VITE_COMMANDO_DEMO_URL?.trim() || undefined;

export const COMMANDO_CONTACT_FORM_PATH = `${ROUTES.contact}#contact-page-form`;
