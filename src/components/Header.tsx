import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { UI } from "../data/ui";
import { PROFILE } from "../data/content";
import { useLang } from "../i18n/useLang";
import { useLocalTime } from "../hooks";
import { lockScroll, scrollToSection } from "../lib/scroll";

const NAV = [
  { id: "work", label: UI.navWork },
  { id: "about", label: UI.navAbout },
  { id: "services", label: UI.navServices },
  { id: "contact", label: UI.navContact },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const { lang, isAr, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const time = useLocalTime();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => {
    lockScroll(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToSection(id), open ? 420 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/72 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto grid h-18 max-w-[1600px] grid-cols-[1fr_auto] items-center gap-4 px-5 md:h-24 md:grid-cols-[1fr_auto_1fr] md:px-10">
          {/* wordmark */}
          <button
            onClick={() => go("top")}
            className="group flex items-center gap-2.5 justify-self-start"
            aria-label={UI.navHome[lang]}
          >
            <span className="font-display text-[1.35rem] leading-none tracking-tight md:text-2xl">
              {PROFILE.name[lang]}
            </span>
            <span className="mb-2 h-1 w-1 rounded-full bg-accent blink-dot" />
          </button>

          {/* centred navigation */}
          <nav className="hidden items-center gap-10 md:flex">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="link-wipe text-[13px] text-ink/70 transition-colors duration-300 hover:text-ink"
              >
                {item.label[lang]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end md:gap-3">
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[11px] leading-none tracking-wider transition-colors duration-300 hover:border-ink/35"
              aria-label={UI.langLabel[lang]}
            >
              <span className={isAr ? "text-ink" : "text-muted"}>ع</span>
              <span className="text-ink/20">/</span>
              <span className={isAr ? "text-muted" : "text-ink"}>EN</span>
            </button>

            <button
              onClick={() => go("contact")}
              data-magnetic
              className="group relative hidden overflow-hidden rounded-full border border-ink/25 px-5 py-2 text-xs font-medium backdrop-blur-md transition-colors duration-500 hover:border-transparent hover:text-bg md:block"
            >
              <span className="relative z-10">{UI.navContact[lang]}</span>
              <span className="absolute inset-0 z-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line backdrop-blur-md md:hidden"
              aria-expanded={open}
              aria-label={open ? UI.close[lang] : UI.menu[lang]}
            >
              <span className="flex flex-col gap-1">
                <span
                  className={`block h-px w-4 bg-ink transition-transform duration-300 ${
                    open ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-ink transition-transform duration-300 ${
                    open ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* reading progress */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent rtl:origin-right"
          style={{ scaleX: scrollYProgress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-gradient-to-b from-night to-bg px-6 pt-28 pb-8 md:hidden"
            data-lenis-prevent
          >
            <nav className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: EASE }}
                  onClick={() => go(item.id)}
                  className="flex items-baseline justify-between border-b border-line py-5 text-start"
                >
                  <span className="display text-[12vw] leading-none">{item.label[lang]}</span>
                  <span className="eyebrow">{`0${i + 1}`}</span>
                </motion.button>
              ))}
            </nav>

            <div className="flex items-end justify-between gap-6">
              <div className="flex flex-col gap-2">
                {PROFILE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-wipe w-fit text-sm text-muted"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <div className="text-end">
                <p className="eyebrow mb-1">{UI.localTime[lang]}</p>
                <p className="font-display text-2xl tabular-nums">{time}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
