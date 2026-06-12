"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Lang } from "./content";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Resolve initial lang on mount (SSR-safe): locale-prefixed routes
  // (/en/* or /es/*) win, since their content is fixed to that language;
  // otherwise fall back to the saved preference.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    if (path.startsWith("/es/")) {
      setLangState("es");
      return;
    }
    if (path.startsWith("/en/")) {
      setLangState("en");
      return;
    }
    const saved = localStorage.getItem("preferredLang");
    if (saved === "en" || saved === "es") {
      setLangState(saved);
    }
  }, []);

  // Wrapper: saves to localStorage every time language changes
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLang", l);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
