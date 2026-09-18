import { useEffect } from "react";
import { motion } from "motion/react";
import type { Work } from "../data/content";
import { UI } from "../data/ui";
import { useLang } from "../i18n/useLang";
import { lockScroll } from "../lib/scroll";

type Props = {
  work: Work;
  nextWork: Work;
  onClose: () => void;
  onNext: () => void;
};

export default function CaseStudy({ work, nextWork, onClose, onNext }: Props) {
  const { lang } = useLang();

  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [onClose, onNext]);

  const meta = [
    { label: UI.caseYear[lang], value: work.year },
    { label: UI.caseClient[lang], value: work.title[lang] },
    { label: UI.caseRole[lang], value: work.category[lang] },
  ];

  return (
    <motion.div
      initial={{ y: "6%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "4%", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[65] bg-bg"
      role="dialog"
      aria-modal="true"
      aria-label={work.title[lang]}
    >
      <div className="flex h-full flex-col">
        {/* Bar */}
        <div className="flex items-center justify-between border-line border-b px-5 py-4 md:px-10">
          <span className="eyebrow">
            {work.index} — {work.category[lang]}
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs transition-colors hover:border-ink/40 hover:bg-ink hover:text-bg"
          >
            {UI.closeCase[lang]}
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="no-scrollbar flex-1 overflow-y-auto" data-lenis-prevent>
          <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10 md:py-16">
            <h2 className="display text-display">{work.title[lang]}</h2>
            <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-muted md:text-base">
              {work.summary[lang]}
            </p>

            <div className="mt-10 grid gap-6 border-line border-y py-6 md:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <p className="eyebrow mb-2">{item.label}</p>
                  <p className="text-sm">{item.value}</p>
                </div>
              ))}
              <div>
                <p className="eyebrow mb-2">{UI.caseServices[lang]}</p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                  {work.services[lang].map((service) => (
                    <li key={service} className="text-muted">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 overflow-hidden bg-surface">
              <motion.img
                src={work.image}
                alt={work.title[lang]}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-12">
              <p className="eyebrow md:col-span-3">{UI.caseOverview[lang]}</p>
              <div className="flex flex-col gap-5 md:col-span-8">
                {work.description[lang].map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm leading-relaxed text-ink/85 md:text-base"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>

            <button
              onClick={onNext}
              data-magnetic
              className="group mt-16 flex w-full items-center justify-between border-line border-t pt-8 text-start"
            >
              <span className="flex flex-col gap-2">
                <span className="eyebrow">{UI.nextCase[lang]}</span>
                <span className="display text-section transition-colors group-hover:text-accent">
                  {nextWork.title[lang]}
                </span>
                <span className="text-xs text-muted">{nextWork.category[lang]}</span>
              </span>
              <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
