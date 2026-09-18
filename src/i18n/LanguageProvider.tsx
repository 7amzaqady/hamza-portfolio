import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { LanguageContext, STORAGE_KEY } from "./context";
import type { Lang } from "./context";

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "ar";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "ar" || stored === "en") return stored;

  return window.navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const dir = lang === "ar" ? ("rtl" as const) : ("ltr" as const);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    document.title =
      lang === "ar"
        ? "حمزة قاضي — مصمم جرافيك وتجارب رقمية"
        : "Hamza Qady — Graphic & Digital Designer";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(
    () => setLangState((prev) => (prev === "ar" ? "en" : "ar")),
    [],
  );

  const value = useMemo(
    () => ({ lang, dir, isAr: lang === "ar", setLang, toggle }),
    [lang, dir, setLang, toggle],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
