# OriginalGamesPreview design QA

- Source visual truth: latest user-provided conversation image for this task (`1480 × 1066`; no local filesystem path exposed).
- Written specification: `C:\Users\Alejandro Quiroz\.codex\attachments\67b31529-dba8-4693-bd09-cf928035e8cf\pasted-text.txt`.
- Previous implementation screenshots: `.qa/original-games-360-section.png`, `.qa/original-games-390-section.png`, `.qa/original-games-768-section.png`, `.qa/original-games-1024-section.png`, `.qa/original-games-1440-section.png`.
- Previous browser measurements and interaction evidence: `.qa/original-games-browser-report.json`. These files predate the latest desktop recomposition and are not treated as current visual evidence.
- Density normalization: source and implementation reviewed at device scale factor `1`; screenshots use the exact CSS viewport widths shown in their filenames and capture the full section height.
- State: Spanish locale, default resting state, Commando available, two classified games, CTA visible.

## Latest desktop recomposition

- The desktop content block and scene were raised to reproduce the tighter vertical composition of the reference.
- The Commando wordmark was enlarged while both classified planets were reduced to restore the intended hierarchy.
- The desktop route now uses one broad continuous curve instead of a sharp rise next to the purple planet.
- Purple and cyan orbital rings were added behind the planets to match the reference's sequential path language.
- Rules under `899.98px` remain unchanged, preserving the previously verified tablet/mobile document flow.

## Focused region comparison evidence

- Typography: Exo 2 Black Italic provides the condensed, angled display treatment; Montserrat is retained for body copy and labels. Gradient, hierarchy, line height and uppercase treatment match the reference direction.
- Spacing and layout rhythm: the desktop scene remains open rather than card-based; the mobile/tablet layouts use document flow and consistent vertical gaps with no fixed section height.
- Colors and visual tokens: Andes violet/cyan variables and the existing CTA component are reused; the orbit glow is moderate and remains behind the content.
- Orbital sequence: the route and planet rings now form a continuous visual system from Commando through both reserved games.
- Image quality and asset fidelity: the supplied background, transparent helicopter, two transparent planets and official distressed Commando wordmark are used independently at intrinsic proportions. No screenshot composite or placeholder art is used.
- Copy: the supplied Spanish title, description, states and CTA are exact. ES/EN locale keys are symmetric.
- Accessibility: semantic `section`, `h2`, game headings, decorative empty alts/SVG semantics, Lucide lock icons and existing visible CTA focus treatment are present.

## Interaction and console checks

- The CTA was activated in the browser at `390px`; navigation finished at `/contacto#contact-page-form` and `#contact-page-form` was present.
- No application exceptions or console errors were observed. The browser emitted the repository's existing Vue feature-flag warning on each load; it is unrelated to this React section.

## Findings and validation status

- `npx vite build` passes and `git diff --check` passes.
- Current automated visual recapture is pending: Chrome/Edge headless could not reach the local Vite server from the isolated browser process (`ERR_CONNECTION_REFUSED`).
- The existing screenshot/report artifacts must not be used to approve the latest desktop geometry.

## Comparison history

- Initial CLI screenshots were blank because Vite watched a temporary Chrome profile inside the repository and stopped on a locked cookie file. The QA harness was corrected by moving browser profiles to the system temp directory and capturing the measured section through Chrome DevTools Protocol. This was a test-harness issue, not a product-code finding.
- A fresh browser comparison is still required before marking the latest visual iteration as fully passed.

## Implementation checklist

- [x] Open orbital composition without rectangular cards.
- [x] Commando has stronger hierarchy than both reserved games.
- [x] Exactly two `CLASSIFIED` announcements.
- [x] Transparent assets preserve aspect ratios and rotor bounds.
- [x] Orbit stays behind content and labels.
- [x] Mobile reading order and simplified vertical orbit.
- [x] CTA reaches the centralized Contact form destination.
- [x] No horizontal overflow at 360, 390, 768, 1024 or 1440 px.

final result: technical checks passed; latest visual recapture pending
