import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import heroWide from "../assets/hero/hero-wide.jpg";
import heroTall from "../assets/hero/hero-tall.jpg";
import { HERO_TITLE, UI } from "../data/ui";
import { PROFILE } from "../data/content";
import { useLang } from "../i18n/useLang";
import { useLocalTime } from "../hooks";
import { scrollToSection } from "../lib/scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Entrance helper: everything is held until the preloader hands over. */
function rise(ready: boolean, delay: number) {
  return {
    initial: { opacity: 0, y: 26 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 1, delay, ease: EASE },
  };
}

export default function Hero({ ready = true }: { ready?: boolean }) {
  const { lang } = useLang();
  const time = useLocalTime();
  const reduced = useReducedMotion() ?? false;

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // The photograph drifts slower than the page, the words drift slightly ahead.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-7%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.9], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* ---------------------------------------------------------------- image */}
      <motion.div
        aria-hidden="true"
        style={{ y: imageY }}
        className="pointer-events-none absolute inset-x-0 -top-[14%] -bottom-[14%] -z-10"
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={heroTall} />
          <img
            src={heroWide}
            alt=""
            className="hero-image-mask h-full w-full object-cover object-center"
          />
        </picture>
      </motion.div>

      {/* Gradient scrims: readable nav on top, page fade at the bottom. */}
      <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0 -z-10" />

      {/* -------------------------------------------------------------- content */}
      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="relative mx-auto flex w-full max-w-[1180px] flex-1 flex-col items-center justify-center px-6 pt-32 pb-16 text-center md:pt-36"
      >
        <motion.span
          {...rise(ready, 0.08)}
          className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 text-[11px] leading-none text-ink/80 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span>{UI.heroAvailable[lang]}</span>
          <span className="h-3 w-px bg-white/15" />
          <span className="text-ink/60">{PROFILE.role[lang]}</span>
        </motion.span>

        <h1 className="display text-hero mt-7 max-w-[24ch] text-balance md:mt-9">
          {HERO_TITLE[lang].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={ready ? { y: "0%" } : { y: "112%" }}
                transition={{ duration: 1.25, delay: 0.16 + i * 0.11, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          {...rise(ready, 0.52)}
          className="mt-6 max-w-[56ch] text-balance text-sm leading-relaxed text-ink/72 md:mt-7 md:text-base"
        >
          {UI.heroIntro[lang]}
        </motion.p>

        <motion.div
          {...rise(ready, 0.64)}
          className="mt-9 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 md:mt-11"
        >
          <button
            onClick={() => scrollToSection("work")}
            className="halo group relative overflow-hidden rounded-full border border-ink/25 bg-ink/[0.06] px-8 py-3.5 text-sm font-medium backdrop-blur-md transition-colors duration-500 hover:border-transparent hover:text-bg"
          >
            <span className="relative z-10">{UI.heroCtaPrimary[lang]}</span>
            <span className="absolute inset-0 z-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="link-wipe px-3 py-3.5 text-sm text-ink/70 transition-colors duration-300 hover:text-ink"
          >
            {UI.heroCtaSecondary[lang]}
          </button>
        </motion.div>
      </motion.div>

      {/* ----------------------------------------------------------- bottom bar */}
      <motion.div
        {...rise(ready, 0.82)}
        className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 border-t border-line px-5 py-5 text-[11px] text-muted md:px-10"
      >
        <span className="hidden items-center gap-3 md:flex">
          <span className="h-px w-10 bg-line" />
          {UI.heroBasedIn[lang]} — {PROFILE.location[lang]}
        </span>

        <button
          onClick={() => scrollToSection("work")}
          className="group mx-auto flex flex-col items-center gap-2 md:mx-0"
        >
          <span className="tracking-[0.24em] uppercase transition-colors group-hover:text-ink">
            {UI.heroScroll[lang]}
          </span>
          <span className="relative flex h-8 w-4 justify-center overflow-hidden rounded-full border border-line">
            <span className="cue-drop mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        </button>

        <span className="hidden items-center gap-3 tabular-nums md:flex">
          {UI.localTime[lang]} {time}
          <span className="h-px w-10 bg-line" />
        </span>
      </motion.div>
    </section>
  );
}
