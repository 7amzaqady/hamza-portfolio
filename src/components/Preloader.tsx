import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLang } from "../i18n/useLang";
import { PROFILE } from "../data/content";

const WORDS = {
  ar: ["فكرة", "هوية", "شكل", "حركة"],
  en: ["Idea", "Identity", "Form", "Motion"],
};

export default function Preloader({ onDone }: { onDone: () => void }) {
  const { lang, isAr } = useLang();
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const words = WORDS[lang];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setExiting(true);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Hand control back to the page once the panels have cleared.
  useEffect(() => {
    if (!exiting) return;
    const id = window.setTimeout(onDone, 1250);
    return () => window.clearTimeout(id);
  }, [exiting, onDone]);

  return (
    <div className="fixed inset-0 z-[90] flex flex-col justify-between overflow-hidden p-6 md:p-10">
      {/* Panels that wipe away on exit */}
      <div className="absolute inset-0 -z-10 flex">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-gradient-to-b from-night to-bg"
            initial={{ y: 0 }}
            animate={exiting ? { y: "-101%" } : { y: 0 }}
            transition={{ duration: 0.95, delay: i * 0.09, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-1 flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow">{PROFILE.name[lang]}</span>
          <span className="eyebrow">{isAr ? "مصمم" : "Designer"}</span>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex h-[1.2em] items-center overflow-hidden">
            <motion.span
              key={words[count % words.length]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[13vw] leading-none md:text-[7vw]"
            >
              {words[count % words.length]}
            </motion.span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="h-px w-full max-w-sm bg-line">
            <motion.div
              className="h-px bg-accent shadow-[0_0_20px_rgba(242,180,92,0.7)]"
              style={{ width: `${count}%` }}
            />
          </div>
          <span className="font-display text-[14vw] leading-none tabular-nums md:text-[7vw]">
            {String(count).padStart(3, "0")}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
