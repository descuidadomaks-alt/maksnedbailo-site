"use client";

import Link from "next/link";
import type { NewPageDict } from "../lib/i18n";
import { SCORE_TARGET } from "../lib/config";
import { KlarnaWordmark, IkeaWordmark, OctopusWordmark } from "../components/BrandWordmarks";

/**
 * Section 6 — PROOF (capability): "Real systems, live now".
 * 3 live case cards, each with a small agent-UI mock (chat reply / booking
 * confirmation / voice waveform) so proof is visual, not text-only. Card
 * layout ported from app/ai-map/sections/DirectProof.tsx. Each visual sits
 * in a fixed-height slot so the title/desc rows line up across cards
 * regardless of which mock renders.
 *
 * Trust-proof (video testimonials) now lives in its own Testimonials
 * section — see ../sections/Testimonials.tsx.
 *
 * TODO: swap these illustrative UI mocks for real screen recordings /
 * screenshots from live client systems once the first founding clients
 * are onboarded.
 */

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

/** Visual mock #1 — WhatsApp-style chat thread, 9-second reply (Amira). */
function ChatMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="px-3 py-2 flex items-center gap-2 border-b border-white/[0.05]">
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgb(74,222,128)" }} />
        <span className="font-label text-fg/35" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>WHATSAPP · AMIRA</span>
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1 justify-center">
        <div className="self-start max-w-[82%] rounded-lg rounded-bl-sm px-2.5 py-1.5" style={{ background: "rgba(255,255,255,0.05)" }}>
          <p className="font-sora text-fg/55" style={{ fontSize: "11px", lineHeight: 1.4 }}>
            Hi, do you have availability for a consultation this week?
          </p>
        </div>
        <div className="self-end max-w-[82%] rounded-lg rounded-br-sm px-2.5 py-1.5" style={{ background: "rgba(212,255,43,0.1)" }}>
          <p className="font-sora text-fg/75" style={{ fontSize: "11px", lineHeight: 1.4 }}>
            Yes! I have Tuesday 2pm or Thursday 10am — which works better for you?
          </p>
        </div>
        <span className="font-label text-accent/55 self-end" style={{ fontSize: "9px", letterSpacing: "1px" }}>
          replied in 9s
        </span>
      </div>
    </div>
  );
}

/** Visual mock #2 — booking confirmation card (Elena Hotel & SPA). */
function BookingMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
        <span className="font-label text-fg/35" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>BOOKING CONFIRMED</span>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgb(74,222,128)" }} />
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1 justify-center">
        <p className="font-numeral text-fg/72 font-semibold" style={{ fontSize: "12.5px" }}>Deluxe Spa Room · 2 nights</p>
        <p className="font-sora text-fg/38" style={{ fontSize: "11px" }}>Check-in Fri 14 — Check-out Sun 16</p>
        <div className="flex items-center justify-between mt-1.5 pt-1.5" style={{ borderTop: "1px dashed rgba(255,255,255,0.08)" }}>
          <span className="font-sora text-fg/28" style={{ fontSize: "10px" }}>Confirmed via WhatsApp</span>
          <span className="font-numeral font-bold text-accent" style={{ fontSize: "12px" }}>#EH-2291</span>
        </div>
      </div>
    </div>
  );
}

/** Visual mock #3 — live voice agent waveform (Voice AI on Site). */
const WAVEFORM_BARS = [35, 60, 28, 80, 50, 95, 42, 70, 30, 55, 88, 46, 28, 62, 92, 38, 52, 72, 40, 26];

function VoiceMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-white/[0.06] p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-label text-fg/35" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>VOICE AGENT · LIVE</span>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: "rgb(74,222,128)" }} />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2.5">
        <div className="flex items-end gap-[2px]" style={{ height: "36px" }} aria-hidden>
          {WAVEFORM_BARS.map((h, i) => (
            <span
              key={i}
              style={{
                width: "3px",
                height: `${h}%`,
                background: i % 3 === 0 ? "rgba(212,255,43,0.55)" : "rgba(240,236,230,0.16)",
                borderRadius: "2px",
              }}
            />
          ))}
        </div>
        <p className="font-sora font-light italic text-fg/35" style={{ fontSize: "11px", lineHeight: 1.4 }}>
          &ldquo;Sure — let me check our availability for you.&rdquo;
        </p>
      </div>
    </div>
  );
}

const CASE_VISUALS = [ChatMock, BookingMock, VoiceMock];

const INDUSTRY_WORDMARKS = [KlarnaWordmark, IkeaWordmark, OctopusWordmark];

export default function ProofSection({ d }: { d: NewPageDict }) {
  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      {/* Soft section gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 800px 480px at 88% 0%, rgba(212,255,43,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── 6a: Real systems, live now ── */}
        <div className="max-w-2xl mb-12">
          <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.proof.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}>
            {d.proof.headline}
          </h2>
          <p data-reveal className="font-sora font-light text-fg/35" style={{ fontSize: "14px" }}>
            {d.proof.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch mb-8">
          {d.proof.cases.map((c, i) => {
            const Visual = CASE_VISUALS[i];
            return (
              <Link
                key={i}
                id={c.href.startsWith("#") ? c.href.slice(1) : undefined}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-reveal={`d${i}`}
                className="group h-full rounded-2xl border border-white/[0.05] bg-white/[0.012] p-5 flex flex-col gap-4 hover:border-white/[0.1] hover:bg-white/[0.022] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300"
                style={{ minHeight: "350px" }}
              >
                {/* Fixed-height slot — every mock stretches to fill it (h-full),
                    so all three previews render at exactly the same size */}
                <div className="shrink-0" style={{ height: "171px" }}>
                  {Visual && <Visual />}
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-playfair font-normal text-fg/75" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.3 }}>
                      {c.name}
                    </h3>
                    <div className="shrink-0 flex items-center gap-2 mt-0.5">
                      <div className="live-badge-pulse flex items-center gap-1" style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "999px", padding: "2px 7px" }}>
                        <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "rgb(74,222,128)" }} />
                        <span className="font-sora font-semibold" style={{ fontSize: "8px", letterSpacing: "1.5px", color: "rgba(74,222,128,0.75)" }}>{d.proof.liveBadge}</span>
                      </div>
                      <span className="text-fg/20 group-hover:text-fg/40 transition-colors duration-200"><ArrowIcon /></span>
                    </div>
                  </div>
                  <p className="font-sora font-light text-fg/38 leading-[1.65]" style={{ fontSize: "13px" }}>{c.desc}</p>
                  <span className="font-sora text-fg/20 mt-auto" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>{c.tag}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── 6b: Industry strip — same pattern proven at scale ── */}
        <div className="mb-12">
          <p data-reveal className="font-label text-fg/22 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.proof.industryLabel}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            {d.proof.industry.map((item, i) => {
              const Wordmark = INDUSTRY_WORDMARKS[i];
              return (
                <div
                  key={i}
                  data-reveal={`d${i}`}
                  className="h-full rounded-2xl border border-white/[0.05] bg-white/[0.012] p-5 flex flex-col gap-3"
                >
                  {Wordmark && <Wordmark className="h-5 w-auto self-start" />}
                  <p className="font-sora font-light text-fg/45 leading-[1.65] flex-1" style={{ fontSize: "13px" }}>
                    {item.desc}
                  </p>
                  <span className="font-sora text-fg/20 mt-auto" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>
                    {item.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA — low-friction, routes to the Bottleneck Score */}
        <div data-reveal className="text-center">
          <Link
            href={SCORE_TARGET}
            className="group inline-flex items-center gap-1.5 font-sora font-light text-fg/45 transition-colors duration-200 hover:text-accent"
            style={{ fontSize: "13px" }}
          >
            {d.proof.ctaLabel}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
