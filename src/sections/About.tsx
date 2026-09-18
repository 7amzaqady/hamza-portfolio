import { motion } from "motion/react";
import aboutImage from "../assets/about.jpg";
import SectionHeading from "../components/SectionHeading";
import RevealText from "../components/RevealText";
import { STATS, TIMELINE } from "../data/content";
import { ABOUT_BODY, CAPABILITIES, UI } from "../data/ui";
import { useLang } from "../i18n/useLang";

export default function About() {
  const { lang, isAr } = useLang();

  return (
    <section
      id="about"
      className="scroll-mt-24 border-line border-t bg-bg-soft py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          eyebrow={UI.aboutEyebrow[lang]}
          title={isAr ? ["صمّم لإقناع،", "مش للتزيين"] : ["Designed to convince,", "not to decorate"]}
        />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-14">
          <div className="flex flex-col gap-6 md:col-span-6">
            {ABOUT_BODY[lang].map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[52ch] text-sm leading-relaxed text-ink/85 md:text-base"
              >
                {paragraph}
              </motion.p>
            ))}

            <div className="mt-2 flex items-center gap-4">
              <span className="font-display text-2xl italic">{UI.aboutSignature[lang]}</span>
              <span className="h-px flex-1 bg-line" />
              <span className="eyebrow">{isAr ? "مونتريال" : "Montreal"}</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.value} className="bg-bg-soft p-4">
                  <p className="display text-3xl md:text-4xl">{stat.value}</p>
                  <p className="mt-2 text-[11px] leading-snug text-muted">{stat.label[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative md:col-span-6">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-surface"
            >
              <img
                src={aboutImage}
                alt={isAr ? "مكتب التصميم" : "Design workspace"}
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
            </motion.div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-muted">
              <span className="eyebrow">{isAr ? "دفتر العمل" : "Sketchbook"}</span>
              <span className="tabular-nums">2025</span>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-6">
            <h3 className="display mb-8 text-[clamp(1.5rem,3vw,2.2rem)]">
              <RevealText lines={[UI.capabilities[lang]]} />
            </h3>
            <ul className="flex flex-wrap gap-2">
              {CAPABILITIES[lang].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                >
                  <span className="inline-block rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors duration-300 hover:border-accent hover:text-ink">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6">
            <h3 className="display mb-8 text-[clamp(1.5rem,3vw,2.2rem)]">
              <RevealText lines={[UI.experience[lang]]} />
            </h3>
            <ul className="border-line border-t">
              {TIMELINE.map((item, i) => (
                <motion.li
                  key={item.period}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-6%" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-line border-b py-5"
                >
                  <span className="text-xs tabular-nums text-muted">{item.period}</span>
                  <span className="text-base font-medium">{item.title[lang]}</span>
                  <span className="text-xs text-muted">{item.place[lang]}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
