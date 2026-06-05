"use client";

/**
 * Self-contained locale context for /ai-map.
 * DirectLocale = "en" | "es" | "uk" — uk retained in type but no UI toggle.
 * On mount: resolves lang from URL param (?lang=es) → localStorage → default "en".
 * On change: persists to localStorage so preference survives navigation.
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type DirectLocale = "en" | "es" | "uk";

interface DirectLocaleCtx {
  locale: DirectLocale;
  setLocale: (l: DirectLocale) => void;
}

const DirectLocaleContext = createContext<DirectLocaleCtx>({
  locale: "en",
  setLocale: () => {},
});

export function DirectLocaleProvider({
  children,
  defaultLocale,
}: {
  children: ReactNode;
  defaultLocale: DirectLocale;
}) {
  const [locale, setLocaleState] = useState<DirectLocale>(defaultLocale);

  // FIX 2C — On mount: read URL param → localStorage → default
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params    = new URLSearchParams(window.location.search);
    const urlLang   = params.get("lang");
    const storedLang = localStorage.getItem("preferredLang");
    const resolved  = urlLang || storedLang || "en";
    if (resolved === "en" || resolved === "es") {
      setLocaleState(resolved as DirectLocale);
    }
  }, []);

  // Sync html lang attribute + persist to localStorage on every change
  useEffect(() => {
    document.documentElement.lang = locale === "uk" ? "uk" : locale;
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLang", locale);
    }
  }, [locale]);

  // Wrapper that also saves to localStorage
  const setLocale = (l: DirectLocale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLang", l);
    }
  };

  return (
    <DirectLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </DirectLocaleContext.Provider>
  );
}

export function useDirectLocale() {
  return useContext(DirectLocaleContext);
}
