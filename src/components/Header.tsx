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

export default function Header() {
  const { lang, isAr, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const time = useLocalTime();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 32));

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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-line border-b bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
          <button
            onClick={() => go("top")}
            className="group flex items-center gap-2.5"
            aria-label={UI.navHome[lang]}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-[11px] font-semibold tracking-tight">
              {PROFILE.initials[lang]}
            </span>
            <span className="hidden text-sm font-medium sm:block">{PROFILE.name[lang]}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
          </button>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="link-wipe text-sm text-muted transition-colors hover:text-ink"
              >
                {item.label[lang]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggle}
              className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px] tracking-wider transition-colors hover:border-ink/40"
              aria-label={UI.langLabel[lang]}
            >
              <span className={isAr ? "text-ink" : "text-muted"}>ع</span>
              <span className="text-line">/</span>
              <span className={isAr ? "text-muted" : "text-ink"}>EN</span>
            </button>

            <button
              onClick={() => go("contact")}
              data-magnetic
              className="hidden rounded-full bg-ink px-5 py-2 text-xs font-medium text-bg transition-colors hover:bg-accent md:block"
            >
              {UI.navContact[lang]}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 items-center gap-2 rounded-full border border-line px-3 md:hidden"
              aria-expanded={open}
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
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg-soft px-5 pt-24 pb-8 md:hidden"
            data-lenis-prevent
          >
            <nav className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(item.id)}
                  className="flex items-baseline justify-between border-line border-b py-5 text-right"
                >
                  <span className="display text-[13vw] leading-none">{item.label[lang]}</span>
                  <span className="eyebrow">{`0${i + 1}`}</span>
                </motion.button>
              ))}
            </nav>

            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                {PROFILE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-wipe text-sm text-muted"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <div className="text-right">
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
