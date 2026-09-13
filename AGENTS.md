# Blog Post Writing Guide for AI Agents

Este documento define las directrices de estilo, tono, estructura y flujo de trabajo para redactar y revisar artículos del blog (`src/content/blog/`).

El objetivo es publicar contenido técnico de alto nivel con un lenguaje **cercano, conciso, honesto y fácil de entender**, evitando tanto el tono académico distante como el lenguaje corporativo o de marketing.

---

## 1. Tono de Voz y Estilo

### 🎙️ Cercano (De desarrollador a desarrollador)
* **Narrativa en primera persona:** Basado en experiencia real (ej. *"Cuando trabajaba en Klarna..."*, *"Nos tocó resolver..."*).
* **Conversacional y empático:** Habla como si le estuvieras explicando el problema a un compañero de equipo mientras os tomáis un café.
* **Analogías cotidianas:** Explica conceptos distribuidos o de infraestructura compleja con metáforas visuales sencillas (ej. *"cambiar el motor de un coche mientras va a 120 km/h por la autopista"*).

### ✂️ Conciso y directo al grano
* **Sin frases de relleno (fluff):** Prohibido arrancar con clichés genéricos como:
  * ❌ *"En el acelerado mundo de la tecnología actual..."*
  * ❌ *"Vivimos en una era donde la transformación digital..."*
  * ❌ *"Las bases de datos son un componente esencial de cualquier sistema..."*
* **Gancho inmediato:** Los dos primeros párrafos deben plantear el problema real, qué estaba en juego (los *stakes*) y la solución que se abordó.
* **Párrafos cortos:** Máximo 3-4 líneas por párrafo. Usa negritas para facilitar el escaneo visual de ideas clave.

### 🎯 Honestidad técnica y transparencia
* **Sin "magia":** En ingeniería real todo implica compromisos (*trade-offs*). 
* Si hubo una ventana de 3 minutos donde las escrituras devolvían un código `503 Service Unavailable`, dilo con orgullo y explica por qué una degradación controlada fue la decisión correcta frente a una caída imprevista. La honestidad genera credibilidad técnica.

---

## 2. Estructura Estándar de un Artículo

Cada post suele oscilar entre 400 y 800 palabras y debe seguir este esquema:

1. **Frontmatter:** Metadatos completos (título atractivo, descripción breve, fecha, autor y tags).
2. **Introducción / Hook:** Qué reto real enfrentamos y por qué no era trivial.
3. **¿Por qué el cambio? (El problema inicial):** Arquitectura previa, cuellos de botella, costes o limitaciones operativas.
4. **La Estrategia (Los pilares):** Entre 2 y 4 decisiones clave (patrones, servicios, mecanismos de seguridad como *feature flags*, TTL, réplicas, etc.).
5. **El Momento de la Verdad (Ejecución):** Secuencia paso a paso de lo que se ejecutó (cronología, hora, verificaciones).
6. **Resultados y Aprendizajes:** Números de impacto real (tiempos, latencias, impacto a usuarios) y 2-3 conclusiones prácticas aplicables.

---

## 3. Especificación Técnica de Archivos

### Ubicación y Nombres
* Español: `src/content/blog/es/<slug>.md`
* Inglés: `src/content/blog/en/<slug>.md`

El nombre del archivo (`<slug>.md`) debe ser **idéntico en ambas carpetas** para mantener la consistencia entre idiomas.

### Formato de Frontmatter
```yaml
---
title: "Título conciso y con impacto"
description: "Resumen de 1-2 frases explicando la solución y el resultado."
pubDate: YYYY-MM-DD
author: "Miguel Angel Luna"
tags: ["FinTech", "Distributed Systems", "Database", "AWS"]
---
```

* **Tags:** Usar etiquetas representativas y coherentes con los artículos existentes (`FinTech`, `Distributed Systems`, `Architecture`, `AWS`, `PostgreSQL`, `Resilience`, etc.).
* **Tags en inglés:** Si el post es en inglés, traduce las etiquetas (ej. `Sistemas Distribuidos` ➔ `Distributed Systems`, `Base de datos` ➔ `Database`).

---

## 4. Flujo de Publicación Bilingüe (ES ↔ EN)

Al crear un nuevo artículo o traducir uno existente:

1. **Mantener la misma esencia sin traducción literal:** La versión en inglés no debe ser una traducción robótica palabra por palabra. Debe utilizar terminología técnica estándar en inglés (*cutover*, *graceful degradation*, *replication lag*, *connection draining*, *read replicas*, *feature flags*).
2. **Comprobar la ortografía:**
   * En español: vigilar tildes, evitar errores comunes (*Route51* ➔ *Route 53*, *estubimos* ➔ *estuvimos*).
   * En inglés: verificar fluidez natural y puntuación en títulos y listas.
3. **Validación obligatoria:** Tras crear o editar cualquier archivo en `src/content/blog/`, ejecutar siempre:
   ```bash
   npm run build
   ```
   Comprueba que Astro genera la ruta estática correspondiente (tanto `/es/blog/<slug>/` como `/en/blog/<slug>/`) sin errores de schema o tipado.
