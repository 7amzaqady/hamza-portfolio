import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import CaseStudy from "./CaseStudy";
import { WORKS } from "../data/content";
import { UI } from "../data/ui";
import { useLang } from "../i18n/useLang";

export default function Work() {
  const { lang, isAr } = useLang();
  const [active, setActive] = useState<number | null>(null);

  const open = (index: number) => setActive(index);
  const close = () => setActive(null);
  const next = () =>
    setActive((current) => (current === null ? null : (current + 1) % WORKS.length));

  return (
    <section id="work" className="mx-auto max-w-[1600px] scroll-mt-24 px-5 py-20 md:px-10 md:py-32">
      <SectionHeading
        eyebrow={UI.worksEyebrow[lang]}
        title={isAr ? ["مشاريع", "تبني علامات"] : ["Work that", "builds brands"]}
        meta={<p className="text-sm leading-relaxed text-muted">{UI.worksHint[lang]}</p>}
      />

      <div className="mt-14 flex flex-col gap-20 md:mt-24 md:gap-32">
        {WORKS.map((work, i) => {
          const flipped = i % 2 === 1;
          return (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => open(i)}
                data-cursor="view"
                aria-label={`${UI.viewCase[lang]} — ${work.title[lang]}`}
                className="group grid w-full grid-cols-1 items-center gap-6 text-start md:grid-cols-12 md:gap-10"
              >
                <div
                  className={`relative overflow-hidden bg-surface md:col-span-7 ${
                    flipped ? "md:order-2" : ""
                  }`}
                >
                  <div className="aspect-4/3 w-full overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title[lang]}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>

                  <span className="absolute top-4 left-4 rounded-full bg-bg/70 px-3 py-1 text-[10px] tracking-[0.2em] backdrop-blur-md">
                    {work.index}
                  </span>
                  <span className="absolute right-4 bottom-4 translate-y-3 rounded-full bg-accent px-4 py-1.5 text-[11px] font-medium text-bg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {UI.viewCase[lang]} ↗
                  </span>
                </div>

                <div className={`flex flex-col gap-4 md:col-span-5 ${flipped ? "md:order-1" : ""}`}>
                  <span className="eyebrow">
                    {work.category[lang]} — {work.year}
                  </span>
                  <span className="display text-section block transition-colors duration-500 group-hover:text-accent">
                    {work.title[lang]}
                  </span>
                  <span className="block max-w-[40ch] text-sm leading-relaxed text-muted">
                    {work.summary[lang]}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
                    {work.services[lang].map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-line px-3 py-1 text-[11px] text-muted"
                      >
                        {service}
                      </span>
                    ))}
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {active !== null && (
          <CaseStudy
            key={WORKS[active].id}
            work={WORKS[active]}
            nextWork={WORKS[(active + 1) % WORKS.length]}
            onClose={close}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
