"use client";

/**
 * Self-contained locale context for /ai-map.
 * Mirrors app/partners/[slug]/lib/partner-locale.tsx but lives here so
 * the /ai-map route has no dependency on the [slug] dynamic segment path.
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type DirectLocale = "en" | "uk";

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
    document.documentElement.lang = locale;
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
