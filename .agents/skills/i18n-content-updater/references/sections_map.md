# Mapa de Secciones, Rutas y Namespaces i18n — Andes Gaming

Este documento es la referencia para identificar rápidamente a qué ruta, componente React y clave de internacionalización (`namespace` y `key path`) corresponde cualquier texto visible en la web de Andes Gaming.

---

## 1. Mapeo General de Rutas y Namespaces

| Ruta (URL) | Página Principal | Namespace i18n | Archivos de Traducción |
| :--- | :--- | :--- | :--- |
| **Componentes Globales** | `Header.tsx`, `Footer.tsx`, `ChatWidget.tsx` | `common` | `src/i18n/locales/{es,en}/common.ts` |
| `/` | `src/pages/home/Home.tsx` | `home` | `src/i18n/locales/{es,en}/home.ts` |
| `/nosotros` | `src/pages/about-us/About.tsx` | `aboutPage` | `src/i18n/locales/{es,en}/aboutPage.ts` |
| `/productos/casino-aggregation` | `src/pages/casino-aggregation/CasinoAggregation.tsx` | `casinoAggregation` | `src/i18n/locales/{es,en}/casinoAggregation.ts` |
| `/game-provider` | `src/pages/game-provider/GameProvider.tsx` | `gameProvider` | `src/i18n/locales/{es,en}/gameProvider.ts` |
| `/contacto` | `src/pages/contact-page/ContactPage.tsx` | `contactPage` + `common` | `src/i18n/locales/{es,en}/contactPage.ts`, `common.ts` |
| `/blog` | `src/pages/blog/Blog.tsx` | `blog` | `src/i18n/locales/{es,en}/blog.ts` |
| `/productos/game-studio` | `src/pages/game-studio/GameStudio.tsx` | `home` (`ownGames`) | `src/i18n/locales/{es,en}/home.ts` (subsección hero/ownGames) |

---

## 2. Detalle de Secciones y Claves por Namespace

### A. Global / Transversal (`common`)
*Archivos*: `src/i18n/locales/es/common.ts` y `src/i18n/locales/en/common.ts`

- **Header (`header.*`)**:
  - Navegación: `header.home`, `header.products`, `header.about`, `header.blog`, `header.contact`.
  - Botón CTA: `header.sales` ("Hablar con ventas" / "Talk to sales").
  - Menú desplegable Productos: `header.productsList.casinoAggregation`, `header.productsList.gameStudio`, `header.productsList.gameProviders` (`label`, `description`).
  - Accesibilidad e idioma: `header.languageSelector`, `header.openMenu`, `header.closeMenu`.
- **Footer (`footer.*`)**:
  - `footer.description`: Descripción corporativa B2B.
  - Columnas: `footer.columns.platform`, `footer.columns.products`, `footer.columns.company` (títulos y enlaces).
  - Contacto y copyright: `footer.contact.*`, `footer.terms`, `footer.privacy`, `footer.copyright`.
- **Chat Widget Andi-AI (`chatWidget.*`)**:
  - `chatWidget.title`, `chatWidget.initialGreeting`, `chatWidget.initialInvitation`, `chatWidget.inputPlaceholder`, botones y modales de reinicio.
- **Notificaciones de Formularios (`formSubmission.*`)**:
  - `formSubmission.sending`, `formSubmission.successTitle`, `formSubmission.success`, `formSubmission.errorTitle`, etc.

---

### B. Inicio / Home (`home`) — Ruta `/`
*Archivos*: `src/i18n/locales/es/home.ts` y `src/i18n/locales/en/home.ts`

1. **Hero Principal (`hero.*`)**:
   - `eyebrow`: "Plataforma iGaming B2B"
   - `titleFirst`: "Una sola API."
   - `titleSecond`: "Un universo de juegos."
   - `description`: Texto descriptivo principal.
   - `primaryCta`: "Conviértete en socio"
   - `secondaryCta`: "Explorar tecnología"
2. **Métricas (`metrics.*`)**:
   - `operators`: "Operadores conectados"
   - `games`: "Juegos integrados"
   - `markets`: "Mercados en LATAM"
   - `uptime`: "Disponibilidad de la plataforma"
3. **¿Qué es Andes Gaming? / About (`about.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`, `cta`.
   - Beneficios en tarjetas: `about.benefits.singleApi`, `about.benefits.providers`, `about.benefits.scalable`, `about.benefits.management` (`title`, `description`).
4. **Presencia en LATAM (`presence.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`.
   - Tarjetas destacadas: `presence.highlights.regional`, `presence.highlights.speed`, `presence.highlights.compliance`, `presence.highlights.support`.
5. **Juegos Propios (`ownGames.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`, `cta`.
   - Pilares: `ownGames.highlights.proprietary`, `ownGames.highlights.experience`, `ownGames.highlights.multiplatform`.
6. **Infraestructura Tecnológica (`infra.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`.
   - Pilares técnicos: `infra.pillars.architecture`, `infra.pillars.latency`, `infra.pillars.security`, `infra.pillars.monitoring`.
7. **Tarjetas de Productos (`products.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`.
   - Productos: `products.items.aggregation`, `products.items.studio`, `products.items.providers` (`badge`, `title`, `description`, `cta`).
8. **Flujo de Integración (`integrationFlow.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`.
   - Pasos 1 a 4: `integrationFlow.steps.step1`, `step2`, `step3`, `step4` (`stepNumber`, `title`, `description`).
9. **Slider de Juegos (`gamesSlider.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`, acciones de interacción.
10. **Formulario de Contacto en Home (`contact.*`)**:
    - `eyebrow`, `titleFirst`, `titleSecond`, `description`, `form.*`.

---

### C. Nosotros / About Us (`aboutPage`) — Ruta `/nosotros`
*Archivos*: `src/i18n/locales/es/aboutPage.ts` y `src/i18n/locales/en/aboutPage.ts`

1. **Hero (`hero.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`, valores destacados en pills.
2. **Historia / Línea de Tiempo (`history.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`.
   - Hitos: `history.milestones.*` (`year`, `title`, `description`).
3. **Misión, Visión y Valores (`misionVisionValores.*`)**:
   - `mision`: `title`, `description`.
   - `vision`: `title`, `description`.
   - `valores`: `title`, lista de tarjetas de valores (`innovation`, `reliability`, `partnership`, etc.).
4. **Presencia / Mapa Regional (`map.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`, hubs y sedes.
5. **Contacto en Página Nosotros (`contact.*`)**:
   - Textos específicos para la sección de cierre de la página de nosotros.

---

### D. Casino Aggregation (`casinoAggregation`) — Ruta `/productos/casino-aggregation`
*Archivos*: `src/i18n/locales/es/casinoAggregation.ts` y `src/i18n/locales/en/casinoAggregation.ts`

1. **Marcas de Confianza (`trustedBrands.*`)**:
   - `title`: "Estas marcas ya confían en nuestra tecnología"
   - `cta`: "Hablemos de tu proyecto"
2. **Hero (`hero.*`)**:
   - `eyebrow`, `title.primaryFirst`, `primarySecond`, `accentFirst`, `accentSecond`.
   - `description`, categorías (`hero.categories.slots`, `liveCasino`, `instantGames`).
   - Métricas destacadas: `hero.metrics.providers`, `hero.metrics.games`.
   - Botones: `hero.actions.expert`, `hero.actions.explore`.
3. **Beneficios Clave (`benefits.*`)**:
   - `eyebrow`, `title.primary`, `accent`, `description`.
   - Tarjetas de beneficio: `benefits.cards.*`.
4. **Integración / Arquitectura Técnica (`integration.*`)**:
   - `eyebrow`, `title`, `description`, pasos y especificaciones técnicas de la API.
5. **Proveedores y Catálogo (`providers.*`)**:
   - Títulos, cifras y descripción de los proveedores integrados.
6. **Casos de Éxito (`casosExitos.*`)**:
   - Historias de operadores, testimonios, porcentajes de crecimiento y resultados.
7. **Contacto (`contact.*`)**:
   - Copy de cierre para Casino Aggregation.

---

### E. Game Providers (`gameProvider`) — Ruta `/game-provider`
*Archivos*: `src/i18n/locales/es/gameProvider.ts` y `src/i18n/locales/en/gameProvider.ts`

1. **Hero (`hero.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`, `primaryCta`.
2. **Catálogo de Proveedores (`allProviders.*`)**:
   - `eyebrow`, `title`, `description`, placeholders de búsqueda y filtros.
3. **Conviértete en Proveedor Aliado (`becomePartner.*`)**:
   - `eyebrow`, `title`, `description`, pasos de onboarding, beneficios del partnership y CTA.

---

### F. Contacto (`contactPage`) — Ruta `/contacto`
*Archivos*: `src/i18n/locales/es/contactPage.ts` y `src/i18n/locales/en/contactPage.ts`

1. **Hero e Información (`hero.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`.
2. **Campos del Formulario (`form.*`)**:
   - Etiquetas y placeholders: `name`, `role`, `company`, `country`, `phone`, `email`, `message`, `operationType`, `services`, `submitButton`, `disclaimer`.

---

### G. Blog (`blog`) — Ruta `/blog`
*Archivos*: `src/i18n/locales/es/blog.ts` y `src/i18n/locales/en/blog.ts`

1. **Hero (`hero.*`)**:
   - `eyebrow`, `titleFirst`, `titleSecond`, `description`.
2. **Destacado (`featured.*`)**:
   - Badge, título y CTA de lectura del artículo insignia.
3. **Catálogo y Filtros (`catalog.*`)**:
   - Categorías (`todos`, `articulos`, `guias`, `actualizaciones`, `casos-de-exito`).
   - Controles de carrusel, contador de resultados y botón "Cargar más".
4. **Modal de Lectura de Artículos (`modal.*`)**:
   - Textos de navegación, etiquetas de autor, tiempo de lectura, tags, artículos relacionados y CTA de contacto.
5. **Artículos Individuales (`posts.*`)**:
   - Estructurados por slug: `checklist-integracion-api`, `agregacion-crecimiento-operadores`, `catalogo-juegos-latam`, etc. Cada uno con `title`, `excerpt`, `sections` (título, párrafos, viñetas).

---

## 3. Estrategia de Búsqueda Rápida de Claves

Cuando recibas un texto (o un texto extraído de una imagen):
1. **Ejecuta `grep_search`**:
   Busca palabras clave exactas o singulares dentro de `src/i18n/locales/es/` (o `en/` si el texto venía en inglés).
   ```bash
   Query: "palabra clave"
   SearchPath: "c:\APPS-REACT\andes-gaming\src\i18n\locales\es"
   ```
2. **Si no aparece en los locales**:
   Busca en `src/pages/` o `src/components/` para detectar si el texto está quemado (hardcoded). Si está quemado, se debe extraer al namespace correspondiente y reemplazar en el componente con `t(...)`.
