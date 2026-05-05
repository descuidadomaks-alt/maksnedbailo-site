"use client";

import { useRef, useState, useCallback } from "react";
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

function VideoEmbed({
  youtubeId,
  name,
  company,
}: {
  youtubeId: string;
  name: string;
  company: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative rounded-xl overflow-hidden bg-black"
        style={{ aspectRatio: "9/16" }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`}
          title={`Testimonial from ${name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
      <div className="text-center">
        <p className="font-sora text-[12px] font-semibold text-fg/65">{name}</p>
        <p className="font-sora text-[10px] text-fg/30 mt-0.5">{company}</p>
      </div>
    </div>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#D4FF2B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ── Five written testimonial cards ────────────────────────────────────────
const CARDS = [
  {
    accent: true,
    quote:
      "Wow Maks — this is f***ing awesome!! I need to check properly on my laptop but I am amazed! You're a genius!! Thank you!!",
    author: "Corinna C.",
    role: "Verified client · Edible Health · UK",
  },
  {
    accent: false,
    quote:
      "Maksym really took the time to understand our business requirements and came up with creative solutions that perfectly matched what we needed. He was very responsive and easy to work with throughout the entire process.",
    author: "Sophie M.",
    role: "Verified client review · 5★",
  },
  {
    accent: false,
    quote:
      "Excellent communication and very quick to understand what I was looking for. Delivered high-quality work with great attention to detail.",
    author: "Daniel R.",
    role: "Verified client review · 5★",
  },
  {
    accent: false,
    quote:
      "Maksym understood the brief quickly and delivered exactly what was needed. Communication was excellent throughout.",
    author: "Eleanor K.",
    role: "Verified client review · 5★",
  },
  {
    accent: false,
    quote: "Maksym was a pleasure to work with and very very talented.",
    author: "James T.",
    role: "Verified client review · 5★",
  },
];

function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scrollBy = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    // One card = 1/3 of container on desktop, full width on mobile
    const amount = el.clientWidth <= 640 ? el.clientWidth + 16 : el.clientWidth / 3 + 5.3;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="flex-none flex flex-col justify-between rounded-xl p-5"
            style={{
              width: "calc(33.333% - 10.667px)",
              minWidth: "260px",
              scrollSnapAlign: "start",
              background: card.accent
                ? "rgba(212,255,43,0.05)"
                : "rgba(255,255,255,0.022)",
              border: card.accent
                ? "1px solid rgba(212,255,43,0.18)"
                : "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div>
              {card.accent ? (
                <p
                  className="font-playfair text-[48px] leading-none mb-1 select-none"
                  style={{ color: "rgba(212,255,43,0.35)" }}
                  aria-hidden
                >
                  &ldquo;
                </p>
              ) : (
                <StarRow />
              )}
              <blockquote className="font-sora font-light text-[13px] text-fg/65 leading-relaxed mb-4">
                {card.quote}
              </blockquote>
            </div>
            <div>
              <p className="font-sora text-[12px] font-semibold text-fg/75">
                {card.author}
              </p>
              <p className="font-sora text-[10px] text-fg/35 mt-0.5">
                {card.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow controls */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => scrollBy("prev")}
          disabled={!canPrev}
          aria-label="Previous testimonials"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
          style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => scrollBy("next")}
          disabled={!canNext}
          aria-label="Next testimonials"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
          style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Proof() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative border-t border-b border-white/[0.04] py-20 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, rgba(212,255,43,0.012) 0%, transparent 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Quiet founder bridge paragraph ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px] mx-auto text-center mb-16"
        >
          <p className="font-sora font-light text-[13px] text-fg/40 leading-relaxed">
            For 16 years I solved business problems with design — sitting with founders across
            500+ projects in 34+ countries, asking the same question every time: what&apos;s the
            business outcome? The deliverables changed. The mindset didn&apos;t.
          </p>
        </motion.div>

        {/* ── Section heading ── */}
        <motion.h2
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-playfair font-normal text-3xl md:text-4xl leading-tight text-center mb-12"
        >
          {t(content.proof.title, lang)}
        </motion.h2>

        {/* ── Row 1: Two portrait videos, equal size ── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 max-w-[640px] mx-auto"
        >
          {content.proof.videos.map((video, i) => (
            <VideoEmbed
              key={i}
              youtubeId={video.youtubeId}
              name={video.name}
              company={video.company}
            />
          ))}
        </motion.div>

        {/* ── Row 2: Five-card carousel ── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <TestimonialCarousel />
        </motion.div>

        {/* Anchor to Bot in Action */}
        <div className="mt-12">
          <a
            href="#bot-in-action"
            className="font-sora text-sm text-accent/60 hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            See how we work today →
          </a>
        </div>
      </div>
    </section>
  );
}
