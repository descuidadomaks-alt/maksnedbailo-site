"use client";

/**
 * /new — minimal fixed header.
 * Logo (-> /new), AI Map link, EN/ES toggle, "Book the Bottleneck Map" CTA.
 * Visual language ported from NavNew.tsx / DirectLocaleWrapper.tsx (frosted glass).
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useNewLocale } from "../lib/locale";
import { getNewDict } from "../lib/i18n";
import { CTA_TARGET } from "../lib/config";

const GLASS: React.CSSProperties = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(20,20,20,0.24) 55%)",
  backdropFilter: "blur(40px) saturate(200%)",
  WebkitBackdropFilter: "blur(40px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "999px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.08)",
};

const CTA_GLASS: React.CSSProperties = {
  background: "linear-gradient(180deg, rgba(212,255,43,0.28) 0%, rgba(212,255,43,0.15) 55%)",
  backdropFilter: "blur(40px) saturate(200%)",
  WebkitBackdropFilter: "blur(40px) saturate(200%)",
  border: "1px solid rgba(212,255,43,0.25)",
  borderRadius: "999px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(212,255,43,0.15)",
};

function MapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

export default function NewHeader() {
  const { locale, setLocale } = useNewLocale();
  const d = getNewDict(locale);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className={`new-header-bar ${scrolled ? "is-visible" : ""}`} aria-hidden />
      <div className="pointer-events-none" style={{ paddingTop: "20px", paddingBottom: "10px" }}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2">

        {/* Logo */}
        <Link href="/new" className="pointer-events-auto flex items-center" aria-label="Care Less home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Care Less" className="w-auto shrink-0" style={{ height: "36px" }} />
        </Link>

        {/* Right islands */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">

          {/* AI Map */}
          <Link
            href={locale === "es" ? "/ai-map?lang=es" : "/ai-map"}
            className="flex items-center justify-center gap-1.5 px-2.5 xs:px-4 py-2.5 font-sora text-[13px] text-fg/55 hover:text-fg/90 transition-colors duration-200 min-h-[44px]"
            style={GLASS}
            aria-label="AI Map"
          >
            <MapIcon />
            <span className="hidden xs:inline">{d.header.aiMapLabel}</span>
          </Link>

          {/* EN / ES switcher */}
          <div className="flex items-center gap-0.5 p-1" style={GLASS}>
            <button
              onClick={() => setLocale("en")}
              className={`min-w-[34px] xs:min-w-[38px] min-h-[32px] px-2 xs:px-2.5 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
                locale === "en" ? "bg-accent text-bg" : "text-fg/45 hover:text-fg/75"
              }`}
              aria-pressed={locale === "en"}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLocale("es")}
              className={`min-w-[34px] xs:min-w-[38px] min-h-[32px] px-2 xs:px-2.5 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
                locale === "es" ? "bg-accent text-bg" : "text-fg/45 hover:text-fg/75"
              }`}
              aria-pressed={locale === "es"}
              aria-label="Cambiar a español"
            >
              ES
            </button>
          </div>

          {/* Primary CTA */}
          <a
            href={CTA_TARGET}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 xs:px-4 sm:px-5 py-2.5 font-sora text-[12px] xs:text-[13px] font-semibold text-fg hover:opacity-90 transition-all duration-200 whitespace-nowrap min-h-[44px]"
            style={CTA_GLASS}
          >
            {d.header.ctaLabel}
          </a>
        </div>
      </div>
      </div>
    </header>
  );
}
