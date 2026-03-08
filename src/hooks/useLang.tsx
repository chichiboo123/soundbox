import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "ko" | "en" | "ja";

const LANG_ORDER: Lang[] = ["ko", "en", "ja"];
const LANG_LABELS: Record<Lang, string> = { ko: "한국어", en: "English", ja: "日本語" };

interface LangContextType {
  lang: Lang;
  cycleLang: () => void;
  langLabel: string;
}

const LangContext = createContext<LangContextType>({ lang: "ko", cycleLang: () => {}, langLabel: "한국어" });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");
  const cycleLang = useCallback(() => {
    setLang((l) => {
      const idx = LANG_ORDER.indexOf(l);
      return LANG_ORDER[(idx + 1) % LANG_ORDER.length];
    });
  }, []);
  return (
    <LangContext.Provider value={{ lang, cycleLang, langLabel: LANG_LABELS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** Pick text by current language */
export function useT() {
  const { lang } = useLang();
  return function t<T>(ko: T, en: T, ja: T): T {
    if (lang === "en") return en;
    if (lang === "ja") return ja;
    return ko;
  };
}
