# Andes Gaming — B2B iGaming Aggregator & Game Studio

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-9912F3)](https://www.i18next.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![Bun](https://img.shields.io/badge/Package%20Manager-Bun-black?logo=bun&logoColor=white)](https://bun.sh/)

> **"Una sola API. Un universo de juegos."**  
> Plataforma web corporativa y comercial B2B para **Andes Gaming**, orientada a la integración tecnológica de ecosistemas de iGaming en Latinoamérica y mercados globales.

---

## 📋 Tabla de Contenidos

1. [Acerca del Proyecto](#-acerca-del-proyecto)
2. [Módulos y Rutas Principales](#-módulos-y-rutas-principales)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Requisitos Previos e Instalación](#-requisitos-previos-e-instalación)
6. [Variables de Entorno](#-variables-de-entorno)
7. [Scripts Disponibles](#-scripts-disponibles)
8. [Sistema de Diseño y Marca](#-sistema-de-diseño-y-marca)
9. [Internacionalización (i18n)](#-internacionalización-i18n)
10. [Integraciones Externas](#-integraciones-externas)
11. [Garantía de Calidad (QA) y Testing](#-garantía-de-calidad-qa-y-testing)

---

## 🚀 Acerca del Proyecto

**Andes Gaming** es un proveedor tecnológico B2B enfocado en simplificar la conexión entre operadores de casino y la oferta global de entretenimiento. A través de una infraestructura robusta, segura y de baja latencia, la plataforma ofrece:

* **Agregación de Casino (Single API):** Acceso centralizado a más de 50 proveedores líderes y miles de títulos (slots, live casino, crash games, virtuales y mesa) mediante una única integración.
* **Game Studio Propio:** Creación y distribución de títulos in-house exclusivos como **COMMANDO**, diseñados con mecánicas inmersivas y temáticas espaciales de alta fidelidad.
* **Infraestructura y Presencia en LatAm:** Arquitectura cloud optimizada para altos volúmenes de transacciones por segundo, garantizando disponibilidad 24/7 y cumplimiento regulatorio regional.

---

## 🗺️ Módulos y Rutas Principales

El proyecto utiliza una arquitectura de rutas centralizada gestionada en [`src/routes/routePaths.ts`](file:///c:/APPS-REACT/andes-gaming/src/routes/routePaths.ts):

| Ruta | Página / Componente | Descripción |
| :--- | :--- | :--- |
| `/` | `Home` | Landing principal: Hero interactivo con WebGL particles, métricas SLA, mapa LatAm, carrusel de marcas y flujo Single API. |
| `/productos/casino-aggregation` | `CasinoAggregation` | Showcase de la solución Single API, catálogo masivo de juegos, beneficios operativos y casos de éxito. |
| `/productos/game-studio` o `/game-studio` | `GameStudio` | Presentación del estudio in-house, demo interactiva embebida de **COMMANDO**, preview orbital de títulos clasificados y ventajas para operadores. |
| `/game-provider` | `GameProvider` | Catálogo filtrable de más de 50 proveedores de juego integrados y formulario de captación para nuevos aliados (*Become a Partner*). |
| `/nosotros` | `About` | Trayectoria de la empresa, Misión/Visión/Valores, certificaciones de cumplimiento y mapa de cobertura internacional. |
| `/blog` | `Blog` | Centro de contenidos editoriales, tendencias de la industria, normativas iGaming y novedades tecnológicas. |
| `/contacto` | `ContactPage` | Formulario empresarial de captura de leads con validación estricta y conexión directa al backend/workflow n8n. |

---

## 🛠️ Stack Tecnológico

### Núcleo y Arquitectura Frontend
* **[React 19](https://react.dev/):** Renderizado reactivo con las últimas optimizaciones y compatibilidad de hooks.
* **[TypeScript](https://www.typescriptlang.org/):** Tipado estricto en componentes, modelos de datos y servicios.
* **[Vite 8](https://vitejs.dev/):** Entorno de compilación ultra veloz y servidor de desarrollo HMR.
* **[React Router v7](https://reactrouter.com/):** Gestión de navegación SPA y restauración inteligente de scroll en layouts.

### Visuales, Animaciones y UI
* **[GSAP 3](https://gsap.com/) & `@gsap/react`:** Animaciones coordinadas para transiciones y microinteracciones de alta fidelidad.
* **[OGL](https://github.com/oframe/ogl):** Motor WebGL ligero para efectos de partículas en el Hero y textos interactivos.
* **[Lucide React](https://lucide.dev/):** Set de iconografía lineal moderna y consistente con los tokens de diseño.
* **CSS Modules & Global Tokens:** Estilos desacoplados y variables nativas CSS combinadas con el grid utilitario de Bootstrap 5.

### Internacionalización y Servicios
* **[i18next](https://www.i18next.com/) & `react-i18next`:** Arquitectura multilingüe (`es` / `en`) con persistencia en `localStorage` y detección automática de idioma.
* **[`@n8n/chat`](https://www.npmjs.com/package/@n8n/chat):** Widget de chat flotante impulsado por flujos conversacionales de n8n.

---

## 📁 Estructura del Proyecto

```text
andes-gaming/
├── .agents/                    # Configuraciones y skills de agentes (i18n-content-updater)
├── .qa/                        # Scripts y capturas automatizadas de regresión visual
├── public/                     # Favicon y assets estáticos públicos
├── src/
│   ├── app/                    # Raíz de la app (App.tsx con provider de rutas)
│   ├── assets/                 # Recursos multimedia oficiales
│   │   ├── img/                # Renders espaciales, planetas y portadas de juegos
│   │   └── logos/              # Isotipos de Andes Gaming y logos de +50 proveedores
│   ├── components/             # Componentes UI globales y transversales
│   │   ├── Button/             # Botones con gradientes de marca
│   │   ├── Particle-text/      # Efectos tipográficos WebGL
│   │   ├── chat-widget/        # Integración y personalización del bot n8n
│   │   ├── contact/            # Componentes reutilizables de formulario
│   │   ├── footer/             # Pie de página institucional
│   │   ├── header/             # Navegación responsive con selector de idioma
│   │   └── reveal-on-scroll/   # Wrapper con triggers de intersección
│   ├── hooks/                  # Custom hooks para lógica de UI y viewport
│   ├── i18n/                   # Configuración i18next y diccionarios es/en
│   │   ├── locales/es/         # Diccionarios en Español (8 namespaces)
│   │   └── locales/en/         # Diccionarios en Inglés (8 namespaces)
│   ├── layouts/                # MainLayout (Header, Footer, ScrollRestoration, Chat)
│   ├── pages/                  # Vistas principales de la aplicación
│   │   ├── about-us/           # Vista Nosotros
│   │   ├── blog/               # Vista Blog y artículos
│   │   ├── casino-aggregation/ # Vista Solución Agregador
│   │   ├── contact-page/       # Vista Formulario de Contacto
│   │   ├── game-provider/      # Vista Catálogo de Proveedores
│   │   ├── game-studio/        # Vista Estudio de Juegos y Demo Commando
│   │   └── home/               # Vista Portada
│   ├── routes/                 # appRoutes.tsx y routePaths.ts
│   ├── services/               # Clientes HTTP y envío de formularios (formSubmission.ts)
│   ├── styles/                 # variables.css (tokens de diseño) y globals.css
│   └── types/                  # Definiciones globales de TypeScript
├── .env.example                # Plantilla de variables de entorno requeridas
├── design-qa.md                # Registro de control de calidad visual y responsividad
└── package.json                # Dependencias y scripts del proyecto
```

---

## ⚙️ Requisitos Previos e Instalación

### Requisitos del Sistema
* [Node.js](https://nodejs.org/) v18+ o [Bun](https://bun.sh/) v1.0+ (recomendado).
* Gestor de paquetes: `bun` o `npm`.

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/QuirozDev8/andes-gaming.git
cd andes-gaming
```

### Paso 2: Configurar Variables de Entorno
Copia el archivo de plantilla a `.env.local`:
```bash
cp .env.example .env.local
```
Edita `.env.local` con los endpoints correspondientes (ver sección [Variables de Entorno](#-variables-de-entorno)).

### Paso 3: Instalar Dependencias
```bash
# Con Bun (Recomendado)
bun install

# O con npm
npm install
```

### Paso 4: Iniciar el Servidor de Desarrollo
```bash
bun run dev
# o
npm run dev
```
La aplicación estará disponible de inmediato en `http://localhost:5173`.

---

## 🔑 Variables de Entorno

Configura las siguientes variables en tu archivo `.env.local`:

| Variable | Tipo | Descripción | Obligatoria |
| :--- | :--- | :--- | :---: |
| `VITE_N8N_WEBHOOK_URL` | URL | Endpoint del webhook en n8n que recibe y procesa los envíos del formulario de contacto. | Sí |
| `VITE_N8N_CHAT_WEBHOOK_URL` | URL | Endpoint del webhook para conectar el widget de chat interactivo en vivo. | Opcional |
| `VITE_COMMANDO_DEMO_URL` | URL | URL pública del demo jugable del slot *COMMANDO* (incluyendo parámetros de proveedor). Si está vacía, la interfaz muestra el estado elegante *"Demo no disponible"*. | Opcional |

> [!NOTE]
> Las variables de entorno con prefijo `VITE_` se exponen en el cliente. Nunca almacenes credenciales secretas o API keys privadas aquí.

---

## 📜 Scripts Disponibles

| Comando | Acción |
| :--- | :--- |
| `bun run dev` | Inicia el servidor de desarrollo local con recarga en caliente (HMR). |
| `bun run build` | Valida tipos TypeScript (`tsc -b`) y compila los bundles minificados para producción en `/dist`. |
| `bun run lint` | Ejecuta ESLint sobre todo el árbol de código fuente para detectar inconsistencias. |
| `bun run preview` | Levanta un servidor local para previsualizar el build de producción generado. |

---

## 🎨 Sistema de Diseño y Marca

La interfaz está construida siguiendo estrictamente el **Manual de Marca Oficial de Andes Gaming** documentado en [`src/README_ANDES_GAMING_BRAND.md`](file:///c:/APPS-REACT/andes-gaming/src/README_ANDES_GAMING_BRAND.md).

### Regla Cromática 60-30-10
* **60% Dominante Violeta:**
  * `--andes-violet`: `#9912F3`
  * `--andes-violet-alt`: `#940DF0`
* **30% Estructura y Fondo Oscuro:**
  * `--andes-blue-deep`: `#00002E`
  * `--andes-blue-midnight`: `#1A1A2E`
* **10% Acento de Innovación:**
  * `--andes-cyan`: `#07F2F2` (usado estratégicamente para highlights, líneas de conexión y hover effects).

### Tipografía
* **Headings de alto impacto (H1, claims):** `Exo 2` (`Bold`, `ExtraBold Italic`, `Black Italic`).
* **Cuerpo de texto y navegación:** `Montserrat` (`Regular`, `SemiBold`, `Bold`).

### Tokens de Interfaz
Todas las propiedades de color, radios, sombras y gradientes oficiales se encuentran centralizadas en [`src/styles/variables.css`](file:///c:/APPS-REACT/andes-gaming/src/styles/variables.css).

---

## 🌐 Internacionalización (i18n)

El proyecto ofrece soporte bilingüe completo:
* **Español (`es`)** — Idioma por defecto.
* **Inglés (`en`)**.

La arquitectura está segmentada por namespaces dentro de `src/i18n/locales/`:
* `common`: Textos compartidos de navegación, footer, botones globales y estados.
* `home`: Secciones de la página de inicio.
* `casinoAggregation`: Contenido de la plataforma de agregación.
* `gameStudio`: Información del estudio y el juego COMMANDO.
* `gameProvider`: Catálogo y filtros de proveedores.
* `aboutPage`: Información institucional y certificaciones.
* `blog`: Artículos, categorías y metadatos editoriales.
* `contactPage`: Campos y mensajes del formulario de contacto.

> [!TIP]
> Al agregar o modificar textos en la aplicación, asegúrate de mantener **simetría exacta de claves** tanto en `src/i18n/locales/es/<modulo>.ts` como en `src/i18n/locales/en/<modulo>.ts`.

---

## 🔌 Integraciones Externas

### 1. Formulario de Contacto B2B
El servicio [`src/services/formSubmission.ts`](file:///c:/APPS-REACT/andes-gaming/src/services/formSubmission.ts) implementa:
* Timeout automático de 10 segundos con `AbortController`.
* Contexto automático (URL, ruta del sitio, idioma del usuario y marca de tiempo ISO).
* Clasificación tipada de errores (`configuration`, `http`, `network`, `timeout`).

### 2. Demo Interactivo del Juego Commando
En [`src/pages/game-studio/`](file:///c:/APPS-REACT/andes-gaming/src/pages/game-studio/):
* Iframe de origen aislado (`VITE_COMMANDO_DEMO_URL`) cargado solo tras pulsar *"Iniciar demo"*.
* Soporte nativo de pantalla completa delegada y compatibilidad responsive portrait/landscape.
* Desmontaje seguro y reseteo de foco al hacer clic en *"Salir de la demo"*.

### 3. Asistente Conversacional (@n8n/chat)
Widget embebido en [`src/components/chat-widget/ChatWidget.tsx`](file:///c:/APPS-REACT/andes-gaming/src/components/chat-widget/ChatWidget.tsx) con personalización de tema oscuro, logotipo oficial de Andes Gaming y conexión vía webhook.

---

## 🧪 Garantía de Calidad (QA) y Testing

El repositorio cuenta con especificaciones de control de calidad visual y responsive:
* **Verificación de Viewports:** Pruebas visuales en 5 anchos clave de pantalla: `360px`, `390px`, `768px`, `1024px` y `1440px`.
* **Script de Captura Automatizada:** Localizado en [`.qa/capture-original-games.mjs`](file:///c:/APPS-REACT/andes-gaming/.qa/capture-original-games.mjs) para auditar renders gráficos y prevenir desbordes horizontales.
* **Documento de Auditoría:** Consultar [`design-qa.md`](file:///c:/APPS-REACT/andes-gaming/design-qa.md) para revisar el historial de validaciones visuales.

---

## 👥 Contribución y Despliegue

1. Crea una rama para tu feature o ajuste: `git checkout -b feature/nueva-seccion`.
2. Valida tipos y linting antes de hacer commit:
   ```bash
   bun run lint
   bun run build
   ```
3. Realiza commits descriptivos siguiendo la convención del proyecto.
4. Para despliegues en producción (Vercel, Netlify, Cloudflare Pages o AWS), configura las variables de entorno en el panel del hosting y utiliza el comando de compilación:
   ```bash
   bun run build
   ```
   El output generado estará listo en la carpeta `dist/`.

---

© 2026 **Andes Gaming**. Todos los derechos reservados.
