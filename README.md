# Hamza Qady — Portfolio

A bilingual (Arabic / English) interactive portfolio for a graphic & digital
designer. Dark, editorial art direction with cursor-reactive detail, smooth
scrolling and a fully RTL-aware layout.

## Stack

| Tool | Purpose |
| --- | --- |
| Vite + React 19 + TypeScript | App shell |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Styling + design tokens |
| `motion` (Framer Motion) | Reveals, overlays, marquees, page transitions |
| `lenis` | Smooth inertia scrolling |
| `@fontsource*` | Self-hosted Inter, Instrument Serif, IBM Plex Sans Arabic |

## Scripts

```bash
npm install
npm run dev      # dev server → http://localhost:5173/hamza-portfolio/
npm run build    # type-check + production build into dist/
npm run preview  # serve the build locally
npm run lint
```

## Structure

```
index.html                    # lang="ar" dir="rtl" by default, fonts, inline favicon
src/
  main.tsx                    # entry
  App.tsx                     # providers + section composition
  index.css                   # Tailwind entry, theme tokens, custom utilities
  i18n/
    context.ts                # Language context (ar | en)
    LanguageProvider.tsx      # sets <html lang/dir>, document title, localStorage
    useLang.ts                # useLang() hook
  data/
    content.ts                # profile, projects, services, process, timeline, stats
    ui.ts                     # every interface string, both languages
  lib/scroll.ts               # Lenis setup, scrollToSection, scroll lock
  hooks/index.ts              # useMediaQuery, useLocalTime (Montreal clock)
  components/
    Preloader.tsx             # 0→100 counter + panel wipe
    Cursor.tsx                # custom cursor, hover states, magnetic buttons
    Header.tsx                # nav, language switch, mobile menu, scroll progress
    Footer.tsx                # contact, big hollow name, time, back-to-top
    Grain.tsx                 # film grain overlay
    RevealText.tsx            # masked line-by-line heading reveal
    SectionHeading.tsx        # shared eyebrow + title + meta block
  sections/
    Hero.tsx                  # full-bleed night-field photograph, centred display type
    Work.tsx                  # 6 featured projects, alternating layout
    CaseStudy.tsx             # full-screen case overlay (ESC / arrows / next project)
    About.tsx                 # bio, stats, capabilities, experience
    Services.tsx              # services list + 4-step process
    Contact.tsx               # validated form → mailto, socials, local time
src/assets/hero/
  hero-wide.jpg               # desktop hero photograph (16:9)
  hero-tall.jpg               # mobile hero photograph (<768px)
```

## Editing content

- **Text & projects** → `src/data/content.ts`
- **Interface strings (both languages)** → `src/data/ui.ts`
- **Colors, type scale, fonts** → the `@theme` block at the top of `src/index.css`
- **Images** → `src/assets/` (work images in `src/assets/work/`)

Every user-facing string exists in Arabic and English; missing a translation is a
type error because both are required by `Record<Lang, string>`.

## Design system — "Nightfield"

- Palette: `#05080f` night background, `#eef1f7` ink, `#8b9ab4` muted, and a
  single warm accent `#f2b45c` (the gold light in the hero photograph).
  Everything else is transparency over the dark ground.
- Type: Instrument Serif for Latin display, **Inter** for Latin body, **IBM Plex
  Sans Arabic** for Arabic (body and display — the `.display` utility switches
  family under `:lang(ar)`). All three are self-hosted, no external requests.
- Custom utilities in `index.css`: `.display`, `.text-hollow`, `.eyebrow`,
  `.halo`, `.grid-lines`, `.fade-mask`, `.link-wipe`, `.cue-drop`, `.blink-dot`,
  and the hero pair `.hero-image-mask` (edge fade that can't cut against the next
  section) + `.hero-scrim` (top nav scrim, vignette, warm bloom, bottom fade).
- Roles: `[data-cursor]` picks a cursor state (`view`, `drag`, `link`),
  `[data-magnetic]` makes a button magnetically follow the pointer.

## Swapping the hero photograph

Drop the new file over `src/assets/hero/hero-wide.jpg` (desktop, landscape) and
`src/assets/hero/hero-tall.jpg` (mobile, portrait). Nothing else changes — the
scrims, mask and parallax are tuned to keep the middle of the frame clear, so
choose a shot with some empty sky in the upper half and the subject low in the
frame.

## Accessibility & motion

- `prefers-reduced-motion` disables Lenis, the grain overlay, the hero parallax
  and shortens the preloader.
- The custom cursor only activates on fine pointers (mouse/trackpad); touch and
  keyboard users keep native behaviour.
- All interactive elements are real buttons/links with labels; `:focus-visible`
  uses the accent color.

## Contact form

The form validates client-side (name, email, message) and then hands off to the
visitor's mail client via a `mailto:` link built from the input. To send the mail
from the site itself, replace the `window.location.href` handoff in
`src/sections/Contact.tsx` with a request to a form endpoint (Formspree, Resend,
etc.) — no other change is needed.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub
Pages on every push to `main` (or manually via *workflow_dispatch*).
PR previews: only `main` deploys — branch pushes just run lint/build checks.

`vite.config.ts` resolves `base` as follows:

| Context | base |
| --- | --- |
| `npm run dev` (local & sandbox previews) | `/` |
| `npm run build` / `npm run preview` | `/hamza-portfolio/` |

That sub-path matches the Pages URL `https://7amzaqady.github.io/hamza-portfolio/`.
For a custom domain or a differently named repository, override it:

```bash
BASE_PATH=/ npm run build          # serve from the domain root
BASE_PATH=/my-repo/ npm run build  # serve from another sub-path
```
