"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const VIDEO_COUNT = 3;

// Card width + gap for scroll index detection
const CARD_W = 300;
const GAP = 16;

function PlayIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="25" stroke="rgba(240,236,230,0.12)" strokeWidth="1" />
      <path d="M21 17L37 26L21 35V17Z" fill="rgba(240,236,230,0.25)" />
    </svg>
  );
}

function VideoCard({ label }: { label: string }) {
  return (
    <div
      className="shrink-0 snap-start rounded-xl bg-white/[0.02] border border-white/[0.05]
                 flex flex-col items-center justify-center gap-4"
      style={{ width: `${CARD_W}px`, aspectRatio: "9/16" }}
    >
      <PlayIcon />
      <p className="font-sora text-[13px] text-fg/30 text-center px-6 leading-relaxed">
        {label}
      </p>
    </div>
  );
}

export default function Proof() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToCard(index: number) {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: index * (CARD_W + GAP),
      behavior: "smooth",
    });
    setActiveIndex(index);
  }

  return (
    <section
      ref={ref}
      className="relative border-t border-b border-white/[0.04] py-20 md:py-28"
      style={{
        background: "linear-gradient(180deg, rgba(212,255,43,0.01) 0%, transparent 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">

          {/* Left: text */}
          <div className="max-w-[540px]">
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-6"
            >
              {t(content.proof.title, lang)}
            </motion.h2>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-sora font-light text-[15px] text-fg/45 leading-relaxed mb-5"
            >
              {t(content.proof.p1, lang)}
            </motion.p>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-sora font-light text-[15px] text-fg/45 leading-relaxed mb-5"
            >
              {t(content.proof.p2, lang)}
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-sora text-[12px] italic text-fg/25 mb-8"
            >
              {t(content.proof.note, lang)}
            </motion.p>

            {/* Dot nav */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex gap-2 items-center"
            >
              {Array.from({ length: VIDEO_COUNT }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 h-1.5 bg-accent"
                      : "w-1.5 h-1.5 bg-fg/20 hover:bg-fg/40"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </motion.div>
          </div>

          {/* Right: vertical video slider */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Right-edge peek fade */}
            <div
              className="absolute top-0 right-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, transparent, #060608 90%)" }}
            />

            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory"
              style={{
                width: `${CARD_W + 50}px`,   /* shows ~15% of next card */
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onScroll={(e) => {
                const newIndex = Math.round(e.currentTarget.scrollLeft / (CARD_W + GAP));
                setActiveIndex(newIndex);
              }}
            >
              {Array.from({ length: VIDEO_COUNT }).map((_, i) => (
                <VideoCard key={i} label={t(content.proof.videoPlaceholder, lang)} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
