"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { PartnerData } from "@/content/partners/index";
import { OFFER_DEADLINE_ISO } from "../lib/config";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

function useCountdownDays() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const deadline = new Date(OFFER_DEADLINE_ISO).getTime();
      const now = Date.now();
      const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      setDays(Math.max(0, diff));
    };
    calc();
  }, []);

  return days;
}

export default function SectionHero({ data }: { data: PartnerData }) {
  const lines = data.hero.headline.split("\n");
  const daysLeft = useCountdownDays();

  return (
    <section
      className="relative flex items-center min-h-[92svh] overflow-hidden"
      style={{ paddingTop: "56px" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 520px at 50% 42%, rgba(212,255,43,0.045) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[860px] mx-auto px-6 py-20 w-full text-center">

        {/* Eyebrow pill */}
        <div
          className="inline-flex items-center gap-2.5 mb-10"
          style={{
            fontFamily: "var(--font-sora)",
            fontSize: "10px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(212,255,43,0.6)",
            border: "1px solid rgba(212,255,43,0.18)",
            borderRadius: "999px",
            padding: "6px 16px",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ opacity: 0.7 }} />
          {data.hero.eyebrow}
        </div>

        {/* H1 */}
        <h1
          className="font-playfair font-normal text-fg"
          style={{
            fontSize: "clamp(32px, 5vw, 68px)",
            lineHeight: 1.06,
            letterSpacing: "-0.027em",
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
          className="font-playfair text-fg/50"
          style={{
            fontSize: "clamp(17px, 1.8vw, 22px)",
            lineHeight: 1.4,
            fontStyle: "italic",
            letterSpacing: "-0.015em",
            marginBottom: "clamp(24px, 3vw, 36px)",
          }}
        >
          {data.hero.subheadline}
        </p>

        {/* Subtext */}
        <p
          className="font-sora font-light text-fg/45 max-w-[600px] mx-auto"
          style={{
            fontSize: "clamp(14px, 1.3vw, 16px)",
            lineHeight: 1.8,
            marginBottom: data.hero.scarcity ? "clamp(16px, 2vw, 24px)" : "clamp(36px, 5vw, 52px)",
          }}
        >
          {data.hero.subtext}
        </p>

        {/* Scarcity line */}
        {data.hero.scarcity && (
          <p
            className="font-sora font-light text-fg/35 max-w-[480px] mx-auto"
            style={{
              fontSize: "13px",
              fontStyle: "italic",
              lineHeight: 1.6,
              marginBottom: "clamp(16px, 2.5vw, 28px)",
            }}
          >
            {data.hero.scarcity}
          </p>
        )}

        {/* Countdown chip */}
        {daysLeft !== null && daysLeft > 0 && (
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-2 font-sora"
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: "rgba(212,255,43,0.55)",
                border: "1px solid rgba(212,255,43,0.14)",
                borderRadius: "999px",
                padding: "4px 12px",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "rgba(212,255,43,0.6)" }}
              />
              {daysLeft} {daysLeft === 1 ? "day" : "days"} left · offer closes June 30
            </div>
          </div>
        )}

        {/* Primary CTA */}
        <a
          href={data.booking.schedulerUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="book"
          className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
          style={{ fontSize: "15px", padding: "18px 40px", minHeight: "60px", letterSpacing: "-0.01em" }}
          onClick={() =>
            window.plausible?.("cta_book_click", { props: { slug: data.slug, location: "hero" } })
          }
        >
          {data.hero.cta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
        </a>

        {/* Hero bottom sentinel — StickyMobileCTA watches this */}
        <div data-hero-sentinel aria-hidden="true" />

        {/* Partner quote card */}
        <div
          data-reveal
          className="mt-16 mx-auto max-w-[480px] rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 text-left"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.35)" }}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className="shrink-0 w-11 h-11 rounded-full border border-white/10 overflow-hidden flex items-center justify-center"
              style={{ background: "rgba(212,255,43,0.04)" }}
            >
              {data.partner.photo ? (
                <Image
                  src={data.partner.photo}
                  alt={data.partner.name}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,230,0.2)" strokeWidth="1.5" aria-hidden>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              )}
            </div>

            <div>
              <p
                className="font-sora font-light text-fg/60 leading-relaxed mb-3"
                style={{ fontSize: "13px", fontStyle: "italic" }}
              >
                &ldquo;{data.partner.quote}&rdquo;
              </p>
              <p className="font-sora text-fg/35" style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                {data.partner.name}
                {data.partner.role && (
                  <span className="text-fg/20"> · {data.partner.role}</span>
                )}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
