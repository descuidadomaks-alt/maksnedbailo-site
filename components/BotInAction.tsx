"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { BOOKING_LINK } from "@/lib/content";

// Hero slot — client to provide final image; using placeholder for now
const HERO = {
  src: null as string | null, // set to "/screenshots/bot-in-action/hero.png" when ready
  caption: "Full conversation demo · coming soon",
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
    src: null,
    caption: "More demos coming",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

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

export default function BotInAction() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="bot-in-action"
      ref={ref}
      className="relative py-20 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse 120% 60% at 50% 0%, rgba(212,255,43,0.045) 0%, transparent 65%), rgba(0,0,0,0)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">

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
              <PhoneTile src={HERO.src} caption={HERO.caption} />
            </div>
          </motion.div>

          {/* 3 supporting tiles stacked */}
          <div className="grid grid-cols-3 gap-3">
            {SUPPORTING.map((slot, i) => (
              <motion.div
                key={i}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <PhoneTile
                  src={slot.src}
                  caption={slot.caption}
                  placeholder={!slot.src}
                />
              </motion.div>
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
