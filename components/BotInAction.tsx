"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BOOKING_LINK } from "@/lib/content";
import { fadeUpVariants } from "@/lib/animations";

const SLIDES = [
  {
    src: "/proof/chat-1.jpg",
    industry: "Food & Hospitality",
    caption: "Restaurant · Severe allergy flagged, booking confirmed in seconds · ES",
  },
  {
    src: "/proof/chat-2.jpg",
    industry: "Health & Wellness",
    caption: "Pilates studio · Medical enquiry handled, free consult booked · EN",
  },
  {
    src: "/proof/chat-3.png",
    industry: "Legal Services",
    caption: "Solicitors · Personal injury lead qualified and escalated · EN",
  },
  {
    src: "/screenshots/bot-in-action/slot-1.png",
    industry: "Retail",
    caption: "Ski gear shop · Product knowledge + sizing recommendation · EN",
  },
  {
    src: "/screenshots/bot-in-action/slot-2.png",
    industry: "Home Services",
    caption: "Emergency plumber · Triage, pricing and dispatch, 24/7 · PT",
  },
];

const INTERVAL_MS = 4800;
// Large tile width in px at each breakpoint
const LG_W = 240;
const SM_W = 180;
// Queue tile width ≈ 38% of large
const LG_Q = 92;
const SM_Q = 68;

function SpotlightCarousel({
  inView,
  shouldReduce,
}: {
  inView: boolean;
  shouldReduce: boolean;
}) {
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const n = SLIDES.length;

  const advance = useCallback((next: number) => {
    setActive(next);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % n;
        setProgressKey((k) => k + 1);
        return next;
      });
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [inView, n]);

  const getIdx = (offset: number) => (active + offset + n * 10) % n;
  const OPACITIES = [0.75, 0.48, 0.24];

  return (
    // Centered row on all sizes — no stretching, no gap
    <div className="flex items-start justify-center gap-3 md:gap-5">

      {/* ── LARGE featured tile ── */}
      <div
        className="flex-none flex flex-col items-center"
        style={{ width: `${SM_W}px` }}
      >
        {/* Phone frame */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "9/19",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.3)",
          }}
        >
          {/* Subtle lime glow behind */}
          <div
            className="absolute -inset-2 -z-10 blur-2xl opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at 50% 70%, rgba(212,255,43,0.18) 0%, transparent 70%)",
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Image
                src={SLIDES[active].src}
                alt={SLIDES[active].caption}
                fill
                className="object-cover object-top"
                sizes={`${SM_W}px`}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        {!shouldReduce && (
          <div className="w-full mt-3 h-[2px] rounded-full overflow-hidden bg-white/[0.07]">
            <motion.div
              key={progressKey}
              className="h-full rounded-full"
              style={{ background: "rgba(212,255,43,0.55)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
            />
          </div>
        )}

        {/* Caption */}
        <div className="w-full mt-3 min-h-[56px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <span
                className="inline-block font-sora text-[8px] uppercase tracking-[2px] px-2 py-0.5 rounded-full mb-1.5"
                style={{
                  color: "rgba(212,255,43,0.65)",
                  border: "1px solid rgba(212,255,43,0.18)",
                  background: "rgba(212,255,43,0.04)",
                }}
              >
                {SLIDES[active].industry}
              </span>
              <p className="font-sora text-[10px] text-fg/38 leading-relaxed">
                {SLIDES[active].caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-1.5 mt-3 items-center">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                height: "3px",
                width: i === active ? "16px" : "3px",
                background:
                  i === active
                    ? "rgba(212,255,43,0.7)"
                    : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── QUEUE — small tiles stacked vertically ── */}
      <div
        className="flex-none flex flex-col gap-2"
        style={{ width: `${SM_Q}px` }}
      >
        {[1, 2, 3].map((offset) => {
          const idx = getIdx(offset);
          return (
            <motion.button
              key={offset}
              onClick={() => advance(idx)}
              aria-label={`Switch to: ${SLIDES[idx].industry}`}
              className="w-full relative rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/50"
              style={{
                aspectRatio: "9/14",           // slightly cropped — shows top of chat
                border: "1px solid rgba(255,255,255,0.07)",
                flexShrink: 0,
              }}
              animate={{ opacity: OPACITIES[offset - 1] }}
              whileHover={{ opacity: 1, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <Image
                src={SLIDES[idx].src}
                alt={SLIDES[idx].caption}
                fill
                className="object-cover object-top"
                sizes={`${SM_Q}px`}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/** Background SVG flowing lines */
function FlowingLines({ shouldReduce }: { shouldReduce: boolean }) {
  if (shouldReduce) return null;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      {[
        { d: "M-100 200 C 200 150, 400 320, 700 240 S 1000 180, 1400 220", delay: 0 },
        { d: "M-100 320 C 150 280, 350 420, 650 360 S 950 300, 1400 340", delay: 1.5 },
        { d: "M-100 440 C 250 390, 500 500, 800 450 S 1100 400, 1400 460", delay: 3 },
        { d: "M100 100 C 300 60, 550 200, 800 140 S 1050 80, 1300 120", delay: 0.8 },
        { d: "M0 520 C 300 480, 600 560, 900 520 S 1200 480, 1400 540", delay: 2.2 },
      ].map((line, i) => (
        <motion.path
          key={i}
          d={line.d}
          stroke="rgba(212,255,43,0.10)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.12, 0.12, 0] }}
          transition={{
            duration: 8,
            delay: line.delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 4,
          }}
        />
      ))}
    </svg>
  );
}

export default function BotInAction() {
  const shouldReduce = useReducedMotion() ?? false;
  const fadeUp = fadeUpVariants(shouldReduce);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="bot-in-action"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(212,255,43,0.045) 0%, transparent 65%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <FlowingLines shouldReduce={shouldReduce} />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-5"
          >
            Your team has answered this 1,000 times. Now it doesn&apos;t have to.
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-sora font-light text-[15px] text-fg/50 leading-relaxed"
          >
            Trained in your brand voice. Handles the questions you&apos;re tired of
            answering. Hands off when it should.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <SpotlightCarousel inView={inView} shouldReduce={shouldReduce} />
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-bg font-semibold px-6 py-3 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200"
          >
            Get yours →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
