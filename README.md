# hamza-portfolio

Clean slate. The old portfolio was removed completely — no leftover components,
styles, assets, or animation code.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- ESLint

## Scripts

```bash
npm install
npm run dev      # dev server on 0.0.0.0:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the build
npm run lint
```

## Structure

```
index.html
public/            # static files (empty for now)
src/
  main.tsx         # entry — mounts <App /> (no router wired up)
  App.tsx          # empty placeholder
  index.css        # Tailwind entry + design tokens
vite.config.ts     # base: /hamza-portfolio/, host 0.0.0.0
.github/workflows/deploy.yml   # builds and deploys dist/ to GitHub Pages
```

## Notes

- `vite.config.ts` sets `base: '/hamza-portfolio/'` because the site is served
  from GitHub Pages at `https://<user>.github.io/hamza-portfolio/`.
- Design tokens live in `src/index.css` under `@theme` / `:root` — define the
  new color and type scale there before building sections.
- Dependencies are intentionally minimal. Add what the new design needs
  (animation, routing, icons) when it's actually used.
