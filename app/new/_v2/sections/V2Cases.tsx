"use client";

import Link from "next/link";
import type { V2Copy } from "../lib/copy";

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

/** Mock #1 — WhatsApp-style chat thread, fast reply (Sell tier). */
function ChatMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="px-3 py-2 flex items-center gap-2 border-b border-white/[0.05]">
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgb(74,222,128)" }} />
        <span className="font-label text-fg/55" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>WHATSAPP · AMIRA</span>
      </div>
      <div className="px-3 pt-3 pb-4 flex flex-col gap-1.5 flex-1 justify-end">
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

/** Mock #2 — booking confirmation card (Serve tier). */
function BookingMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="px-3 py-2 flex items-center justify-between border-b border-white/[0.05]">
        <span className="font-label text-fg/55" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>BOOKING CONFIRMED</span>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgb(74,222,128)" }} />
      </div>
      <div className="px-3 pt-3 pb-4 flex flex-col gap-2.5 flex-1 justify-end">
        <p className="font-numeral text-fg/72 font-semibold" style={{ fontSize: "12.5px" }}>Deluxe Spa Room · 2 nights</p>
        <p className="font-sora text-fg/62" style={{ fontSize: "11px" }}>Check-in Fri 14 — Check-out Sun 16</p>
        <div className="flex items-center justify-between pt-2.5" style={{ borderTop: "1px dashed rgba(255,255,255,0.08)" }}>
          <span className="font-sora text-fg/55" style={{ fontSize: "10px" }}>Confirmed via WhatsApp</span>
          <span className="font-numeral font-bold text-accent" style={{ fontSize: "12px" }}>#EH-2291</span>
        </div>
      </div>
    </div>
  );
}

/** Mock #3 — small ops dashboard, three live tiles (Operate tier). */
function DashboardMock() {
  const tiles = [
    { label: "Calls answered", value: "24/7" },
    { label: "Jobs booked", value: "+18" },
    { label: "Follow-ups sent", value: "42" },
  ];
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-white/[0.06] px-3 pt-3 pb-3" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-label text-fg/55" style={{ fontSize: "9px", letterSpacing: "1.5px" }}>OVERTIME OS · TODAY</span>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" style={{ background: "rgb(74,222,128)" }} />
      </div>
      <div className="flex-1 grid grid-cols-3 gap-2 items-end">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-lg px-2 py-2.5 flex flex-col gap-1" style={{ background: "rgba(255,255,255,0.03)" }}>
            <span className="font-numeral font-bold text-accent" style={{ fontSize: "15px" }}>{t.value}</span>
            <span className="font-sora text-fg/50 leading-[1.3]" style={{ fontSize: "9px" }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CASE_VISUALS = [ChatMock, BookingMock, DashboardMock];

/**
 * Section 4 — WORKING SYSTEMS. One case per tier (Sell / Serve / Operate),
 * replacing the old generic proof grid. Overtime OS (Operate) is our own
 * product, described as a system rather than a named client engagement —
 * never implied to be a third-party customer story.
 */
export default function V2Cases({ d }: { d: V2Copy }) {
  return (
    <section id="systems" className="section-divider relative overflow-hidden py-16 md:py-24" style={{ background: "var(--bg)" }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 800px 480px at 88% 0%, rgba(212,255,43,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12 mx-auto text-center">
          <p data-reveal className="font-label text-fg/55 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.cases.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mb-4 mx-auto" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}>
            {d.cases.headline}
          </h2>
          <p data-reveal className="font-sora font-light text-fg/55" style={{ fontSize: "14px" }}>
            {d.cases.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {d.cases.items.map((c, i) => {
            const Visual = CASE_VISUALS[i];
            return (
              <Link
                key={c.name}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-reveal={`d${i}`}
                className="group h-full rounded-2xl border border-white/[0.05] bg-white/[0.012] p-5 flex flex-col gap-4 hover:border-white/[0.1] hover:bg-white/[0.022] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300"
                style={{ minHeight: "350px" }}
              >
                <div className="flex items-center justify-between">
                  {/* Neutral, not accent. The accent is the CTA colour and
                      should not be spent on a taxonomy label. */}
                  <span
                    className="font-label"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "1.8px",
                      textTransform: "uppercase",
                      color: "rgba(240,236,230,0.5)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "999px",
                      padding: "3px 9px",
                    }}
                  >
                    {c.tier}
                  </span>
                  <div className="live-badge-pulse flex items-center gap-1" style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "999px", padding: "2px 7px" }}>
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "rgb(74,222,128)" }} />
                    <span className="font-sora font-semibold" style={{ fontSize: "8px", letterSpacing: "1.5px", color: "rgba(74,222,128,0.75)" }}>{d.cases.liveBadge}</span>
                  </div>
                </div>

                <div className="shrink-0" style={{ height: "150px" }}>
                  {Visual && <Visual />}
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    {/* Full-strength white and a size up — the case name is
                        the thing to read first in the card. */}
                    <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.25 }}>
                      {c.name}
                    </h3>
                    <span className="shrink-0 text-fg/55 group-hover:text-fg/62 transition-colors duration-200 mt-0.5">
                      <ArrowIcon />
                    </span>
                  </div>
                  <p className="font-sora font-light text-fg/62 leading-[1.65]" style={{ fontSize: "13px" }}>{c.desc}</p>
                  <span className="font-sora text-fg/55 mt-auto" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>{c.tag}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
