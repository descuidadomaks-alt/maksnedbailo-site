"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle floating gold-petal drift for the hero background.
 * Pure CSS animation (cheap, GPU-friendly). Pauses when the hero scrolls
 * off-screen (IntersectionObserver) and disables entirely under
 * prefers-reduced-motion.
 */

type Petal = {
  left: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
  opacity: number;
};

// Deterministic-ish spread so it looks scattered without Math.random in render.
const PETALS: Petal[] = [
  { left: "8%", size: 10, delay: "0s", duration: "15s", drift: "20px", opacity: 0.5 },
  { left: "20%", size: 7, delay: "3s", duration: "19s", drift: "-26px", opacity: 0.4 },
  { left: "33%", size: 12, delay: "6s", duration: "17s", drift: "30px", opacity: 0.55 },
  { left: "46%", size: 8, delay: "1.5s", duration: "21s", drift: "-18px", opacity: 0.35 },
  { left: "58%", size: 11, delay: "8s", duration: "16s", drift: "24px", opacity: 0.5 },
  { left: "70%", size: 6, delay: "4.5s", duration: "22s", drift: "-30px", opacity: 0.4 },
  { left: "82%", size: 13, delay: "2s", duration: "18s", drift: "16px", opacity: 0.45 },
  { left: "92%", size: 8, delay: "7s", duration: "20s", drift: "-22px", opacity: 0.4 },
];

export function PetalField() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep the field disabled entirely
    setEnabled(true);

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-40px] rounded-[60%_40%_60%_40%/50%_60%_40%_50%] bg-gold"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationName: "pt-drift",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationPlayState: active ? "running" : "paused",
            // CSS var consumed by the keyframes' horizontal sway.
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
