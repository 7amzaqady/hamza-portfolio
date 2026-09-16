#!/usr/bin/env node
// Patch @designcodeio/threeui Community 1.2.0 so MengToSketchbookLandingPage loads under GitHub Pages base /hamza-portfolio/
// The package hardcodes sourceUrl="/landing-pages/meng-to-sketchbook.html" which 404s when base is "/hamza-portfolio/"
// We rewrite it to "/hamza-portfolio/landing-pages/meng-to-sketchbook.html" — the public assets we copy from Community (SHA e0330548b1ac) live there.
// Also handles both dev (vite base /hamza-portfolio/) and prod (GitHub Pages). If base is ever changed to "/", the file still works because
// "/hamza-portfolio/landing-pages/..." is also served under Vite's dev server when base is /hamza-portfolio/ — see vite.config.ts base.
// For a truly base-agnostic fix you'd inject import.meta.env.BASE_URL at runtime, but a static rewrite is simpler and survives the rolldown build.

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const target = join(process.cwd(), "node_modules/@designcodeio/threeui/lib-dist/shaders/landing-pages/LandingPages.js");
if (!existsSync(target)) {
  console.log("[patch-threeui] target not found, skipping:", target);
  process.exit(0);
}
let text = readFileSync(target, "utf8");
const from = 'sourceUrl: "/landing-pages/meng-to-sketchbook.html"';
const to = 'sourceUrl: "/hamza-portfolio/landing-pages/meng-to-sketchbook.html"';
if (text.includes(from)) {
  text = text.split(from).join(to);
  writeFileSync(target, text, "utf8");
  console.log("[patch-threeui] patched MengToSketchbookLandingPage sourceUrl -> /hamza-portfolio/landing-pages/meng-to-sketchbook.html");
} else if (text.includes(to)) {
  console.log("[patch-threeui] already patched");
} else {
  console.log("[patch-threeui] no matching sourceUrl found, file may have changed — check LandingPages.js");
}

// Also patch the ESM wrapper in package-components if present (re-export)
const wrapper = join(process.cwd(), "node_modules/@designcodeio/threeui/lib-dist/package-components/MengToSketchbookLandingPage.js");
if (existsSync(wrapper)) {
  // no sourceUrl there, just re-export — nothing to patch
}
