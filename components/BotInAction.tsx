"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BOOKING_LINK } from "@/lib/content";

const SLOTS = [
  { label: "English, complex pricing question" },
  { label: "Spanish, after-hours booking" },
  { label: 'Handoff moment ("let me get a human")' },
  { label: "Niche-specific knowledge demo" },
  { label: "Multi-language switching mid-conversation" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BotInAction() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="bot-in-action" ref={ref} className="section-divider py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-[680px] mb-12">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-5"
          >
            Your team has answered this 1,000 times. Now it doesn't have to.
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-sora font-light text-[15px] text-fg/50 leading-relaxed"
          >
            Trained in your brand voice. Handles the questions you're tired of answering. Hands off when it should.
          </motion.p>
        </div>

        {/* Screenshot placeholders — 1 col mobile / 2 col tablet / 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SLOTS.map((slot, i) => (
            <motion.div
              key={i}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="font-sora text-[11px] text-fg/20 tracking-wide text-center px-6">
                    Screenshot pending
                  </p>
                  <p className="font-sora text-[10px] text-fg/[0.12] text-center px-6 leading-relaxed">
                    {slot.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
