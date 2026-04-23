"use client";

import { useEffect } from "react";
import type { ProspectData } from "../data";

declare global {
  interface Window {
    __connectoOpenWidget?: () => void;
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

const TOP = 92; // 28px bar + 64px nav

export default function SectionHero({ data }: { data: ProspectData }) {
  // Auto-open widget
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const delay = mobile ? 8000 : 4000;
    const t = setTimeout(() => {
      if (typeof window.__connectoOpenWidget === "function") {
        window.__connectoOpenWidget();
      } else {
        document.querySelectorAll("iframe").forEach((iframe) => {
          try {
            iframe.contentWindow?.postMessage({ type: "connecto:open" }, "*");
          } catch {
            console.log("[Careless AI] Widget auto-open: postMessage blocked");
          }
        });
      }
    }, delay);
    return () => clearTimeout(t);
  }, []);

  const expired = data.slotExpired;

  return (
    <section
      className="relative flex items-center min-h-[88svh]"
      style={{ paddingTop: `${TOP}px` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[320px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(212,255,43,0.07) 0%, transparent 70%)" }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16 w-full text-center">
        {expired && (
          <p className="inline-block font-sora text-[9px] uppercase tracking-[3px] text-accent/50 border border-accent/20 rounded-full px-3 py-1 mb-6">
            Live Demo · Case Study
          </p>
        )}

        <h1
          className="font-playfair font-normal leading-tight mb-5"
          style={{ fontSize: "clamp(28px, 3.8vw, 48px)" }}
        >
          {data.heroH1}
        </h1>

        <p className="font-sora font-light text-[15px] text-fg/50 max-w-[520px] mx-auto leading-relaxed mb-10">
          {data.heroSub}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {expired ? (
            <span className="font-sora text-[13px] text-fg/35 border border-white/10 rounded-lg px-6 py-3.5">
              This live demo ran Apr 23 – May 7, 2026 (case study below)
            </span>
          ) : (
            <a
              href="#connecto-widget-container"
              className="bg-accent text-bg font-semibold px-7 py-3.5 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200 w-full sm:w-auto text-center"
              onClick={() => window.plausible?.("cta_widget", { props: { slug: data.slug } })}
            >
              Keep chatting with {data.agentName} ↓
            </a>
          )}
          <a
            href={data.ctaCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 text-fg/70 hover:border-white/30 hover:text-fg px-7 py-3.5 rounded-lg text-sm transition-all duration-200 w-full sm:w-auto text-center"
            onClick={() =>
              window.plausible?.("cta_booked", { props: { slug: data.slug, location: "hero" } })
            }
          >
            Book a 15-min call →
          </a>
        </div>
      </div>
    </section>
  );
}
