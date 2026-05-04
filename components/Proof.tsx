"use client";

import { useRef } from "react";
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
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#D4FF2B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ── Corinna Cope hero testimonial ──────────────────────────────────────────
const HERO_TESTIMONIAL = {
  quote: "Maks doesn't just hand you a tool and disappear. He mapped every single touchpoint in our customer journey, built the assistant around how we actually talk, and was available to refine it until it felt genuinely ours. We went from a 4-hour average response time to under 60 seconds — overnight.",
  author: "Corinna Cope",
  role: "Founder, Cope & Co · UK",
};

// ── Row 1: written card beside the two videos ──────────────────────────────
const ROW1_WRITTEN = {
  quote: "I honestly didn't think it would sound like us. But the first customer who interacted with it told us it was the best service experience she'd had in years — and had no idea it was automated. That was the moment I knew this was different.",
  author: "James T.",
  role: "Hospitality Owner · Ireland",
};

// ── Row 2: compact cards ───────────────────────────────────────────────────
const ROW2 = [
  {
    quote: "Setup was invisible. Two days and it was live. My clients now get answers at 11pm that would have waited until morning. Three bookings in the first week alone.",
    author: "Sophie M.",
    role: "Beauty Clinic · London",
  },
  {
    quote: "The ROI conversation became very simple: I was missing 5–6 serious enquiries every week. Now I capture almost all of them. The system paid for itself in about nine days.",
    author: "Daniel R.",
    role: "Renovation Business · Madrid",
  },
  {
    quote: "What sold me was the 30-day guarantee. Zero risk. But I didn't need it — results showed up before the end of week one.",
    author: "Eleanor K.",
    role: "Wellness Studio · Barcelona",
  },
];

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

        {/* ── Experience intro — From the founder ── */}
        <div className="max-w-[700px] mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sora text-[11px] font-semibold tracking-widest text-accent/60 uppercase mb-4"
          >
            From the founder
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-6"
          >
            16 years. 500+ businesses. 34+ countries. One philosophy that
            didn&apos;t change.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-sora font-light text-[15px] text-fg/50 leading-relaxed mb-4"
          >
            For 16 years I solved business problems with design. I sat with
            founders across 34 countries and asked one question every time:
            what&apos;s the business outcome?
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-sora font-light text-[15px] text-fg/50 leading-relaxed"
          >
            The deliverables changed. The mindset didn&apos;t. Today the work is
            AI conversations instead of brand identities — but the question is
            the same: what business problem are we actually solving?
          </motion.p>
        </div>

        {/* ── Section heading ── */}
        <motion.h2
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-playfair font-normal text-3xl md:text-4xl leading-tight text-center mb-14"
        >
          {t(content.proof.title, lang)}
        </motion.h2>

        {/* ── Corinna Cope hero card ── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="rounded-2xl p-8 md:p-10 mb-10"
          style={{
            background: "rgba(212,255,43,0.04)",
            border: "1px solid rgba(212,255,43,0.12)",
          }}
        >
          <StarRow />
          <blockquote className="font-playfair font-normal text-xl md:text-2xl text-fg/80 leading-relaxed mb-6">
            &ldquo;{HERO_TESTIMONIAL.quote}&rdquo;
          </blockquote>
          <div>
            <p className="font-sora text-[14px] font-semibold text-fg/90">
              {HERO_TESTIMONIAL.author}
            </p>
            <p className="font-sora text-[12px] text-fg/40 mt-0.5">
              {HERO_TESTIMONIAL.role}
            </p>
          </div>
        </motion.div>

        {/* ── Row 1: two portrait videos + one written card ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {content.proof.videos.map((video, i) => (
            <motion.div
              key={i}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <VideoEmbed
                youtubeId={video.youtubeId}
                name={video.name}
                company={video.company}
              />
            </motion.div>
          ))}

          {/* Written card — James T. */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="rounded-xl p-6 flex flex-col justify-between"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div>
              <StarRow />
              <blockquote className="font-sora font-light text-[15px] text-fg/70 leading-relaxed mb-6">
                &ldquo;{ROW1_WRITTEN.quote}&rdquo;
              </blockquote>
            </div>
            <div>
              <p className="font-sora text-[13px] font-semibold text-fg/80">
                {ROW1_WRITTEN.author}
              </p>
              <p className="font-sora text-[11px] text-fg/35 mt-0.5">
                {ROW1_WRITTEN.role}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Row 2: three compact cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ROW2.map((card, i) => (
            <motion.div
              key={i}
              custom={i + 5}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.018)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <StarRow />
              <blockquote className="font-sora font-light text-[13px] text-fg/60 leading-relaxed mb-4">
                &ldquo;{card.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-sora text-[12px] font-semibold text-fg/70">
                  {card.author}
                </p>
                <p className="font-sora text-[10px] text-fg/30 mt-0.5">
                  {card.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Anchor scroll to Bot in Action */}
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
