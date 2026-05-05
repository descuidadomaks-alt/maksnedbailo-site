"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BOOKING_LINK } from "@/lib/content";
import { fadeUpVariants } from "@/lib/animations";

const HERO = {
  src: "/proof/chat-1.jpg",
  caption: "Restaurant · Allergy booking handled automatically · ES",
};

const SUPPORTING = [
  {
    src: "/screenshots/bot-in-action/slot-1.png",
    caption: "Ski gear advice · EN · product knowledge + recommendation",
  },
  {
    src: "/screenshots/bot-in-action/slot-2.png",
    caption: "Emergency plumbing · PT · triage + pricing + dispatch",
  },
  {
    src: "/proof/chat-2.jpg",
    caption: "Pilates studio · Medical enquiry + consult booking · EN",
  },
  {
    src: "/proof/chat-3.png",
    caption: "Solicitors · Personal injury · lead captured in 10 min · EN",
  },
];

function PhoneTile({
  src,
  caption,
  placeholder,
}: {
  src: string | null;
  caption: string;
  placeholder?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: "9/19" }}
      >
        {src ? (
          <Image
            src={src}
            alt={caption}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-20"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path
                d="M21 15l-5-5L5 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-sora text-[11px] text-fg/20 tracking-wide text-center px-6">
              {placeholder ? "More demos coming" : "Demo coming soon"}
            </p>
          </div>
        )}
      </div>
      <p className="font-sora text-[11px] text-fg/35 leading-snug text-center px-1">
        {caption}
      </p>
    </div>
  );
}

/** Hero phone tile — entry animation only */
function HeroPhoneTile({ inView, shouldReduce }: { inView: boolean; shouldReduce: boolean }) {
  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, rotate: -2, y: 40 }}
      animate={inView ? { opacity: 1, rotate: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <PhoneTile src={HERO.src} caption={HERO.caption} />
    </motion.div>
  );
}

/** Supporting phone tile — staggered entry only */
function SupportingTile({
  src,
  caption,
  index,
  inView,
  shouldReduce,
}: {
  src: string | null;
  caption: string;
  index: number;
  inView: boolean;
  shouldReduce: boolean;
}) {
  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, rotate: -2, y: 40 }}
      animate={inView ? { opacity: 1, rotate: 0, y: 0 } : {}}
      transition={{ duration: 0.85, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <PhoneTile src={src} caption={caption} placeholder={!src} />
    </motion.div>
  );
}

/** Background SVG flowing lines — subtle accent strokes that pulse */
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
          stroke="rgba(212,255,43,0.12)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.15, 0.15, 0],
          }}
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
          "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(212,255,43,0.045) 0%, transparent 65%), rgba(0,0,0,0)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Background flowing lines */}
      <FlowingLines shouldReduce={shouldReduce} />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header — centered */}
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

        {/* Layout: hero left + 3 supporting right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">

          {/* Hero tile — centered in its column, larger */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-[260px] mx-auto">
              <HeroPhoneTile inView={inView} shouldReduce={shouldReduce} />
            </div>
          </motion.div>

          {/* 4 supporting tiles — 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {SUPPORTING.map((slot, i) => (
              <SupportingTile
                key={i}
                src={slot.src}
                caption={slot.caption}
                index={i}
                inView={inView}
                shouldReduce={shouldReduce}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          custom={7}
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
