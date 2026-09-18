import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import { PROFILE } from "../data/content";
import { UI } from "../data/ui";
import { useLang } from "../i18n/useLang";
import { useLocalTime } from "../hooks";

type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const { lang, isAr } = useLang();
  const time = useLocalTime();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = UI.formRequired[lang];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = UI.formEmail[lang];
    if (form.message.trim().length < 8) next.message = UI.formRequired[lang];

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = isAr ? `مشروع جديد — ${form.name}` : `New project — ${form.name}`;
    const body = `${form.message}\n\n—\n${form.name}\n${form.email}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  const fieldClass = (hasError?: string) =>
    `w-full border-b bg-transparent py-4 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent ${
      hasError ? "border-accent" : "border-line"
    }`;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-line border-t py-20 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines fade-mask absolute inset-0 opacity-60" />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          eyebrow={UI.contactEyebrow[lang]}
          title={isAr ? ["عندك مشروع؟", "خلينا نحكي"] : ["Got a project?", "Let's talk"]}
        />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12">
          <div className="flex flex-col gap-8 md:col-span-5">
            <p className="max-w-[42ch] text-sm leading-relaxed text-muted">
              {UI.contactBody[lang]}
            </p>

            <a
              href={`mailto:${PROFILE.email}`}
              data-cursor="link"
              className="group flex flex-col gap-2"
            >
              <span className="eyebrow">{UI.contactCta[lang]}</span>
              <span className="display text-[clamp(1.3rem,2.6vw,2rem)] transition-colors duration-500 group-hover:text-accent">
                {PROFILE.email}
              </span>
            </a>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-line border-t pt-6">
              {PROFILE.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-wipe text-sm text-muted transition-colors hover:text-ink"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between border-line border-t pt-6">
              <span className="eyebrow">{UI.localTime[lang]}</span>
              <span className="font-display text-2xl tabular-nums">{time}</span>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full min-h-[22rem] flex-col items-start justify-center gap-4 border border-line bg-bg-soft p-8"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-bg">
                    ✓
                  </span>
                  <h3 className="display text-2xl">{UI.sentTitle[lang]}</h3>
                  <p className="text-sm text-muted">{UI.sentBody[lang]}</p>
                  <button
                    onClick={() => setSent(false)}
                    className="link-wipe mt-2 text-xs text-muted hover:text-ink"
                  >
                    {UI.againLabel[lang]}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="eyebrow">{UI.nameLabel[lang]}</span>
                      <input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder={isAr ? "اسمك الكامل" : "Your full name"}
                        className={fieldClass(errors.name)}
                      />
                      {errors.name && <span className="text-[11px] text-accent">{errors.name}</span>}
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="eyebrow">{UI.emailLabel[lang]}</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="name@email.com"
                        className={fieldClass(errors.email)}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-accent">{errors.email}</span>
                      )}
                    </label>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="eyebrow">{UI.messageLabel[lang]}</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={6}
                      placeholder={
                        isAr
                          ? "احكيلي عن المشروع، الميزانية، والوقت المتوقع…"
                          : "Tell me about the project, budget and timeline…"
                      }
                      className={`${fieldClass(errors.message)} resize-none`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-accent">{errors.message}</span>
                    )}
                  </label>

                  <button
                    type="submit"
                    data-magnetic
                    className="group relative mt-2 w-fit overflow-hidden rounded-full bg-ink px-8 py-4 text-sm font-medium text-bg"
                  >
                    <span className="relative z-10">{UI.sendLabel[lang]}</span>
                    <span className="absolute inset-0 z-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
