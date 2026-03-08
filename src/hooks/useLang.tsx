import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Lang = "ko" | "en";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({ lang: "ko", toggleLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");
  const toggleLang = useCallback(() => setLang((l) => (l === "ko" ? "en" : "ko")), []);
  return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
