import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import { PROCESS, SERVICES } from "../data/content";
import { UI } from "../data/ui";
import { useLang } from "../i18n/useLang";

export default function Services() {
  const { lang, isAr } = useLang();

  return (
    <section
      id="services"
      className="mx-auto max-w-[1600px] scroll-mt-24 px-5 py-20 md:px-10 md:py-32"
    >
      <SectionHeading
        eyebrow={UI.servicesEyebrow[lang]}
        title={isAr ? ["شو بقدر", "أشتغل عليه"] : ["What I can", "take on"]}
      />

      <ul className="mt-14 border-line border-t">
        {SERVICES.map((service, i) => (
          <motion.li
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden border-line border-b"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
            <div className="relative grid items-baseline gap-3 py-7 md:grid-cols-12 md:gap-8">
              <span className="eyebrow md:col-span-1">{`0${i + 1}`}</span>
              <h3 className="display text-[clamp(1.5rem,3.4vw,2.6rem)] md:col-span-5">
                {service.title[lang]}
              </h3>
              <p className="max-w-[46ch] text-sm leading-relaxed text-muted md:col-span-6">
                {service.body[lang]}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="mt-24">
        <SectionHeading
          eyebrow={UI.processEyebrow[lang]}
          title={isAr ? ["من أول مكالمة", "للتسليم"] : ["From first call", "to handover"]}
        />

        <div className="mt-12 grid gap-px bg-line md:grid-cols-4">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.title.en}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 bg-bg p-6 md:p-8"
            >
              <span className="font-display text-4xl text-hollow">{step.step[lang]}</span>
              <h3 className="text-lg font-medium">{step.title[lang]}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
