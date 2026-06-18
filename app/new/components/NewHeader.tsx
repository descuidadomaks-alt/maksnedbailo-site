"use client";

/**
 * Shared site header — ticker + collapsible glass header.
 * Logo, Blog link, AI Map link, EN/ES toggle, primary CTA.
 * Visual language ported from NavNew.tsx / DirectLocaleWrapper.tsx (frosted glass).
 *
 * Reused across /, /new, /ai-map, /blog and the city pages — each of which
 * runs its own locale system. By default this reads NewLocaleProvider
 * (useNewLocale/useCtaTarget), but callers outside that provider pass
 * `locale`/`setLocale`/`ctaHref`/`ctaLabel` explicitly so the shared chrome
 * stays in sync with that page's own locale state.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useNewLocale, type NewLocale } from "../lib/locale";
import { getNewDict } from "../lib/i18n";
import GlobalTicker from "./GlobalTicker";

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

// Ticker bar height (see GlobalTicker) — header rests just below it until the
// page scrolls past, then collapses up to a fixed 8px gap (NavNew pattern).
const BAR_HEIGHT = 28;

function MapIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden>
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

interface NewHeaderProps {
  /** Locale driving labels + the EN/ES toggle. Defaults to NewLocaleProvider. */
  locale?: NewLocale;
  /** Called when the user picks EN/ES. Defaults to NewLocaleProvider's setter. */
  setLocale?: (l: NewLocale) => void;
  /** Primary CTA destination. Defaults to /ai-map (locale-aware). */
  ctaHref?: string;
  /** Primary CTA label. Defaults to the locale dict's header.ctaLabel. */
  ctaLabel?: string;
  /** Set false to hide the GlobalTicker (header still renders). */
  showTicker?: boolean;
}

export default function NewHeader({ locale: localeProp, setLocale: setLocaleProp, ctaHref, ctaLabel, showTicker = true }: NewHeaderProps = {}) {
  const newLocaleCtx = useNewLocale();
  const locale = localeProp ?? newLocaleCtx.locale;
  const setLocale = setLocaleProp ?? newLocaleCtx.setLocale;
  const d = getNewDict(locale);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > BAR_HEIGHT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topOffset = scrolled ? 8 : BAR_HEIGHT + 8;
  const logoHref = locale === "es" ? "/?lang=es" : "/";
  const aiMapHref = locale === "es" ? "/ai-map?lang=es" : "/ai-map";
  const finalCtaHref = ctaHref ?? aiMapHref;
  const finalCtaLabel = ctaLabel ?? d.header.ctaLabel;

  return (
    <>
      {showTicker && <GlobalTicker locale={locale} />}

      <header className="fixed left-0 right-0 z-50" style={{ top: `${topOffset}px`, transition: "top 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <div className="pointer-events-none" style={{ paddingBottom: "10px" }}>
        <div className="max-w-6xl mx-auto px-3 sm:px-4 flex items-center justify-between gap-2">

          {/* Logo */}
          <Link href={logoHref} className="pointer-events-auto flex items-center" aria-label="Care Less home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Care Less" width={36} height={36} className="w-auto shrink-0" style={{ height: "36px" }} />
          </Link>

          {/* Right islands */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">

            {/* Blog */}
            <Link
              href="/blog"
              className="flex items-center justify-center gap-1.5 px-2.5 xs:px-4 py-2.5 font-sora text-[13px] text-fg/55 hover:text-fg/90 transition-colors duration-200 min-h-[44px]"
              style={GLASS}
              aria-label="Blog"
            >
              <BookIcon />
              <span className="hidden xs:inline">{d.header.blogLabel}</span>
            </Link>

            {/* AI Map */}
            <Link
              href={aiMapHref}
              className="flex items-center justify-center gap-1.5 px-2.5 xs:px-4 py-2.5 font-sora text-[13px] text-fg/55 hover:text-fg/90 transition-colors duration-200 min-h-[44px]"
              style={GLASS}
              aria-label="AI Map"
            >
              <MapIcon className="text-accent" />
              <span className="hidden xs:inline">{d.header.aiMapLabel}</span>
            </Link>

            {/* EN / ES switcher */}
            <div className="flex items-center gap-0.5 p-1" style={GLASS}>
              <button
                onClick={() => setLocale("en")}
                className={`min-w-[34px] xs:min-w-[38px] min-h-[32px] px-2 xs:px-2.5 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
                  locale === "en" ? "bg-accent text-bg" : "text-fg/62 hover:text-fg/75"
                }`}
                aria-pressed={locale === "en"}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLocale("es")}
                className={`min-w-[34px] xs:min-w-[38px] min-h-[32px] px-2 xs:px-2.5 py-1.5 rounded-full text-[12px] font-sora font-semibold transition-all duration-200 ${
                  locale === "es" ? "bg-accent text-bg" : "text-fg/62 hover:text-fg/75"
                }`}
                aria-pressed={locale === "es"}
                aria-label="Cambiar a español"
              >
                ES
              </button>
            </div>

            {/* Primary CTA */}
            <Link
              href={finalCtaHref}
              className="flex items-center px-3 xs:px-4 sm:px-5 py-2.5 font-sora text-[12px] xs:text-[13px] font-semibold text-fg hover:opacity-90 transition-all duration-200 whitespace-nowrap min-h-[44px]"
              style={CTA_GLASS}
            >
              {finalCtaLabel}
            </Link>
          </div>
        </div>
        </div>
      </header>
    </>
  );
}
