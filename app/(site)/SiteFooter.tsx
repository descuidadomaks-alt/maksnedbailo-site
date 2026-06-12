"use client";

import { useLang } from "@/lib/LanguageContext";
import { getNewDict } from "@/app/new/lib/i18n";
import NewFooter from "@/app/new/sections/NewFooter";

export default function SiteFooter() {
  const { lang } = useLang();
  const d = getNewDict(lang);
  const ctaTarget = lang === "es" ? "/ai-map?lang=es" : "/ai-map";
  return <NewFooter d={d} locale={lang} ctaTarget={ctaTarget} />;
}
