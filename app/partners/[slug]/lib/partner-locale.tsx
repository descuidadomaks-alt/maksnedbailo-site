"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Locale } from "@/content/partners/index";

interface PartnerLocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const PartnerLocaleContext = createContext<PartnerLocaleCtx>({
  locale: "en",
  setLocale: () => {},
});

export function PartnerLocaleProvider({
  children,
  defaultLocale,
}: {
  children: ReactNode;
  defaultLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  return (
    <PartnerLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </PartnerLocaleContext.Provider>
  );
}

export function usePartnerLocale() {
  return useContext(PartnerLocaleContext);
}
