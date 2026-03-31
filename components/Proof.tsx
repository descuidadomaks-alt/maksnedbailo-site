"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

function PlayIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="21" stroke="rgba(240,236,230,0.12)" strokeWidth="1" />
      <path d="M18 14.5L32 22L18 29.5V14.5Z" fill="rgba(240,236,230,0.3)" />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#D4FF2B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Proof() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeQuote, setActiveQuote] = useState(0);
  const [paused, setPaused] = useState(false);

  const quotes = content.proof.quotes;

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, quotes.length]);

  return (
    <section
      ref={ref}
      className="relative border-t border-b border-white/[0.04] py-20 md:py-28"
      style={{
        background: "linear-gradient(180deg, rgba(212,255,43,0.012) 0%, transparent 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-playfair font-normal text-3xl md:text-4xl leading-tight text-center mb-14"
        >
          {t(content.proof.title, lang)}
        </motion.h2>

        {/* Main grid: video left, quotes right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start mb-10">

          {/* Left: 2 landscape video placeholders */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-4"
          >
            {content.proof.videos.map((video, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05] flex items-center justify-center"
                style={{ aspectRatio: "16/9" }}
              >
                {/* Subtle gradient bg */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,255,43,0.02) 0%, rgba(255,255,255,0.01) 100%)",
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
                  <PlayIcon />
                  <div>
                    <p className="font-sora text-[14px] font-semibold text-fg/70">
                      {video.name}
                    </p>
                    <p className="font-sora text-[11px] text-fg/30 mt-0.5">
                      {video.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: auto-cycling quote cards */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl p-7"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <StarRow />
                <blockquote className="font-sora font-light text-[15px] text-fg/70 leading-relaxed mb-5">
                  &ldquo;{t(quotes[activeQuote].text, lang)}&rdquo;
                </blockquote>
                <div>
                  <p className="font-sora text-[13px] font-semibold text-fg/80">
                    {quotes[activeQuote].author}
                  </p>
                  <p className="font-sora text-[11px] text-fg/35 mt-0.5">
                    {t(quotes[activeQuote].role, lang)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot navigation */}
            <div className="flex gap-2 items-center">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveQuote(i); setPaused(true); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeQuote
                      ? "w-6 h-1.5 bg-accent"
                      : "w-1.5 h-1.5 bg-fg/20 hover:bg-fg/40"
                  }`}
                  aria-label={`Quote ${i + 1}`}
                />
              ))}
            </div>

            {/* Other quotes preview — faded */}
            <div className="flex flex-col gap-3 mt-2">
              {quotes.map((q, i) => {
                if (i === activeQuote) return null;
                return (
                  <button
                    key={i}
                    onClick={() => { setActiveQuote(i); setPaused(true); }}
                    className="text-left rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/[0.02]"
                    style={{ border: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <p className="font-sora text-[12px] text-fg/30 leading-relaxed line-clamp-2">
                      &ldquo;{t(q.text, lang)}&rdquo;
                    </p>
                    <p className="font-sora text-[10px] text-fg/20 mt-1">{q.author}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bridge line */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-sora text-[12px] text-fg/25 text-center tracking-wide"
        >
          {t(content.proof.bridgeLine, lang)}
        </motion.p>
      </div>
    </section>
  );
}
