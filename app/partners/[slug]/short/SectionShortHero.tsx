"use client";

import { useEffect, useState } from "react";
import type { ShortPartnerConfig } from "@/content/partners/index";
import type { ShortPageDict } from "../lib/i18n";
import { usePartnerLocale } from "../lib/partner-locale";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    clarity?: (method: string, key: string, value?: string) => void;
  }
}

function track(event: string, props: Record<string, string>) {
  window.plausible?.(event, { props });
  window.clarity?.("set", event, Object.values(props).join(" | "));
}

function useCountdownDays(deadline: string) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const ms = new Date(deadline + "T23:59:59").getTime() - Date.now();
    setDays(Math.max(0, Math.ceil(ms / 86_400_000)));
  }, [deadline]);
  return days;
}

export default function SectionShortHero({
  config,
  d,
  partnerNameForSentences,
  partnerNameAccusative,
  partnerNameDisplay,
}: {
  config: ShortPartnerConfig;
  d: ShortPageDict;
  /** Genitive form — for "from {name}'s circle" (із кола {name}) */
  partnerNameForSentences?: string;
  /** Accusative form — for "reserved through {name}" (через {name}) */
  partnerNameAccusative?: string;
  /** Nominative/display form for bylines and captions */
  partnerNameDisplay?: string;
}) {
  const { locale } = usePartnerLocale();
  const daysLeft = useCountdownDays(config.offerDeadline);
  const lines = d.hero.headline.split("\n");
  const pSentence = partnerNameForSentences ?? config.partnerName;
  const pAcc      = partnerNameAccusative ?? partnerNameForSentences ?? config.partnerName;
  const pDisplay  = partnerNameDisplay ?? config.partnerName;

  // Per-partner locale text: config field takes priority over the shared dict override
  // (the shared dict override is Vlad-specific and must not bleed onto other partners)
  const quoteText =
    (locale === "uk" ? config.partnerQuoteUk : null) ??
    d.hero.partnerQuoteOverride ??
    config.partnerQuote;
  const roleText =
    (locale === "uk" ? config.partnerTitleUk : null) ??
    d.hero.partnerRoleOverride ??
    config.partnerTitle;

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "80svh", display: "flex", alignItems: "center" }}>
      {/* Ambient glow — clipped by overflow-hidden */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 800px 480px at 50% 40%, rgba(212,255,43,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="relative w-full max-w-[700px] mx-auto px-6 py-8 md:py-12 text-center">

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2.5 mb-9"
          style={{
            fontFamily: "var(--font-roboto-mono)",
            fontSize: "9.5px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "rgba(212,255,43,0.55)",
            border: "1px solid rgba(212,255,43,0.16)",
            borderRadius: "999px",
            padding: "5px 14px",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{ background: "rgba(212,255,43,0.7)" }}
          />
          {d.hero.eyebrow(pSentence)}
        </div>

        {/* H1 — one focal point per viewport */}
        <h1
          className="font-playfair font-normal text-fg"
          style={{
            fontSize: "clamp(30px, 4.8vw, 60px)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          {lines[0]}
          {lines[1] && (
            <>
              <br />
              <em className="not-italic text-fg/60">{lines[1]}</em>
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p
          className="font-sora font-light text-fg/45 max-w-[58ch] mx-auto"
          style={{
            fontSize: "clamp(16px, 1.7vw, 20px)",
            lineHeight: 1.55,
            fontStyle: "italic",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        >
          {d.hero.subheadline(pAcc)}
        </p>

        {/* Countdown chip */}
        {daysLeft !== null && daysLeft > 0 && (
          <div className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 font-sora"
              style={{
                fontSize: "11px",
                letterSpacing: "1.2px",
                color: "rgba(212,255,43,0.5)",
                border: "1px solid rgba(212,255,43,0.13)",
                borderRadius: "999px",
                padding: "4px 12px",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "rgba(212,255,43,0.55)" }}
              />
              {d.hero.daysLeft(daysLeft)} · {d.hero.offerCloses}
            </span>
          </div>
        )}

        {/* Primary CTA */}
        <a
          href={config.schedulerUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-primary-cta
          className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_56px_rgba(212,255,43,0.2)] active:scale-[0.98]"
          style={{ fontSize: "15px", padding: "17px 36px", minHeight: "58px", letterSpacing: "-0.01em" }}
          onClick={() => track("cta_book_click", { slug: config.slug, location: "hero_short" })}
        >
          {d.hero.cta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
        </a>

        {/* Hero sentinel for sticky CTA */}
        <div data-hero-sentinel aria-hidden="true" />

        {/* Partner quote — editorial pull-quote style */}
        <figure
          data-reveal
          className="mt-14 mx-auto max-w-[480px] text-left"
        >
          <blockquote
            className="font-sora font-light text-fg/50 leading-[1.7]"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontStyle: "italic" }}
          >
            &ldquo;{quoteText}&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0"
              style={{ background: "rgba(212,255,43,0.04)", flexShrink: 0 }}
            >
              {config.partnerPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={config.partnerPhoto}
                  alt={config.partnerName}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,230,0.2)" strokeWidth="1.5" aria-hidden>
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              )}
            </div>
            <span className="font-sora text-fg/30" style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {pDisplay}
              {roleText && (
                <span className="text-fg/18"> · {roleText}</span>
              )}
            </span>
          </figcaption>
        </figure>

      </div>
    </section>
  );
}
