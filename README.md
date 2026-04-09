# Cacophony

Static website for the Cacophony band, built with [Astro](https://astro.build).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |
| `npm run check`   | Run Astro type checking                      |
| `npm run lint`    | Lint source files                            |

## Project Structure

```
/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   └── pages/
│       └── index.astro
└── package.json
```

Pages are exposed as routes based on their file name under `src/pages/`.

Static assets go in `public/` (served as-is) or `src/assets/` (processed by Astro).
