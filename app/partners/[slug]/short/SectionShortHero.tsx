"use client";

import { useEffect, useState } from "react";
import type { ShortPartnerConfig } from "@/content/partners/index";
import type { ShortPageDict } from "../lib/i18n";

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
}: {
  config: ShortPartnerConfig;
  d: ShortPageDict;
}) {
  const daysLeft = useCountdownDays(config.offerDeadline);
  const lines = d.hero.headline.split("\n"); // support optional line-break in headline

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "88svh", display: "flex", alignItems: "center" }}>
      {/* Ambient glow — clipped by overflow-hidden */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 800px 480px at 50% 40%, rgba(212,255,43,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="relative w-full max-w-[700px] mx-auto px-6 py-10 md:py-16 text-center">

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2.5 mb-9"
          style={{
            fontFamily: "var(--font-sora)",
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
          {d.hero.eyebrow(config.partnerName)}
        </div>

        {/* H1 — one focal point per viewport */}
        <h1
          className="font-playfair font-normal text-fg"
          style={{
            fontSize: "clamp(30px, 4.8vw, 60px)",
            lineHeight: 1.08,
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
          className="font-playfair text-fg/45 max-w-[58ch] mx-auto"
          style={{
            fontSize: "clamp(16px, 1.7vw, 21px)",
            lineHeight: 1.45,
            fontStyle: "italic",
            letterSpacing: "-0.012em",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        >
          {d.hero.subheadline(config.partnerName)}
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
            className="font-playfair text-fg/50 leading-[1.7]"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", fontStyle: "italic", letterSpacing: "-0.01em" }}
          >
            &ldquo;{config.partnerQuote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0"
              style={{ background: "rgba(212,255,43,0.04)" }}
            >
              {config.partnerPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={config.partnerPhoto} alt={config.partnerName} className="w-full h-full rounded-full object-cover" />
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,230,0.2)" strokeWidth="1.5" aria-hidden>
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              )}
            </div>
            <span className="font-sora text-fg/30" style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              {config.partnerName}
              {config.partnerTitle && <span className="text-fg/18"> · {config.partnerTitle}</span>}
            </span>
          </figcaption>
        </figure>

      </div>
    </section>
  );
}
