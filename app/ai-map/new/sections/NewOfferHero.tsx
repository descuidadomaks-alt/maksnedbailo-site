"use client";

import type { NewOfferCopy } from "../lib/copy";
import { CHECKOUT_URL } from "../../lib/config";

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

/**
 * Hero for /ai-map/new. Same visual shape as app/ai-map/sections/DirectHero
 * minus the countdown timer and price chip — the map is free, permanently,
 * so there's nothing to count down to.
 */
export default function NewOfferHero({ d }: { d: NewOfferCopy }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "80svh", display: "flex", alignItems: "center" }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 800px 480px at 50% 40%, rgba(212,255,43,0.04) 0%, transparent 65%)" }}
      />

      <div className="relative w-full max-w-[720px] mx-auto px-6 py-8 md:py-12 text-center">
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

        <h1
          className="font-playfair font-normal text-fg"
          style={{ fontSize: "clamp(28px, 4.6vw, 58px)", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "clamp(16px, 2vw, 24px)" }}
        >
          {d.hero.headlineStart}
          <span className="text-accent">{d.hero.headlineAccent}</span>
        </h1>

        <p
          className="font-sora font-light text-fg/55 max-w-[58ch] mx-auto"
          style={{ fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.6, marginBottom: "clamp(24px, 3vw, 36px)" }}
        >
          {d.hero.sub}
        </p>

        <a
          href={CHECKOUT_URL}
          data-primary-cta
          className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
          style={{ fontSize: "15px", padding: "18px 40px", minHeight: "60px", letterSpacing: "-0.01em" }}
          onClick={() => track("direct_cta_book", { location: "hero_v2" })}
        >
          {d.hero.cta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h13M12 5l7 7-7 7" /></svg></span>
        </a>

        <p className="font-sora font-light text-fg/55 mt-4" style={{ fontSize: "12px" }}>
          {d.hero.trustLine}
        </p>
      </div>
    </section>
  );
}
