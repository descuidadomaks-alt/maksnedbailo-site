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

/** Spotlight carousel — one large featured tile, queue of smaller tiles beside it */
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

  const advance = useCallback(
    (next: number) => {
      setActive(next);
      setProgressKey((k) => k + 1);
    },
    []
  );

  // Auto-advance
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

  // Queue: 3 tiles shown after the active one
  const QUEUE_OPACITIES = [0.72, 0.45, 0.22];

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">

      {/* ── Large featured tile ── */}
      <div className="w-full flex flex-col items-center lg:items-start">
        <div className="relative w-full max-w-[260px] mx-auto lg:mx-0">

          {/* Ambient glow behind featured tile */}
          <div
            className="absolute -inset-4 -z-10 rounded-3xl opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 65%, rgba(212,255,43,0.14) 0%, transparent 70%)",
            }}
          />

          {/* Image frame */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              aspectRatio: "9/19",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <Image
                  src={SLIDES[active].src}
                  alt={SLIDES[active].caption}
                  fill
                  className="object-cover object-top"
                  sizes="260px"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          {!shouldReduce && (
            <div className="mt-4 h-[2px] w-full rounded-full overflow-hidden bg-white/[0.06]">
              <motion.div
                key={progressKey}
                className="h-full rounded-full"
                style={{ background: "rgba(212,255,43,0.5)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
              />
            </div>
          )}
        </div>

        {/* Caption — crossfades with slide */}
        <div className="w-full max-w-[260px] mx-auto lg:mx-0 mt-4 min-h-[60px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.28 }}
              className="text-center lg:text-left"
            >
              <span
                className="inline-block font-sora text-[9px] uppercase tracking-[2px] px-2.5 py-1 rounded-full mb-2"
                style={{
                  color: "rgba(212,255,43,0.6)",
                  border: "1px solid rgba(212,255,43,0.18)",
                  background: "rgba(212,255,43,0.04)",
                }}
              >
                {SLIDES[active].industry}
              </span>
              <p className="font-sora text-[11px] text-fg/40 leading-relaxed">
                {SLIDES[active].caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-1.5 mt-4 mx-auto lg:mx-0 w-full max-w-[260px] lg:justify-start justify-center">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                height: "4px",
                width: i === active ? "20px" : "4px",
                background: i === active ? "rgba(212,255,43,0.7)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Queue — 3 smaller tiles ── */}
      <div className="flex lg:flex-col gap-3 w-full lg:w-auto overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:pt-0">
        {[1, 2, 3].map((offset) => {
          const idx = getIdx(offset);
          return (
            <motion.button
              key={`${active}-${offset}`}
              onClick={() => advance(idx)}
              className="flex-none relative rounded-xl overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              style={{
                aspectRatio: "9/19",
                width: "120px",
                flexShrink: 0,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: QUEUE_OPACITIES[offset - 1] }}
              whileHover={{ opacity: 0.92, scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={SLIDES[idx].src}
                alt={SLIDES[idx].caption}
                fill
                className="object-cover object-top"
                sizes="120px"
              />
              {/* Hover shine */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }}
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

        {/* Spotlight carousel */}
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
