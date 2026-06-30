"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Zero-CLS looping SMS demo: a homeowner messages in, the AI replies, the
 * job gets booked — replayed on loop. Used blurred behind the Hero CTA and,
 * full-clarity, inside the Instant Lead Response bento card.
 *
 * CLS FIX (read before editing): every bubble is rendered in the DOM from
 * first paint, in its FINAL layout position, with FINAL text. We only ever
 * animate opacity + a small translateY — both are compositor-only properties
 * that never trigger reflow, so the container's height is locked the instant
 * it mounts and never changes again, on any stage of the loop. The
 * typing-dots -> message crossfade for each AI reply uses a CSS grid stack
 * (`grid` parent, both children pinned to `col-start-1 row-start-1`) so the
 * slot's height is always the larger of the two — set once, never recomputed
 * as opacity toggles. Do NOT switch this back to conditional/append-on-arrival
 * rendering (e.g. AnimatePresence mount/unmount) — that's what caused the
 * page to visibly stretch while the loop played.
 */

const EASE = "cubic-bezier(0.4,0,0.2,1)";

type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const TIMINGS: { stage: Stage; delay: number }[] = [
  { stage: 1, delay: 600 }, // customer msg 1
  { stage: 2, delay: 700 }, // AI typing
  { stage: 3, delay: 1100 }, // AI reply 1
  { stage: 4, delay: 900 }, // customer msg 2
  { stage: 5, delay: 700 }, // AI typing
  { stage: 6, delay: 1100 }, // AI reply 2
  { stage: 7, delay: 700 }, // booked pill
];
const HOLD_MS = 2600;
const RESET_GAP_MS = 500;

function reveal(active: boolean) {
  return {
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(6px)",
    transition: `opacity 300ms ${EASE}, transform 300ms ${EASE}`,
  } as const;
}

export function ChatLoop() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>(reduce ? 7 : 0);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      let elapsed = 0;
      TIMINGS.forEach(({ stage: s, delay }) => {
        elapsed += delay;
        timers.push(
          setTimeout(() => {
            if (!cancelled) setStage(s);
          }, elapsed)
        );
      });
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setStage(0);
          timers.push(setTimeout(() => !cancelled && run(), RESET_GAP_MS));
        }, elapsed + HOLD_MS)
      );
    };

    timers.push(setTimeout(run, 500));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  return (
    <div className="flex h-full min-h-[210px] flex-col justify-center gap-2.5 sm:min-h-[230px]">
      {/* customer msg 1 */}
      <div className="self-start" style={reveal(stage >= 1)}>
        <Bubble who="them">Hi — do you fix leaking roofs?</Bubble>
      </div>

      {/* AI reply 1 — typing/message crossfade, both pinned to the same grid cell */}
      <div className="grid self-end">
        <div className="col-start-1 row-start-1" style={reveal(stage === 2)}>
          <TypingDots />
        </div>
        <div className="col-start-1 row-start-1" style={reveal(stage >= 3)}>
          <Bubble who="us">Yes! We can come take a look this week. What day works?</Bubble>
        </div>
      </div>

      {/* customer msg 2 */}
      <div className="self-start" style={reveal(stage >= 4)}>
        <Bubble who="them">Thursday morning?</Bubble>
      </div>

      {/* AI reply 2 — typing/message crossfade */}
      <div className="grid self-end">
        <div className="col-start-1 row-start-1" style={reveal(stage === 5)}>
          <TypingDots />
        </div>
        <div className="col-start-1 row-start-1" style={reveal(stage >= 6)}>
          <Bubble who="us">Done — booked you Thursday, 9:00 AM. See you then 👍</Bubble>
        </div>
      </div>

      {/* booked pill */}
      <div className="mx-auto" style={reveal(stage >= 7)}>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#ffe17c]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffe17c]">
          <span aria-hidden>✓</span> Appointment booked
        </span>
      </div>
    </div>
  );
}

function Bubble({ who, children }: { who: "them" | "us"; children: React.ReactNode }) {
  return (
    <span
      className={`inline-block max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
        who === "us"
          ? "rounded-br-sm bg-[#ffe17c] text-[#171e19]"
          : "rounded-bl-sm bg-white/10 text-white"
      }`}
    >
      {children}
    </span>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
      <span className="oh-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "0ms" }} />
      <span className="oh-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "200ms" }} />
      <span className="oh-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "400ms" }} />
    </span>
  );
}
