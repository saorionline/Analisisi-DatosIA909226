# Recorrido de estilos — `apps/web`

Guía de dónde tocar el código para llevar el front al estilo diagramado, en el orden en que conviene hacerlo.

- **Repo:** `C:\Users\saori_wsnhlys\Documents\SaoriGit\Analisisi-DatosIA909226`
- **Todo lo de esta guía vive bajo:** `apps/web/src/`
- **Comparador de pieles:** `Pieles del portafolio.html` (en esta misma carpeta)

## Mapa de archivos

```
apps/web/src/
├── app/
│   ├── layout.tsx        ← <html>, metadata, carga de fuentes
│   └── page.tsx          ← composición: qué sección va dónde
├── components/sections/
│   └── SectionBlock.tsx  ← el marcado HTML de cada sección
├── lib/
│   ├── api.ts            ← fetch a la API (no tocar para estilos)
│   └── theme.ts          ← ⚠ muerto, nadie lo importa
└── styles/
    └── globals.css       ← la única fuente de verdad del estilo
```

Dos servidores, no uno:

| Puerto | Qué es | Comando |
|---|---|---|
| `localhost:3001` | la API NestJS (solo JSON, bajo `/api`) | `pnpm dev:api` |
| `localhost:3000` | el HTML de React | `pnpm dev:web` |

La raíz `localhost:3001/` devuelve 404 **a propósito**: `main.ts` tiene `app.setGlobalPrefix("api")`. Las rutas reales son `/api/sections`, `/api/projects`, `/api/data-management/health`.

---

## Paso 0 — La trampa: `lib/theme.ts` no hace nada

```
apps/web/src/lib/theme.ts
```

Vino en el ZIP original y **nadie lo importa** (cero referencias en todo el proyecto). Al armar el front, esos valores pasaron a variables CSS. Si editas este archivo esperando ver cambios, no pasa nada y pierdes media hora buscando por qué.

**Acción:** bórralo, o déjalo como documentación muerta — pero no lo edites.

La única fuente de verdad del estilo es `styles/globals.css`.

---

## Paso 1 — Los tokens · `styles/globals.css`, líneas 1-13

```css
:root {
  --ledger-bg: #0a0e13;                  /* fondo de la página        */
  --doc-bg:    #12181f;                  /* fondo de cada tarjeta     */
  --ivory:     #f4f1e9;                  /* texto                     */
  --gold:      #b08d4f;                  /* acento: eyebrow, th, bullets */
  --gold-hover:#8c6e38;                  /* acento en hover           */
  --muted:     #93a0ad;                  /* subtítulos                */
  --line:      rgba(242, 239, 231, 0.2); /* bordes y filetes          */
  --serif: "Source Serif 4", Georgia, serif;
  --sans:  "IBM Plex Sans", system-ui, sans-serif;
  --mono:  "IBM Plex Mono", ui-monospace, monospace;
}
```

Aquí ocurre el **80% de un cambio de estilo**. Cambia estos valores y toda la página se mueve con ellos, sin tocar un solo componente.

Notas:

- Si el diagrama usa otros nombres (`--bg`, `--surface`, `--accent`…), renómbralos aquí **y** en sus usos, que son las líneas 17-80 del mismo archivo.
- Si el diagrama tiene más de un acento, agrégalo aquí (`--accent-2`) antes de usarlo abajo.
- Un token que solo existe dentro de un `@media` no aplica fuera de él. Declara todos en `:root` primero.

---

## Paso 2 — Las tipografías no están cargadas · `app/layout.tsx`

**Esto muerde.** Las líneas 10-12 del CSS *declaran* `"Source Serif 4"` e `"IBM Plex Sans"`, pero nadie las descarga y Windows no las trae instaladas. Ahora mismo la página se pinta en **Georgia y system-ui**. El fallback es silencioso: no hay error en consola.

Para que carguen de verdad, en `app/layout.tsx`:

```tsx
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

const serif = Source_Serif_4({ subsets: ["latin"], variable: "--serif" });
const sans  = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400","500","600"], variable: "--sans" });
const mono  = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Después **borra las líneas 10-12 de `globals.css`**, porque `next/font` define esas mismas variables y las dos declaraciones se pelean.

`next/font` auto-hospeda los archivos en el build: no hay request a Google en runtime.

---

## Paso 3 — El lienzo · `styles/globals.css`, línea 27

```css
main { max-width: 68rem; margin: 0 auto; padding: 4rem 1.5rem 6rem; }
```

Ancho de medida, centrado y aire vertical de toda la página.

Si el diagrama tiene retícula asimétrica o barra lateral, este `main` pasa a ser un `display: grid` con sus columnas declaradas aquí.

---

## Paso 4 — Los componentes · `styles/globals.css`, líneas 38-80

Cada bloque corresponde a una forma de contenido que permite el `SectionSchema`:

| Línea | Selector | Qué pinta |
|---|---|---|
| 38 | `.eyebrow` | el `01 · portada` de cada sección |
| 46 | `.section` | la tarjeta: fondo, borde, radio, padding |
| 54 | `.section > h2` | título de sección |
| 55 | `.section .subtitle` | subtítulo (solo lo tiene `portada`) |
| 56 | `.section .intro` | párrafo de entrada |
| 58-59 | `.bullets`, `.bullets strong` | la lista de `bullets` de `seccion.json` |
| 61-64 | `.table-wrap`, `table`, `th`, `td` | la tabla de `panel.json` |
| 66-77 | `figure`, `figcaption`, `pre` | el árbol de directorios de `arquitectura.json` |
| 79 | `.error` | el bloque de "no pude leer la API" |

Ejemplo — quitar las tarjetas y dejar solo filetes (línea 46):

```css
.section {
  background: transparent;
  border: 0;
  border-top: 1px solid var(--line);
  border-radius: 0;
  padding: 1.5rem 0 0;
}
```

Cuidado con las especificidades: `.section > h2` (línea 54) le gana a `h1, h2, h3` (línea 33). Si un cambio en la 33 "no hace nada", es porque la 54 lo está sobreescribiendo.

---

## Paso 5 — La estructura · `components/sections/SectionBlock.tsx`

Solo entras aquí si el diagrama necesita **HTML distinto**, no colores distintos. Este archivo es el contrato entre marcado y CSS: cada `className` de aquí es un selector del Paso 4.

| Línea | Qué hay |
|---|---|
| 5 | el `<section className="section">` que envuelve todo |
| 6-8 | el eyebrow: `{order}` + `{slug}` |
| 9-11 | `h2`, `subtitle`, `intro` |
| 13-21 | bloque condicional de `bullets` |
| 23-44 | bloque condicional de `table` |
| 46-53 | bloque condicional de `code` |

Ejemplo — separar el ordinal para ponerlo grande en su propia columna (líneas 6-8):

```tsx
<span className="num">
  <span className="n">{String(section.order).padStart(2, "0")}</span>
  <span className="nl">{section.slug}</span>
</span>
```

Los bloques condicionales usan `{section.table && (…)}`: si el JSON no trae esa clave, el bloque no se renderiza. Por eso una sección nueva en la API aparece sola, sin tocar React — **mientras use las formas que ya existen**. Una forma nueva (una galería de imágenes, por ejemplo) necesita tres cosas: el campo en `packages/contracts/src/section.schema.ts`, el bloque condicional aquí, y su CSS en el Paso 4.

---

## Paso 6 — La composición · `app/page.tsx`, líneas 12-16

```tsx
<main>
  {sections.map((section) => (
    <SectionBlock key={section.slug} section={section} />
  ))}
</main>
```

Ahora las cuatro secciones pasan por el mismo molde, incluida `portada` — que solo tiene `title` y `subtitle` y sale como una caja igual a las demás.

**Separar la portada como cabecera del documento** (lo que hace cualquier diseño real):

```tsx
const [portada, ...resto] = sections;

return (
  <main>
    <header className="hero">
      <p className="eyebrow">{portada.slug}</p>
      <h1>{portada.title}</h1>
      {portada.subtitle && <p className="sub">{portada.subtitle}</p>}
    </header>
    {resto.map((section) => (
      <SectionBlock key={section.slug} section={section} />
    ))}
  </main>
);
```

Este archivo es también el sitio para agrupar secciones, intercalar los proyectos de `/api/projects`, o meter un índice de navegación.

No quites el `export const dynamic = "force-dynamic"` de la línea 6: sin él, Next 14 cachea el `fetch`, intenta prerenderizar en build time (y `pnpm build` falla si la API está apagada) y editar un JSON no se refleja al recargar.

---

## Recarga y verificación

- Al guardar cualquiera de estos archivos, `next dev` recarga solo.
- El único que exige reiniciar el server es `next.config.mjs`.
- Si el front muestra "No pude leer la API": la tercera línea de ese bloque imprime el mensaje real de la excepción. Comprueba primero `localhost:3001/api/sections` en el navegador.
- Si `/api/sections` da 500, suele ser que `apps/api/dist` quedó con un build duplicado en `dist/src/`. Corta la API, `Remove-Item -Recurse -Force apps\api\dist` y vuelve a levantarla.
