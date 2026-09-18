import { createContext } from "react";

export type Lang = "ar" | "en";

export type LanguageContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  isAr: boolean;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export const STORAGE_KEY = "hq-portfolio-lang";
