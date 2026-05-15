"use client";

import { useEffect } from "react";
import type { ProspectData } from "../data";
import HeroArrow from "./HeroArrow";

declare global {
  interface Window {
    __connectoOpenWidget?: () => void;
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

export default function SectionHero({ data }: { data: ProspectData }) {
  const m = data.metrics;

  // Auto-open widget after delay
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const t = setTimeout(() => {
      window.__connectoOpenWidget?.();
    }, mobile ? 8000 : 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      data-hero
      className="relative flex items-center min-h-[92svh] overflow-hidden"
      style={{ paddingTop: "56px" }}
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 520px at 50% 42%, rgba(212,255,43,0.05) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[820px] mx-auto px-6 py-24 w-full text-center">

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
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
            style={{ opacity: 0.7 }}
          />
          Live Demo · {data.businessName}
        </div>

        {/* H1 */}
        <h1
          className="font-playfair font-normal text-fg"
          style={{
            fontSize: "clamp(30px, 4.8vw, 64px)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            marginBottom: "clamp(20px, 2.5vw, 28px)",
          }}
        >
          {data.ownerFirstName}, We Reply to{" "}
          <em className="not-italic text-accent">{data.businessName}</em>{" "}
          Leads in {m.responseTimeUs}.{" "}
          <br className="hidden md:block" />
          Your Competitors Take {m.responseTimeThem}.
        </h1>

        {/* Subhead */}
        <p
          className="font-sora font-light text-fg/50 max-w-[580px] mx-auto"
          style={{
            fontSize: "clamp(15px, 1.4vw, 17px)",
            lineHeight: 1.75,
            marginBottom: "clamp(36px, 5vw, 52px)",
          }}
        >
          73% of customers buy from the first responder.{" "}
          <span className="text-fg/80 font-normal">{data.agentName}</span> goes
          live on your website in 48 hours — WhatsApp + Instagram added once
          Meta approves. Try her live{" "}
          <span className="hidden md:inline">to the right</span>
          <span className="md:hidden">below</span>.
        </p>

        {/* Single CTA */}
        {data.slotExpired ? (
          <span
            className="font-sora text-fg/30 border border-white/10 rounded-xl px-8 py-4 inline-block"
            style={{ fontSize: "13px" }}
          >
            This live demo ended — viewing as case study
          </span>
        ) : (
          <a
            href={data.ctaCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
            style={{
              fontSize: "15px",
              padding: "18px 40px",
              minHeight: "60px",
              letterSpacing: "-0.01em",
            }}
            onClick={() =>
              window.plausible?.("cta_booked", { props: { slug: data.slug, location: "hero" } })
            }
          >
            Book Free 30-Min Setup Call
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
              →
            </span>
          </a>
        )}
      </div>

      {/* Animated pointer → widget */}
      {!data.slotExpired && <HeroArrow />}
    </section>
  );
}
