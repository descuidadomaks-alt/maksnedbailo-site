"use client";

/**
 * Self-contained locale context for /ai-map.
 * DirectLocale = "en" | "es" | "uk" — three options, EN default.
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
  const [locale, setLocale] = useState<DirectLocale>(defaultLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "uk" ? "uk" : "en";
  }, [locale]);

  return (
    <DirectLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </DirectLocaleContext.Provider>
  );
}

export function useDirectLocale() {
  return useContext(DirectLocaleContext);
}
