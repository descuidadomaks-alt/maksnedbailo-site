"use client";

/**
 * V2's header — the shared NewHeader chrome (ticker, logo, blog, EN/ES,
 * primary CTA), pointed at the V2 CTA target (/ai-map/new) instead of the
 * default /ai-map. Mirrors the pattern in app/ai-map/lib/DirectLocaleWrapper.tsx.
 */
import { useNewLocale } from "../../lib/locale";
import NewHeader from "../../components/NewHeader";
import { getV2Copy } from "../lib/copy";
import { CTA_TARGET, CTA_TARGET_ES } from "../lib/config";

export default function V2Header() {
  const { locale, setLocale } = useNewLocale();
  const d = getV2Copy(locale);
  const ctaHref = locale === "es" ? CTA_TARGET_ES : CTA_TARGET;

  return <NewHeader locale={locale} setLocale={setLocale} ctaHref={ctaHref} ctaLabel={d.hero.primaryCta} />;
}
