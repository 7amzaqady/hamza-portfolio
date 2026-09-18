import { useRef } from "react";
import { motion } from "motion/react";
import { useLang } from "../i18n/useLang";
import { useLocalTime } from "../hooks";
import { CAPABILITIES, UI } from "../data/ui";
import { PROFILE } from "../data/content";
import { scrollToSection } from "../lib/scroll";

const NAME_LINES = {
  ar: ["حمزة", "قاضي"],
  en: ["HAMZA", "QADY"],
};

export default function Hero() {
  const { lang, isAr } = useLang();
  const time = useLocalTime();
  const spotRef = useRef<HTMLDivElement | null>(null);
  const lines = NAME_LINES[lang];

  const moveSpot = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = spotRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const resetSpot = () => {
    const el = spotRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "-40%");
    el.style.setProperty("--spot-y", "-40%");
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden pt-28 pb-16 md:pt-36"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines fade-mask absolute inset-0" />
        <div
          className="absolute top-[-18%] left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, #ff5a1f 0%, transparent 68%)" }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          <span className="flex items-center gap-2 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {UI.heroAvailable[lang]}
          </span>
          <span className="text-xs text-muted">
            {UI.heroBasedIn[lang]} — {PROFILE.location[lang]}
          </span>
          <span className="text-xs text-muted tabular-nums">
            {UI.localTime[lang]} {time}
          </span>
        </motion.div>

        {/* name with a cursor-tracked highlight */}
        <div
          className="relative mt-8 select-none md:mt-12"
          onMouseMove={moveSpot}
          onMouseLeave={resetSpot}
          style={{ ["--spot-x" as string]: "-40%", ["--spot-y" as string]: "-40%" }}
        >
          <motion.h1
            initial={{ y: "12%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="display text-hero"
          >
            <span className="block">{lines[0]}</span>
            <span className="flex items-baseline gap-[0.12em]">
              <span className="block">{lines[1]}</span>
              <span className="hidden text-[0.16em] font-normal tracking-widest text-muted md:block">
                ©{new Date().getFullYear()}
              </span>
            </span>
          </motion.h1>

          <span ref={spotRef} aria-hidden="true" className="spot-text__glow display text-hero absolute inset-0">
            <span className="block">{lines[0]}</span>
            <span className="block">{lines[1]}</span>
          </span>
        </div>

        <div className="mt-10 grid gap-10 border-line border-t pt-8 md:mt-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <p className="eyebrow mb-3">{PROFILE.role[lang]}</p>
            <p className="max-w-[38ch] text-sm leading-relaxed text-muted">
              {isAr
                ? "أبني هويات بصرية وتجارب رقمية لعلامات بدها تُفتكر، من أول فكرة لحد آخر ملف تسليم."
                : "I build visual identities and digital experiences for brands that want to be remembered — from first idea to final handover."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-start gap-3 md:col-span-4"
          >
            <button
              onClick={() => scrollToSection("work")}
              className="group relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-bg"
            >
              <span className="relative z-10">{UI.navWork[lang]}</span>
              <span className="absolute inset-0 z-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="link-wipe py-3.5 text-sm text-muted transition-colors hover:text-ink"
            >
              {UI.navContact[lang]}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-end justify-between gap-6 md:col-span-3 md:flex-col md:items-end md:justify-start"
          >
            <button
              onClick={() => scrollToSection("work")}
              className="flex items-center gap-3 text-xs text-muted"
            >
              <span className="relative flex h-10 w-5 justify-center overflow-hidden rounded-full border border-line">
                <motion.span
                  className="mt-2 h-1.5 w-1.5 rounded-full bg-accent"
                  animate={{ y: [0, 18, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              {UI.heroScroll[lang]}
            </button>

            <span className="hidden text-[10px] tracking-[0.3em] text-muted uppercase md:block">
              {UI.heroSince[lang]}
            </span>
          </motion.div>
        </div>
      </div>

      {/* capabilities marquee */}
      <div className="relative mt-14 border-line border-y py-4 md:mt-20">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pe-10">
            {[...CAPABILITIES[lang], ...CAPABILITIES[lang]].map((cap, i) => (
              <span key={`${cap}-${i}`} className="flex items-center gap-10 text-sm text-muted">
                {cap}
                <span className="text-accent">✳</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
