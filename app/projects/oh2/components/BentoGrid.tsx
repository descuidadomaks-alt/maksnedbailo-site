"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Mockup } from "./Mockup";
import { ChatLoop } from "./ChatLoop";

/**
 * Section 5 — bento feature grid. Desktop: 3 clean rows, each one wide
 * (span-2) card + one thin card. Cards 1, 4 and 6 are span-2 (three span-2
 * cards keep the 3-column grid filling evenly into 3 rows — 1+1+1 thin
 * cards alongside them). Card 2 (Voice Agent) gets a dedicated visual
 * treatment to read as the hero feature of the grid.
 *
 * Every card shares ONE uniform min-height (set on the shared <Card>) so
 * rows lock to the same baseline instead of each card sizing to its own
 * content — combined with items-stretch, nothing in this section jumps
 * around as the animated cards (1 and 2) loop.
 */

function Card({
  title,
  body,
  dark = false,
  accent = false,
  tag,
  className = "",
  children,
}: {
  title: string;
  body?: string;
  dark?: boolean;
  accent?: boolean;
  tag?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`oh-card flex min-h-[340px] flex-col rounded-2xl border p-6 hover:-translate-y-1 hover:shadow-xl sm:min-h-[380px] sm:p-7 ${
        accent
          ? "border-2 border-[#ffe17c] bg-[#171e19] text-white"
          : dark
          ? "border-[#b7c6c2]/10 bg-[#171e19] text-white"
          : "border-[#171e19]/10 bg-[#f8f9fa] text-[#171e19]"
      } ${className}`}
    >
      <div>
        {tag && (
          <span className="mb-3 inline-block rounded-full bg-[#ffe17c] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#171e19]">
            {tag}
          </span>
        )}
        <h3 className={`oh-display ${accent ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
          {title}
        </h3>
        {body && (
          <p className={`mt-3 text-base ${dark || accent ? "text-white/75" : "text-[#171e19]/70"}`}>
            {body}
          </p>
        )}
      </div>
      {children && <div className="mt-6 flex flex-1 flex-col">{children}</div>}
    </div>
  );
}

const VOICE_STATES = ["Qualifying caller…", "Real job — booking…", "Booked Thursday 9:00 AM ✓"];

/** Zero-CLS status line: all 3 strings always mounted, stacked in one grid
 * cell (col-start-1 row-start-1), only opacity cross-fades — so the row's
 * height is locked to the tallest string from first paint and never moves
 * as the cycle advances. */
function VoiceStatusLine() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? 2 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % VOICE_STATES.length), 1700);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="grid">
      {VOICE_STATES.map((s, idx) => (
        <span
          key={s}
          className="col-start-1 row-start-1 text-sm font-bold text-[#ffe17c]"
          style={{
            opacity: idx === i ? 1 : 0,
            transition: "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export function BentoGrid() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="oh-display mb-10 max-w-2xl text-4xl text-[#171e19] sm:text-6xl">
          Everything that turns a lead into a booked job.
        </h2>

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {/* Row 1 — wide left: live chat. Right: voice agent (hero feature). */}
          <Card
            title="Instant lead response"
            body="Form, call, or text — answered in seconds, day or night. First responder wins. Now that's you."
            dark
            className="md:col-span-2"
          >
            <div className="mt-auto h-full rounded-xl bg-black/20 p-4">
              <ChatLoop />
            </div>
          </Card>

          <Card
            title="Voice agent that books"
            body="A real-sounding AI answers your phone, qualifies the caller, and books the job. It even tells a $20k roof from a tire-kicker."
            accent
            tag="Core feature"
          >
            <div className="mt-auto">
              <div className="flex h-12 items-end gap-1.5">
                {[0.5, 0.9, 0.4, 1, 0.7, 0.95, 0.45, 0.8, 0.55, 1, 0.6, 0.85, 0.4].map((h, i) => (
                  <span
                    key={i}
                    className="oh-eq-bar w-1.5 flex-1 rounded-full bg-[#ffe17c]"
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
              <div className="mt-3">
                <VoiceStatusLine />
              </div>
              <p className="mt-1.5 text-xs font-medium text-white/40">Tire-kicker → filtered</p>
            </div>
          </Card>

          {/* Row 2 — wide right: calendar mockup. */}
          <Card
            title="Follow-up on autopilot"
            body="Every lead chased with 3–5 texts until they book or say no. Nothing slips."
          >
            <div className="mt-auto flex items-center gap-2">
              {["Text 1", "Text 2", "Text 3"].map((t, i) => (
                <span
                  key={t}
                  className="flex-1 rounded-lg border border-[#171e19]/10 bg-white px-3 py-2.5 text-center text-xs font-bold text-[#171e19]/60"
                >
                  {t}
                  <span className="mt-1 block text-[#ffe17c]">{"●".repeat(i + 1)}</span>
                </span>
              ))}
            </div>
          </Card>

          <Card title="Your calendar, filled" className="md:col-span-2">
            <div className="mt-auto">
              <Mockup />
            </div>
          </Card>

          {/* Row 3 — wide left: all done for you. Right: kill no-shows. */}
          <Card
            title="All done for you"
            body="We build it, set it live in 48 hours, and run it. $0 setup. You just take the booked jobs."
            className="md:col-span-2"
          >
            <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { n: "1", t: "We build it", d: "Your AI front desk, custom-built." },
                { n: "2", t: "Live in 48 hrs", d: "Set up, tested, switched on." },
                { n: "3", t: "We run it", d: "Tuned every week. $0 setup." },
              ].map((s) => (
                <div key={s.n} className="rounded-xl border border-[#171e19]/10 bg-white p-4">
                  <span className="oh-display text-2xl text-[#ffe17c]">{s.n}</span>
                  <p className="oh-display mt-1 text-base text-[#171e19]">{s.t}</p>
                  <p className="mt-1 text-sm text-[#171e19]/60">{s.d}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Kill no-shows" body="Smart text reminders before every appointment. Fewer empty slots, more jobs done." dark>
            <div className="mt-auto">
              <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2.5 text-sm text-white/85">
                Reminder: your appointment is tomorrow at 9:00 AM. Reply YES to confirm.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
