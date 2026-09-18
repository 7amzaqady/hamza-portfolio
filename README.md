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
    Hero.tsx                  # name with cursor-following gradient spotlight + marquee
    Work.tsx                  # 6 featured projects, alternating layout
    CaseStudy.tsx             # full-screen case overlay (ESC / arrows / next project)
    About.tsx                 # bio, stats, capabilities, experience
    Services.tsx              # services list + 4-step process
    Contact.tsx               # validated form → mailto, socials, local time
android/                      # (not used)
```

## Editing content

- **Text & projects** → `src/data/content.ts`
- **Interface strings (both languages)** → `src/data/ui.ts`
- **Colors, type scale, fonts** → the `@theme` block at the top of `src/index.css`
- **Images** → `src/assets/` (work images in `src/assets/work/`)

Every user-facing string exists in Arabic and English; missing a translation is a
type error because both are required by `Record<Lang, string>`.

## Design system

- Palette: `#0a0a0a` background, `#f4f1ea` ink, `#ff5a1f` accent, `#d9ff3d` lime.
- Type: Instrument Serif for Latin display, Rubik for body **and** for Arabic
  display (the `.display` utility switches family/weight under `:lang(ar)`).
- Custom utilities in `index.css`: `.display`, `.text-hollow`, `.eyebrow`,
  `.grid-lines`, `.fade-mask`, `.link-wipe`, `.spot-text__glow`, `.marquee-track`.
- Roles: `[data-cursor]` picks a cursor state (`view`, `drag`, `link`),
  `[data-magnetic]` makes a button magnetically follow the pointer.

## Accessibility & motion

- `prefers-reduced-motion` disables Lenis, the grain overlay and shortens the
  preloader.
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
`vite.config.ts` sets `base: '/hamza-portfolio/'` to match the Pages URL —
change it if you deploy to a custom domain or a different repository name.
