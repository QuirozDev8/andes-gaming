# README — Contexto de Marca para Desarrollo Web Andes Gaming

> Documento de contexto para asistentes de código, diseñadores UI y desarrolladores frontend.  
> Fuente base: **Manual de Marca Andes Gaming** proporcionado por el equipo.

---
 
## 1. Objetivo del diseño

La página web de **Andes Gaming** debe transmitir una marca tecnológica, sólida, moderna y orientada a integración B2B para iGaming.

La identidad visual debe comunicar:

- Infraestructura robusta.
- Simplicidad técnica e intuitiva.
- Agilidad operativa.
- Conexión entre proveedores, operadores y ecosistemas de juego.
- Evolución digital, escalabilidad y eficiencia.

Evitar diseños recargados, genéricos de casino o excesivamente “gambling”.  
El look debe sentirse más cercano a **plataforma tecnológica / API / agregador B2B** que a casa de apuestas tradicional.

---

## 2. Personalidad de marca

Andes Gaming se define como una entidad:

- Vanguardista.
- Profundamente tecnológica.
- Moderna.
- Ágil.
- Robusta.
- Confiable.
- Preparada para el ritmo del mercado iGaming.

El diseño debe convertir la complejidad técnica en una experiencia visual simple, clara y premium.

**Tono visual recomendado:** tecnológico, limpio, oscuro, futurista, dinámico y profesional.

---

## 3. Paleta de color

### 3.1 Colores principales

Usar estos colores como base del sistema visual:

| Nombre | HEX | Uso recomendado |
|---|---:|---|
| Violeta Eléctrico | `#9912F3` | Color dominante de marca, títulos destacados, acentos principales |
| Violeta Profundo Alterno | `#940DF0` | Variación del violeta para gradientes y fondos de apoyo |
| Cian Eléctrico | `#07F2F2` | Puntos de innovación, brillos, líneas de conexión, hover, highlights |
| Azul Profundo | `#00002E` | Fondos oscuros, estructura, sombras internas, profundidad |
| Azul de Medianoche | `#1A1A2E` | Fondos de secciones, header, paneles, cards oscuras |
| Gris Técnico | `#E0E0E0` | Líneas divisorias, texto secundario, bordes suaves, elementos técnicos |
| Negro Texto Claro | `#121212` | Texto sobre fondos claros |
| Blanco Puro | `#FFFFFF` | Texto principal sobre fondos oscuros |

### 3.2 Proporción de uso

Aplicar la jerarquía cromática del manual:

- **60% profundidad violeta:** `#9912F3` y `#940DF0`.
- **30% contraste y estructura:** `#00002E` y `#1A1A2E`.
- **10% innovación:** `#07F2F2`.

El cian no debe invadir toda la interfaz. Debe usarse como acento estratégico para dirigir la mirada.

### 3.3 Gradientes

El gradiente oficial debe ir siempre de violeta a cian:

```css
background: linear-gradient(45deg, #9912F3 0%, #07F2F2 100%);
```

Uso recomendado:

- Botones primarios.
- Barras de progreso.
- Líneas de conexión.
- Detalles de cards.
- Elementos hero.
- Estados activos.
- Indicadores tecnológicos.

Evitar gradientes multicolor no definidos por la marca.

---

## 4. Tipografía

### 4.1 Fuente principal — Exo 2

Uso:

- H1.
- Títulos de alto impacto.
- Claims principales.
- Destacados de marca.

Estilos recomendados:

- `ExtraBold Italic`.
- `Black Italic`.
- `Bold Italic`.

Ejemplo de importación sugerida:

```html
<link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@1,700;1,800;1,900&family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### 4.2 Fuente secundaria — Montserrat

Uso:

- Navegación.
- Cuerpo de texto.
- Cards.
- Formularios.
- Footer.
- Documentación técnica.
- Textos legales.

Pesos recomendados:

- `Bold` para subtítulos.
- `Regular` para bloques de texto.
- `Light` para notas, footer o textos secundarios.

### 4.3 Jerarquía tipográfica sugerida

```css
h1 {
  font-family: "Exo 2", sans-serif;
  font-weight: 800;
  font-style: italic;
}

h2, h3 {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}

body, p, a, button, input {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}
```

---

## 5. Uso del logo

### 5.1 Versiones de marca

El manual define tres usos principales:

#### A. Logotipo vertical — versión primaria

Composición:

- Isotipo centrado arriba.
- Texto `ANDES GAMING` abajo.
- Alineación al eje central vertical.

Uso recomendado:

- Portadas.
- Piezas institucionales.
- Secciones cuadradas o verticales.
- Presentaciones.
- Papelería oficial.

#### B. Logotipo horizontal — versión secundaria

Composición:

- Isotipo alineado a la izquierda.
- Logotipo a la derecha.
- Alineación central horizontal.

Uso recomendado en web:

- Header.
- Navbar.
- Footer.
- Firmas de correo.
- Banners horizontales.
- Cintillos publicitarios.

Para la web, esta debe ser la versión principal en navegación.

#### C. Isotipo solo

El isotipo es la “A” en cinta.

Uso recomendado:

- Favicon.
- Avatar de redes sociales.
- Icono de app.
- Elementos de interfaz.
- Espacios reducidos.
- Marcas de agua o fondos sutiles.

### 5.2 Archivos esperados

El proyecto debería tener los siguientes assets:

```txt
/public/brand/andes-logo-horizontal.svg
/public/brand/andes-logo-vertical.svg
/public/brand/andes-isotipo.svg
/public/brand/favicon.svg
```

Si no están disponibles, no redibujar el logo manualmente en CSS.  
Usar placeholders temporales solo para maquetación y dejar marcado `TODO: reemplazar por logo oficial`.

### 5.3 Tamaños mínimos

Respetar estos mínimos:

| Versión | Digital | Impreso |
|---|---:|---:|
| Logotipo vertical | 80 px de alto | 25 mm de alto |
| Logotipo horizontal | 120 px de ancho | 35 mm de ancho |
| Isotipo solo | 16 × 16 px | 5 mm de ancho |

### 5.4 Área de seguridad

La unidad `X` corresponde a la altura de la letra `A` del texto `ANDES`.

Regla:

- Mantener mínimo `X` de espacio libre por todos los lados.
- Ningún texto, icono, botón, borde o imagen debe invadir esa zona.
- En header, evitar pegar el logo al borde de la pantalla.

Ejemplo práctico para web:

```css
.logo {
  min-width: 120px;
  padding: 16px;
}
```

### 5.5 Variaciones cromáticas

- Logo a color: preferente sobre fondos oscuros controlados.
- Versión positiva negra: para fondos blancos o muy claros.
- Versión negativa blanca: para fondos oscuros, saturados o con fotografía compleja.
- Isotipo con gradiente: recomendado para favicon y elementos de marca.

---

## 6. Usos prohibidos del logo

No hacer:

- No deformar.
- No rotar.
- No cambiar colores.
- No aplicar sombras externas, biseles, resplandores ni texturas no oficiales.
- No sustituir la tipografía del logo.
- No poner elementos dentro del área de seguridad.
- No usar el logo sobre fondos con bajo contraste.
- No recrear el logo con texto editable.
- No usar el isotipo como patrón excesivamente repetido que compita con el contenido.

---

## 7. Estilo visual

### 7.1 Iconografía

La iconografía debe ser:

- Minimalista.
- Moderna.
- Lineal / outline.
- De grosor constante.
- Con esquinas ligeramente redondeadas.
- Con detalles puntuales en cian `#07F2F2`.

Recomendación:

```css
.icon {
  stroke: #E0E0E0;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-accent {
  stroke: #07F2F2;
}
```

### 7.2 Sombras y profundidad

El manual recomienda evitar sombras difusas o genéricas.

Usar profundidad tipo bloque, capas internas y contrastes oscuros:

```css
.card {
  background: rgba(26, 26, 46, 0.78);
  border: 1px solid rgba(224, 224, 224, 0.10);
  box-shadow: inset 0 0 0 1px rgba(7, 242, 242, 0.05);
}
```

### 7.3 Texturas y patrones

Se permite usar:

- Líneas de conexión.
- Trazos tipo red/API.
- Ondas o líneas de flujo.
- Fondos oscuros con textura sutil.
- Isotipo ampliado en baja opacidad como recurso de fondo.

No usar patrones que parezcan tragamonedas, fichas, cartas o ruletas salvo que el contenido lo requiera expresamente.

---

## 8. Dirección web recomendada

### 8.1 Header

Recomendado:

- Fondo `#1A1A2E` o transparente sobre hero oscuro.
- Logo horizontal a la izquierda.
- Navegación en Montserrat Regular.
- Texto blanco.
- CTA secundario tipo outline con borde cian/violeta.

Ejemplo de navegación:

```txt
Proveedores · Tecnología / Single API · Casos de éxito · Soporte · Solicitar demo
```

### 8.2 Hero

Debe ser la sección de mayor impacto.

Recomendado:

- Fondo oscuro `#00002E` o `#1A1A2E`.
- Patrón sutil de líneas de conexión en cian.
- Isotipo grande o forma abstracta inspirada en la “A”.
- Título en Exo 2 Bold/ExtraBold Italic.
- Palabras clave con gradiente o violeta.
- CTA principal con gradiente violeta → cian.

Claims permitidos como referencia del manual:

```txt
Una sola API. Un universo de juegos.
Una sola conexión. Infinitas posibilidades.
```

No son obligatorios; pueden adaptarse según estrategia comercial.

### 8.3 Secciones sugeridas para landing

Estructura recomendada:

1. Header.
2. Hero con propuesta de valor.
3. Métricas o cifras clave.
4. Red de proveedores.
5. Tecnología / Single API.
6. Beneficios para operadores.
7. Seguridad, soporte y escalabilidad.
8. Casos de uso o casos de éxito.
9. CTA final para solicitar demo.
10. Footer.

### 8.4 Cards tecnológicas

Diseño recomendado:

- Fondo oscuro translúcido.
- Borde sutil gris/cian.
- Icono outline.
- Punto de luz cian.
- Título en Montserrat Bold.
- Texto en Montserrat Regular gris claro.

Ejemplo:

```css
.feature-card {
  background: rgba(26, 26, 46, 0.82);
  border: 1px solid rgba(224, 224, 224, 0.12);
  border-radius: 18px;
  padding: 24px;
}

.feature-card:hover {
  border-color: rgba(7, 242, 242, 0.55);
  transform: translateY(-4px);
}
```

---

## 9. Design tokens sugeridos

### 9.1 CSS variables

```css
:root {
  --andes-violet: #9912F3;
  --andes-violet-alt: #940DF0;
  --andes-cyan: #07F2F2;
  --andes-blue-deep: #00002E;
  --andes-blue-midnight: #1A1A2E;
  --andes-gray-tech: #E0E0E0;
  --andes-white: #FFFFFF;
  --andes-text-dark: #121212;

  --andes-gradient-primary: linear-gradient(45deg, #9912F3 0%, #07F2F2 100%);
  --andes-gradient-soft: linear-gradient(135deg, rgba(153,18,243,0.35) 0%, rgba(7,242,242,0.20) 100%);

  --font-heading: "Exo 2", sans-serif;
  --font-body: "Montserrat", sans-serif;

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  --container-max: 1200px;
}
```

### 9.2 Tailwind sugerido

```js
theme: {
  extend: {
    colors: {
      andes: {
        violet: "#9912F3",
        violetAlt: "#940DF0",
        cyan: "#07F2F2",
        deep: "#00002E",
        midnight: "#1A1A2E",
        gray: "#E0E0E0",
        white: "#FFFFFF",
        textDark: "#121212",
      },
    },
    fontFamily: {
      heading: ['"Exo 2"', "sans-serif"],
      body: ['"Montserrat"', "sans-serif"],
    },
    borderRadius: {
      andes: "18px",
    },
  },
}
```

---

## 10. Componentes base sugeridos

### 10.1 Botón primario

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  border: 0;
  background: var(--andes-gradient-primary);
  color: var(--andes-white);
  font-family: var(--font-body);
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
}
```

### 10.2 Botón secundario

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  border: 1px solid rgba(7, 242, 242, 0.65);
  background: transparent;
  color: var(--andes-white);
  font-family: var(--font-body);
  font-weight: 600;
}
```

### 10.3 Fondo hero

```css
.hero {
  min-height: 90vh;
  background:
    radial-gradient(circle at 75% 30%, rgba(153, 18, 243, 0.30), transparent 34%),
    radial-gradient(circle at 20% 80%, rgba(7, 242, 242, 0.14), transparent 28%),
    linear-gradient(180deg, #00002E 0%, #1A1A2E 100%);
  color: #FFFFFF;
}
```

### 10.4 Título hero

```css
.hero-title {
  font-family: var(--font-heading);
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #FFFFFF;
}
```

---

## 11. Accesibilidad y legibilidad

Reglas mínimas:

- Texto blanco sobre fondos `#00002E` o `#1A1A2E`.
- Texto oscuro `#121212` sobre fondos claros.
- No usar cian para párrafos largos.
- No usar violeta oscuro sobre fondo oscuro sin contraste suficiente.
- Mantener tamaños cómodos:
  - Body mínimo: 16px.
  - Navegación: 14–16px.
  - H1 desktop: 56–80px según layout.
  - H1 mobile: 36–44px.
- Evitar textos extensos en Exo 2 Italic; reservarlo para impacto.

---

## 12. Responsive

### Desktop

- Header horizontal.
- Logo horizontal.
- Hero en dos columnas: copy + visual/isotipo/ilustración.
- Cards en grid de 3 o 4 columnas.
- CTA visible above the fold.

### Tablet

- Reducir densidad visual.
- Cards en 2 columnas.
- Mantener espacio de seguridad del logo.

### Mobile

- Header compacto.
- Logo horizontal si conserva mínimo de 120px de ancho; si no, usar isotipo.
- Menú hamburguesa.
- Hero en una columna.
- Cards en una columna.
- CTA principal visible sin saturar.

---

## 13. Favicon y redes sociales

### Favicon

- Usar exclusivamente isotipo.
- Formato recomendado: SVG.
- Tamaños mínimos: 16x16 y 32x32.
- Preferible fondo transparente.
- El isotipo debe aprovechar el lienzo sin perder legibilidad.

### Avatar redes sociales

- Usar isotipo centrado.
- Fondo `#121212` o `#1A1A2E`.
- Isotipo ocupando aproximadamente 75% del espacio.
- Respetar margen para formatos circulares.

---

## 14. Qué debe evitar el asistente de código

No generar:

- Paletas nuevas fuera del manual.
- Fondos blancos dominantes sin justificación.
- Estilo visual de casino B2C genérico.
- Botones rojos, verdes, amarillos o dorados como colores principales.
- Iconos rellenos pesados si no son necesarios.
- Tipografías diferentes a Exo 2 y Montserrat.
- Sombras glow exageradas tipo neón barato.
- Logos reconstruidos con texto.
- Uso excesivo de cian.
- Layouts saturados de imágenes de ruletas, cartas, fichas o dinero.

---

## 15. Checklist de validación visual

Antes de entregar una pantalla, validar:

- [ ] ¿Usa `#9912F3`, `#07F2F2`, `#00002E` y `#1A1A2E` correctamente?
- [ ] ¿El cian se usa como acento, no como color dominante?
- [ ] ¿El H1 usa Exo 2 en estilo bold/italic?
- [ ] ¿El cuerpo usa Montserrat?
- [ ] ¿El header usa logo horizontal?
- [ ] ¿El favicon usa solo isotipo?
- [ ] ¿El diseño comunica tecnología B2B, API e integración?
- [ ] ¿Se respeta el área de seguridad del logo?
- [ ] ¿Las cards e iconos tienen estilo técnico y minimalista?
- [ ] ¿Los CTAs usan gradiente violeta → cian?
- [ ] ¿La interfaz evita clichés visuales de casino?
- [ ] ¿La legibilidad es correcta sobre fondos oscuros?

---

## 16. Prompt corto para asistentes de código

Usa este contexto para generar interfaces web alineadas a Andes Gaming: marca tecnológica B2B de iGaming, moderna, robusta, ágil y orientada a integración/API. Diseña con fondo oscuro `#00002E` / `#1A1A2E`, color dominante violeta `#9912F3` / `#940DF0`, acento cian `#07F2F2` solo en puntos estratégicos, y gris técnico `#E0E0E0` para soporte. Usa gradientes 45° de violeta a cian en CTAs, barras y destacados. Tipografía: Exo 2 ExtraBold/Black Italic para H1 y titulares; Montserrat para navegación, cuerpo, formularios y cards. Header con logo horizontal a la izquierda; favicon e iconos pequeños con isotipo. Iconografía outline, minimalista, de esquinas redondeadas y detalles cian. Crear una landing con estética tecnológica, red/API, líneas de conexión, cards oscuras, profundidad por capas y CTAs claros. Evitar estilos genéricos de casino, colores no oficiales, logos redibujados, sombras neón exageradas y saturación visual.

---

## 17. Nota operativa

Este README no reemplaza los archivos oficiales de marca.  
El desarrollo debe usar los logos oficiales entregados por diseño o marketing.  
Si faltan assets, se deben solicitar antes de producción.
