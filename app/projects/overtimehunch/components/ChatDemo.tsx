"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * A looping SMS-style demo: a homeowner messages in, the AI replies in seconds,
 * the job gets booked. Runs on a dark background (bento card 1) and, blurred,
 * behind the hero CTA so visitors see a "video" is waiting.
 *
 * Roofing is the lead vertical here — high-ticket, urgent, the strongest
 * home-service demand. Swap SCRIPT to retarget another trade.
 */

type Msg = { who: "them" | "us" | "typing" | "booked"; text?: string };

const SCRIPT: Msg[] = [
  { who: "them", text: "Hi — do you fix leaking roofs?" },
  { who: "typing" },
  { who: "us", text: "Yes! We can come take a look this week. What day works?" },
  { who: "them", text: "Thursday morning?" },
  { who: "typing" },
  { who: "us", text: "Done — booked you Thursday, 9:00 AM. See you then 👍" },
  { who: "booked", text: "Appointment booked" },
];

export function ChatDemo({ animate = true }: { animate?: boolean }) {
  const reduce = useReducedMotion();
  const live = animate && !reduce;
  const [count, setCount] = useState(live ? 0 : SCRIPT.length);

  useEffect(() => {
    if (!live) {
      setCount(SCRIPT.length);
      return;
    }
    let cancelled = false;
    let n = 0;
    const step = () => {
      if (cancelled) return;
      if (n >= SCRIPT.length) {
        setTimeout(() => {
          if (cancelled) return;
          n = 0;
          setCount(0);
          setTimeout(step, 700);
        }, 2800);
        return;
      }
      n += 1;
      setCount(n);
      const cur = SCRIPT[n - 1];
      setTimeout(step, cur.who === "typing" ? 1000 : 850);
    };
    setCount(0);
    const id = setTimeout(step, 700);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [live]);

  // Only show a "typing" bubble while it's the latest item — never a leftover.
  const visible = SCRIPT.slice(0, count).filter(
    (m, idx) => m.who !== "typing" || idx === count - 1
  );

  return (
    <div className="flex h-full flex-col justify-end gap-2.5 overflow-hidden">
      <AnimatePresence initial={false}>
        {visible.map((m, i) => (
          <motion.div
            key={`${i}-${m.who}`}
            initial={live ? { opacity: 0, y: 8, scale: 0.96 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={
              m.who === "booked"
                ? "mx-auto"
                : m.who === "us"
                ? "self-end"
                : "self-start"
            }
          >
            {m.who === "typing" ? (
              <span className="inline-flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                <span className="oh-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "0ms" }} />
                <span className="oh-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "200ms" }} />
                <span className="oh-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: "400ms" }} />
              </span>
            ) : m.who === "booked" ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ffe17c]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffe17c]">
                <span aria-hidden>✓</span> {m.text}
              </span>
            ) : (
              <span
                className={`inline-block max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                  m.who === "us"
                    ? "rounded-br-sm bg-[#ffe17c] text-[#171e19]"
                    : "rounded-bl-sm bg-white/10 text-white"
                }`}
              >
                {m.text}
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
