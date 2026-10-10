# Sistoma Wiki · Atlas de Sol

Wiki independiente en español, diseñada a partir de la estética del juego. Investigación directa del 10 de octubre de 2026, versión visible 0.9.82.

Incluye 130 fichas (25 naves, 6 estaciones, 16 materiales, 83 componentes), 25 guías, 29 planos observados en Meridian, atlas interactivo, comparador de naves, calculadoras de comercio y fabricación, glosario, búsqueda global y archivo personal local.

## Desarrollo

```sh
npm ci
npm run dev
```

## Comprobación y exportación

```sh
node scripts/verify-data.mjs
npm run build
```

La aplicación exporta todas las rutas a `out/`. `.openai/hosting.json` identifica el sitio y su directorio estático. Los favoritos e historial se conservan en el navegador; no se conectan con la cuenta del juego.

`data/catalog.json` conserva las tablas y relaciones factuales de la enciclopedia con enlaces locales y secciones identificadas. `data/guides.ts` contiene explicaciones propias y fuentes. `data/blueprints.json` contiene recetas de la pantalla de Fabricación de Meridian. `scripts/prepare-data.mjs` puede reconstruir los datos usando las capturas de investigación locales, excluidas del repositorio.

La página Fuentes y cobertura explica los límites: no se completaron todas las campañas ni se visitaron todas las pantallas de las estaciones remotas. Los precios están fechados y no se actualizan automáticamente. Las relaciones industriales de las estaciones se distinguen de recetas personales.

## Archivo visual

La portada y `/galeria/` incorporan dos capturas oficiales de Novedades (v0.9.50 y v0.9.60), siete detalles extraídos de ellas y el holograma oficial de Kira. `scripts/extract-visuals.mjs` genera las nueve imágenes WebP desde los originales locales. `data/visuals.ts` identifica las fuentes y enlaza cada detalle con una guía. Las capturas se amplían con zoom y se recorren mediante puntos explicativos; el visor devuelve el foco y se cierra con Escape.

`components/VisualLesson.tsx` contiene 25 diagramas y secuencias explorables, una por guía. `EntryVisual.tsx` y `ShipBlueprint.tsx` dibujan esquemas de función para las fichas. Las medidas y métricas son datos del catálogo; las siluetas son ilustrativas, sin representar la geometría exacta del juego. No se han extraído modelos 3D. La Albor utiliza un recorte auténtico del hangar. Los antiguos archivos ship-22/23 contenían el menú de la enciclopedia y ya no se usan como imágenes de naves.

Las imágenes oficiales, el personaje y las tipografías proceden de Sistoma. Las explicaciones, esquemas, diseño web e interacciones de aprendizaje son propios de esta wiki independiente.
