# Commando demo

Set `VITE_COMMANDO_DEMO_URL` in `.env.local` for development and in the build
environment for deployment. Use the complete demo URL supplied by the provider,
including its query parameters. Restart Vite or rebuild after changing it.
Vite exposes this variable to visitors: use only a public demo URL, never a
private credential. The URL is read exclusively by `gameStudio.config.ts`.

An empty variable displays the localized “Demo no disponible” state and creates
no iframe. With a configured URL, the iframe is only created after “Iniciar demo”.
The parent requests no autoplay permission and does not play audio itself.
“Salir de la demo” unmounts the iframe, clears its loading state, restores focus
to the start control, and exits container fullscreen when active. Starting again
creates a fresh iframe. Closing does not read or manipulate the cross-origin game.

The desktop game viewport is capped at 30rem and adapts to the available viewport
height. Fullscreen uses the available screen, while mobile keeps a taller portrait
viewport. The spatial background is aligned to the top at full width on desktop
to preserve the satellite in its upper-right corner.

The game is a separate origin. No sandbox is imposed without a provider contract;
only fullscreen is delegated. The parent does not read the game's document or
rebuild its controls. `onLoad` ends the navigation indicator only; it cannot
confirm game readiness, authentication, WebGL rendering, or backend availability.

## Integration verification

On 2026-10-14 the supplied demo URL returned HTTP 200 without
`X-Frame-Options` or `Content-Security-Policy` response headers. No embedding
restriction was observed in that response. This is not proof that the entire game
is operational in an iframe, and provider policies may change.

The deployment's own CSP must permit the demo origin in `frame-src`. Any provider
`frame-ancestors` policy must permit the deployed Andes Gaming origin. Do not
work around a rejected origin or other provider restriction.

Live browser verification remains required in the deployment environment:

- At 360, 390, 768, 1024 and 1440 px, start the demo and verify the actual game
  controls remain usable. Mobile uses a portrait viewport without scaling the iframe.
- Enter and leave fullscreen, and verify the inline game remains usable if the
  browser declines fullscreen. The control is omitted when the API is unsupported.
- Follow “Quiero Commando” to `/contacto#contact-page-form` and verify keyboard
  focus and the form are visible below the sticky header, including direct loads.
- Check the unavailable state with `VITE_COMMANDO_DEMO_URL` empty and rebuild.

The current automation session had no connected browser; actual rendering,
gameplay, fullscreen and responsive visual behavior could not be certified.
