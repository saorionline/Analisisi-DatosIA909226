# Portfolio Monorepo

Monorepo con **pnpm workspaces**. Contiene dos aplicaciones y un paquete compartido:

| Carpeta | Qué es | Tecnología | Puerto |
|---|---|---|---|
| `apps/api` | Backend / API de contenido | NestJS 10 | `3001` |
| `apps/web` | Frontend del portafolio | Next.js 14 (App Router) | `3000` |
| `packages/contracts` | Esquemas Zod compartidos entre api y web | TypeScript + Zod | — |

---

## Requisitos previos

- **Node.js** 20 o superior
- **pnpm** 9 (`npm install -g pnpm`)

> ⚠️ Este proyecto usa **pnpm**, no npm ni yarn.
> Si corres `npm install` o `npm run ...` los comandos van a fallar,
> porque `node_modules` está construido con la estructura de pnpm.

---

## Instalación (solo la primera vez)

Desde la **raíz** del proyecto:

```bash
pnpm install
```

Esto instala las dependencias de `api`, `web` y `contracts` de una sola vez.

---

## 🚀 Cómo levantar el proyecto en local

Necesitas **dos terminales abiertas al mismo tiempo**, porque cada comando deja
un servidor corriendo y no te devuelve el prompt.

**El orden importa: primero la API, después la web.**
La web le pide los datos a la API, así que si la API no está arriba la página
carga vacía o con error.

### Terminal 1 — API

```bash
cd apps/api
pnpm start:build
```

Cuando veas `API escuchando en :3001`, ya está lista.
Déjala abierta. Comprueba en el navegador: <http://localhost:3001/api/sections>

### Terminal 2 — Web

```bash
cd apps/web
pnpm start:build
```

Cuando termine de compilar, abre: <http://localhost:3000>

---

## ¿Qué hace `pnpm start:build`?

Es un atajo que ejecuta **dos pasos seguidos**: compilar y luego arrancar.

En `apps/api`:

```
nest build  →  compila TypeScript a JavaScript en dist/
node dist/main.js  →  arranca el servidor ya compilado
```

En `apps/web`:

```
next build  →  genera el bundle de producción en .next/
next start  →  sirve ese bundle
```

Existe porque `start` por sí solo **no compila**: solo arranca lo que ya
está compilado. Si ejecutas `pnpm start` sin haber hecho `build` antes,
falla — la API no encuentra `dist/main.js` y Next dice
*"Could not find a production build"*. `start:build` evita ese error
haciendo siempre las dos cosas.

> 📌 El comando se escribe **`pnpm start:build`**, todo junto, sin espacios
> alrededor de los dos puntos.

---

## Todos los comandos disponibles

### Desde `apps/api`

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Modo desarrollo con recarga automática al guardar |
| `pnpm build` | Solo compila a `dist/` |
| `pnpm start` | Solo arranca lo ya compilado |
| `pnpm start:build` | Compila **y** arranca |

### Desde `apps/web`

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo con hot reload |
| `pnpm build` | Solo genera el bundle en `.next/` |
| `pnpm start` | Solo sirve el bundle ya generado |
| `pnpm start:build` | Compila **y** sirve |

### Desde la raíz

| Comando | Qué hace |
|---|---|
| `pnpm dev:api` | Equivale a `pnpm --filter api dev` |
| `pnpm dev:web` | Equivale a `pnpm --filter web dev` |
| `pnpm build` | Compila todos los paquetes del workspace |

También puedes lanzar cualquier script sin cambiar de carpeta usando `--filter`:

```bash
pnpm --filter api start:build
pnpm --filter web start:build
```

---

## ¿Desarrollo o producción?

- **`start:build`** → simula producción. Úsalo para revisar el resultado final
  o antes de desplegar. Cada cambio en el código exige volver a ejecutarlo.
- **`dev`** → para programar. Recompila solo al guardar. Es lo que vas a usar
  el 90% del tiempo:

  ```bash
  # Terminal 1
  pnpm dev:api
  # Terminal 2
  pnpm dev:web
  ```

---

## Variables de entorno

Ninguna es obligatoria en local; todas tienen valor por defecto.

| Variable | Dónde | Por defecto | Para qué |
|---|---|---|---|
| `PORT` | api | `3001` | Puerto del backend |
| `CONTENT_SOURCE` | api | `json` | Origen del contenido: `json` o `prisma` |
| `NEXT_PUBLIC_API_URL` | web | `http://localhost:3001/api` | A qué API apunta el frontend |

En producción (por ejemplo la web en Vercel y la API en otro dominio) hay que
definir `NEXT_PUBLIC_API_URL` con la URL pública real de la API.

---

## Estructura del proyecto

```
Analisisi-DatosIA909226/
├── apps/
│   ├── api/                 # NestJS
│   │   ├── src/
│   │   │   ├── main.ts              # arranque, CORS, prefijo /api
│   │   │   ├── app.module.ts
│   │   │   ├── config/              # configuración por variables de entorno
│   │   │   ├── common/              # filtros e interceptores globales
│   │   │   ├── content/             # secciones y proyectos
│   │   │   │   ├── data/            # contenido en JSON
│   │   │   │   └── repositories/    # json-* y prisma-* (intercambiables)
│   │   │   └── data_management/
│   │   └── dist/            # salida compilada (no se versiona)
│   └── web/                 # Next.js
│       ├── src/
│       │   ├── app/                 # App Router: layout.tsx y page.tsx
│       │   ├── components/sections/ # bloques visuales del portafolio
│       │   ├── lib/api.ts           # cliente HTTP hacia la API
│       │   └── styles/
│       └── .next/           # salida compilada (no se versiona)
├── packages/
│   └── contracts/           # esquemas Zod compartidos (@portfolio/contracts)
├── pnpm-workspace.yaml
└── package.json
```

---

## Problemas frecuentes

**`'nest' is not recognized` / `command not found`**
No instalaste dependencias. Corre `pnpm install` desde la raíz.

**`Could not find a production build` (web)**
Ejecutaste `pnpm start` sin compilar. Usa `pnpm start:build`.

**`Cannot find module '.../dist/main.js'` (api)**
Lo mismo del lado del backend. Usa `pnpm start:build`.

**La web carga pero sin contenido, o error de fetch**
La API no está corriendo. Revisa la Terminal 1 y abre
<http://localhost:3001/api/sections> para confirmar que responde.

**`EADDRINUSE: port 3000/3001 already in use`**
Ya hay un servidor ocupando ese puerto. Cierra la terminal anterior o cambia
el puerto: `PORT=3002 pnpm start:build`.

**Comandos de npm que fallan sin razón aparente**
Estás mezclando gestores de paquetes. Usa siempre `pnpm`.
