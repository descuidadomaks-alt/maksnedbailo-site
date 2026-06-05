"use client";

/**
 * /ai-map header — same visual design as NavNew on /new, but:
 *   - Language switcher has EN / ES / УК (three options)
 *   - "Free Audit" CTA links to the main site booking
 */

import { type ReactNode } from "react";
import Link from "next/link";
import { DirectLocaleProvider, useDirectLocale, type DirectLocale } from "./locale";
import { content } from "@/lib/content";

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

function LangToggle() {
  const { locale, setLocale } = useDirectLocale();
  const btn = (l: DirectLocale, label: string, ariaLabel: string) => (
    <button
      key={l}
      onClick={() => setLocale(l)}
      aria-pressed={locale === l}
      className={`min-w-[34px] xs:min-w-[38px] min-h-[32px] px-2 xs:px-2.5 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
        locale === l ? "bg-accent text-bg" : "text-fg/45 hover:text-fg/75"
      }`}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
  return (
    {/* EN/ES only — matches homepage header; no УК toggle */}
    <div className="flex items-center gap-0.5 p-1" style={GLASS}>
      {btn("en", "EN", "Switch to English")}
      {btn("es", "ES", "Cambiar a Español")}
    </div>
  );
}

function MapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

const BLOG_LABEL: Record<DirectLocale, string> = { en: "Blog", es: "Blog", uk: "Блог" };
const AIMAP_LABEL: Record<DirectLocale, string> = { en: "AI Map", es: "Mapa IA", uk: "AI Карта" };
const CTA_LABEL: Record<DirectLocale, string> = { en: "Book a Call", es: "Auditoría Gratis", uk: "Безкоштовна консультація" };

function DirectHeader() {
  const { locale } = useDirectLocale();
  return (
    <header className="fixed left-0 right-0 z-50 pointer-events-none" style={{ top: "36px" }}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="pointer-events-auto flex items-center" aria-label="care less AI automation home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="care less AI automation" className="w-auto shrink-0" style={{ height: "36px" }} />
        </Link>

        {/* Right islands */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {/* Blog */}
          <Link href="/blog" className="flex items-center justify-center gap-1.5 px-2.5 xs:px-4 py-2.5 font-sora text-[13px] text-fg/55 hover:text-fg/90 transition-colors duration-200 min-h-[44px]" style={GLASS} aria-label="Blog">
            <BookIcon />
            <span className="hidden xs:inline">{BLOG_LABEL[locale]}</span>
          </Link>
          {/* AI Map — active/highlighted since we're on /ai-map */}
          <Link href="/ai-map" className="flex items-center justify-center gap-1.5 px-2.5 xs:px-4 py-2.5 font-sora text-[13px] text-accent/80 hover:text-accent transition-colors duration-200 min-h-[44px]" style={{ ...GLASS, borderColor: "rgba(212,255,43,0.2)" }} aria-current="page">
            <MapIcon />
            <span className="hidden xs:inline">{AIMAP_LABEL[locale]}</span>
          </Link>
          {/* EN / ES / УК switcher */}
          <LangToggle />
          {/* Free Audit / Book a Call CTA */}
          <a href={content.nav.ctaLink} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 xs:px-4 sm:px-5 py-2.5 font-sora text-[12px] xs:text-[13px] font-semibold text-fg hover:opacity-90 transition-all duration-200 whitespace-nowrap min-h-[44px]" style={CTA_GLASS}>
            {CTA_LABEL[locale]}
          </a>
        </div>
      </div>
    </header>
  );
}

export default function DirectLocaleWrapper({
  children,
  defaultLocale,
}: {
  children: ReactNode;
  defaultLocale: DirectLocale;
}) {
  return (
    <DirectLocaleProvider defaultLocale={defaultLocale}>
      <DirectHeader />
      {/* top padding so fixed header doesn't overlap content */}
      <div style={{ paddingTop: "80px" }}>
        {children}
      </div>
    </DirectLocaleProvider>
  );
}
