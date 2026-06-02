"use client";

import { useEffect, useState } from "react";
import type { DirectPageDict } from "../lib/directi18n";
import { OFFER_DEADLINE_ISO, CHECKOUT_URL, PRICE_CURRENT, PRICE_ANCHOR } from "../lib/config";

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

function useCountdownDays() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const ms = new Date(OFFER_DEADLINE_ISO).getTime() - Date.now();
    setDays(Math.max(0, Math.ceil(ms / 86_400_000)));
  }, []);
  return days;
}

export default function DirectHero({ d }: { d: DirectPageDict }) {
  const daysLeft = useCountdownDays();

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "80svh", display: "flex", alignItems: "center" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 800px 480px at 50% 40%, rgba(212,255,43,0.04) 0%, transparent 65%)" }}
      />

      <div className="relative w-full max-w-[720px] mx-auto px-6 py-8 md:py-12 text-center">

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
          <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: "rgba(212,255,43,0.7)" }} />
          {d.hero.eyebrow}
        </div>

        {/* H1 */}
        <h1
          className="font-playfair font-normal text-fg"
          style={{ fontSize: "clamp(28px, 4.6vw, 58px)", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "clamp(16px, 2vw, 24px)" }}
        >
          {d.hero.headline}
        </h1>

        {/* Subheadline */}
        <p
          className="font-sora font-light text-fg/45 max-w-[58ch] mx-auto"
          style={{ fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.6, marginBottom: "clamp(24px, 3vw, 36px)" }}
        >
          {d.hero.subheadline}
        </p>

        {/* Price chip + countdown */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
          <span
            className="font-numeral"
            style={{
              fontSize: "13px",
              color: "rgba(212,255,43,0.75)",
              border: "1px solid rgba(212,255,43,0.22)",
              borderRadius: "999px",
              padding: "5px 14px",
            }}
          >
            <span style={{ fontWeight: 700 }}>{PRICE_CURRENT}</span>
            <span style={{ color: "rgba(212,255,43,0.4)", textDecoration: "line-through", marginLeft: "8px" }}>{PRICE_ANCHOR}</span>
          </span>
          {daysLeft !== null && daysLeft > 0 && (
            <span
              className="font-label"
              style={{
                fontSize: "10px",
                letterSpacing: "1.5px",
                color: "rgba(212,255,43,0.48)",
                border: "1px solid rgba(212,255,43,0.13)",
                borderRadius: "999px",
                padding: "5px 12px",
              }}
            >
              {d.hero.daysLeft(daysLeft)} · {d.hero.offerCloses}
            </span>
          )}
        </div>

        {/* Primary CTA → CHECKOUT_URL */}
        <a
          href={CHECKOUT_URL}
          data-primary-cta
          className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
          style={{ fontSize: "15px", padding: "18px 40px", minHeight: "60px", letterSpacing: "-0.01em" }}
          onClick={() => track("direct_cta_book", { location: "hero" })}
        >
          {d.hero.cta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
        </a>

        {/* Guarantee micro-line */}
        <p className="font-sora font-light text-fg/25 mt-4" style={{ fontSize: "12px" }}>
          10× guarantee: find €10k+/yr or pay nothing.
        </p>

        <div data-hero-sentinel aria-hidden="true" />
      </div>
    </section>
  );
}
