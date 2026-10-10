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

La página Fuentes y cobertura explica los límites: no se completaron todas las campañas ni se visitaron todas las pantallas de las estaciones remotas. Los precios están fechados y no se actualizan automáticamente. Las relaciones industriales de las estaciones se distinguen de recetas personales. Las fuentes, imágenes oficiales y tipografías proceden de Sistoma; la ilustración orbital de portada se construye en SVG.
