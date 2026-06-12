"use client";

import { useLang } from "@/lib/LanguageContext";
import NewHeader from "@/app/new/components/NewHeader";

export default function SiteHeader() {
  const { lang, setLang } = useLang();
  return <NewHeader locale={lang} setLocale={setLang} />;
}
