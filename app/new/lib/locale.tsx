"use client";

/**
 * Self-contained locale context for /new.
 * EN default + ES toggle. (Previously EN/UK — Ukrainian remains on
 * /partners/* only, which has its own separate locale system.)
 *
 * On mount: resolves lang from URL param (?lang=es) -> localStorage -> "en".
 * On change: persists to localStorage and sets <html lang>.
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type NewLocale = "en" | "es";

interface NewLocaleCtx {
  locale: NewLocale;
  setLocale: (l: NewLocale) => void;
}

const STORAGE_KEY = "new_preferredLang";

const NewLocaleContext = createContext<NewLocaleCtx>({
  locale: "en",
  setLocale: () => {},
});

export function NewLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<NewLocale>("en");

  // On mount: URL param -> localStorage -> default "en"
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    const stored = localStorage.getItem(STORAGE_KEY);
    const resolved = urlLang || stored;
    if (resolved === "en" || resolved === "es") {
      setLocaleState(resolved);
    }
  }, []);

  // Sync <html lang> + persist on every change
  useEffect(() => {
    document.documentElement.lang = locale;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const setLocale = (l: NewLocale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
    }
  };

  return (
    <NewLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </NewLocaleContext.Provider>
  );
}

export function useNewLocale() {
  return useContext(NewLocaleContext);
}
