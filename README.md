# Sudhanraja S — Portfolio

A single-page portfolio for a Software / Backend / AI engineer, built with
React + Vite. Design theme: **"Terminal Signal"** — deep-slate editor surfaces
with a teal signal accent and a lime secondary, evoking an engineer's actual
environment rather than a generic template.

## Highlights

- **Signature element** — a live, typed terminal in the hero that runs a short,
  truthful session about the stack (`src/components/Terminal.jsx`).
- **Light / dark theme** — pre-first-paint theme script in `index.html` (no
  flash), toggle in the navbar, follows OS preference until the user chooses.
  All colors are CSS custom properties in `src/index.css`.
- **Content as data** — everything editable lives in `src/data/portfolio.js`.
- **Accessible & lean** — semantic HTML, visible focus states, `prefers-reduced-motion`
  respected, ~66 KB gzipped JS.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint
```

## Deployment

Builds to a fully static `dist/` — deployable anywhere with **no extra config**.

- **Vercel / Netlify** — import the repo; framework preset **Vite**, build
  command `npm run build`, output directory `dist`. No environment variables
  are required.
- **GitHub Pages** — run `npm run build` and publish `dist/`. If serving from a
  project subpath (e.g. `user.github.io/portfolio/`), set `base: "/portfolio/"`
  in `vite.config.js` first.

### Before going live

- Replace the placeholder domain `https://sudhanraja.dev/` in `index.html`
  (canonical, Open Graph, Twitter, JSON-LD), `public/robots.txt`, and
  `public/sitemap.xml` with your real domain.
- Add an `og-image.png` (1200×630) to `public/` for social link previews.
- Drop your résumé at `public/resume.pdf` (the hero's download button points there).
