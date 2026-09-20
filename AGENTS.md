# AGENTS.md — Repository Guide & Project Context

Bienvenido a **miluna-blog**, el blog técnico personal de **Miguel Ángel Luna**. Este documento sirve como punto de partida y contexto operativo para agentes de IA que asisten en el desarrollo, mantenimiento y generación de contenidos del repositorio.

---

## 1. Finalidad del Proyecto

El objetivo de este proyecto es compartir artículos técnicos de alto nivel basados en experiencias reales de ingeniería de software, arquitecturas distribuidas, resiliencia, bases de datos y sistemas de alta escala (FinTech, Cloud, etc.).

Principios del proyecto:
* **Enfoque técnico honesto:** Sin clichés corporativos ni explicaciones superficiales; centrado en compromisos (*trade-offs*), decisiones de diseño e impacto medible.
* **Bilingüe por defecto:** Todos los artículos se publican tanto en **español** como en **inglés**, manteniendo el mismo nivel técnico y naturalidad idiomática.
* **Rendimiento y simplicidad:** Generación estática ultrarrápida sin dependencias pesadas en el cliente.

---

## 2. Stack Tecnológico y Arquitectura

* **Framework:** [Astro](https://astro.build/) (Content Collections v2 con validación Zod y soporte i18n nativo).
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) integrado mediante `@tailwindcss/vite`.
* **Despliegue y Hosting:** Cloudflare Pages vía [Wrangler](https://developers.cloudflare.com/workers/wrangler/).
* **Idiomas configurados:** `es` (Español) y `en` (Inglés, locale por defecto). Prefijo obligatorio en rutas (`/es/...`, `/en/...`).

### Estructura de Directorios

```text
/
├── .agents/
│   └── skills/                   # Skills específicas del workspace para agentes
│       └── blog-post-creation/   # Skill para redactar, estructurar y traducir posts
├── public/                       # Assets estáticos (imágenes globales, favicon, etc.)
├── src/
│   ├── components/               # Componentes UI reutilizables
│   ├── content/
│   │   └── blog/
│   │       ├── en/               # Artículos en inglés (<slug>.md)
│   │       └── es/               # Artículos en español (<slug>.md)
│   ├── content.config.ts         # Definición de schemas Zod para colecciones
│   ├── data/
│   │   └── translations.ts       # Textos y diccionarios de UI para i18n
│   ├── layouts/                  # Layouts base (BaseLayout, PostLayout, etc.)
│   ├── pages/                    # Rutas y páginas de Astro ([lang]/...)
│   └── styles/                   # Estilos globales y directivas CSS
├── astro.config.mjs              # Configuración de Astro, i18n y plugins
└── package.json                  # Scripts y dependencias del proyecto
```

---

## 3. Skills Disponibles para Agentes

El repositorio cuenta con skills modulares ubicadas en `.agents/skills/` que enseñan a los agentes flujos de trabajo específicos:

### 📝 [`blog-post-creation`](file:///.agents/skills/blog-post-creation/SKILL.md)
* **Ubicación:** [`.agents/skills/blog-post-creation/SKILL.md`](file:///.agents/skills/blog-post-creation/SKILL.md)
* **Cuándo utilizar:** Siempre que se solicite redactar un nuevo artículo, traducir un post existente entre español e inglés, o editar/revisar el contenido de un post en `src/content/blog/`.
* **Qué cubre:**
  * **Tono de voz y estilo:** Narrativa en primera persona de desarrollador a desarrollador, concisión, analogías claras y honestidad técnica sin rodeos ni clichés.
  * **Estructura estándar de artículo:** Flujo en 6 pasos (Frontmatter, Hook, El Problema Inicial, La Estrategia, El Momento de la Verdad, Resultados y Aprendizajes).
  * **Especificación técnica:** Formato de frontmatter, coherencia de tags y paridad exacta de `<slug>.md` entre `es/` y `en/`.
  * **Flujo bilingüe y validación:** Criterios de traducción no literal, terminología técnica y verificación de compilación estática.

---

## 4. Comandos Frecuentes

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:4321`. |
| `npm run build` | Compila el sitio estático en `./dist/` y valida rutas, tipos y schemas de contenido. |
| `npm run preview` | Previsualiza la build de producción localmente. |
| `npm run generate-types` | Genera las definiciones de tipos para Cloudflare Workers con Wrangler. |

---

## 5. Directrices Generales para Agentes

1. **Consulta el Skill antes de escribir posts:** Al trabajar en contenido de `src/content/blog/`, consulta siempre [`.agents/skills/blog-post-creation/SKILL.md`](file:///.agents/skills/blog-post-creation/SKILL.md).
2. **Paridad de Slugs e Idiomas:** Cada post en `src/content/blog/es/<slug>.md` debe tener su homólogo idéntico en nombre en `src/content/blog/en/<slug>.md`.
3. **Validación de Compilación:** Siempre ejecuta `npm run build` tras añadir o modificar páginas, componentes o posts para asegurar que la generación estática y el tipado pasan limpiamente.
