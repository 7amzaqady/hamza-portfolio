import { UI } from "../data/ui";
import { PROFILE } from "../data/content";
import { useLang } from "../i18n/useLang";
import { useLocalTime } from "../hooks";
import { scrollToSection, scrollToTop } from "../lib/scroll";

const LINKS = [
  { id: "work", label: UI.navWork },
  { id: "about", label: UI.navAbout },
  { id: "services", label: UI.navServices },
  { id: "contact", label: UI.navContact },
];

export default function Footer() {
  const { lang, isAr } = useLang();
  const time = useLocalTime();

  return (
    <footer className="relative overflow-hidden border-line border-t bg-bg-soft">
      <div className="mx-auto max-w-[1600px] px-5 pt-16 pb-8 md:px-10 md:pt-24">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="eyebrow mb-3">{isAr ? "لنتابع" : "Let's connect"}</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="link-wipe text-lg transition-colors hover:text-accent md:text-2xl"
            >
              {PROFILE.email}
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-4">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="link-wipe text-start text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label[lang]}
              </button>
            ))}
          </nav>

          <div className="flex gap-6">
            {PROFILE.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="link-wipe text-sm text-muted transition-colors hover:text-ink"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <h2 className="display text-hollow text-[clamp(3rem,17vw,15rem)] leading-[0.85]">
            {PROFILE.name[lang]}
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-line border-t pt-6 text-[11px] text-muted">
          <span>
            © {new Date().getFullYear()} · {UI.footerRights[lang]}
          </span>
          <span className="tabular-nums">
            {UI.localTime[lang]} {time} · {PROFILE.location[lang]}
          </span>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 transition-colors hover:text-ink"
          >
            {UI.footerTop[lang]}
            <span className="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
