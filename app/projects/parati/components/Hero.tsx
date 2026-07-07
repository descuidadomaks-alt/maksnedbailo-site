"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "../lib/content";
import { waLink } from "../lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { PetalField } from "./PetalField";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  const showProof = !site.googleRating.includes("[") && site.reviewCount > 0;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:min-h-[100svh] lg:pt-28"
    >
      {/* faint oversized lotus/sun ring, bleeding off the top-right — asymmetry */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-gold/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-24 h-64 w-64 rounded-full bg-gold/5 blur-3xl"
      />
      <PetalField />

      <div className="relative z-10 mx-auto grid max-w-content items-center gap-10 lg:min-h-[80svh] lg:grid-cols-12 lg:gap-6">
        {/* ── Content column (left, wider) ─────────────────────────── */}
        <div className="lg:col-span-7 lg:pr-8">
          <motion.div {...fade(0.05)}>
            <Image
              src="/projects/parati/Logo_l.png"
              alt={`${site.business} — ${site.tagline}`}
              width={1007}
              height={832}
              priority
              className="h-auto w-[150px] sm:w-[172px]"
            />
          </motion.div>

          <motion.span
            {...fade(0.15)}
            className="mt-7 block font-jost text-[11px] uppercase tracking-label text-gold-deep"
          >
            {site.hero.eyebrow}
          </motion.span>

          <h1 className="mt-4 font-display text-5xl leading-[0.98] text-charcoal sm:text-6xl md:text-7xl">
            {site.hero.headlineLines.map((line, i) => (
              <motion.span key={i} {...fade(0.25 + i * 0.08)} className="block">
                {i === site.hero.headlineLines.length - 1 ? (
                  <span className="italic text-gold-deep">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            {...fade(0.6)}
            className="mt-7 max-w-md font-jost text-base leading-relaxed text-charcoal/70"
          >
            {site.hero.sub}
          </motion.p>

          <motion.div {...fade(0.72)} className="mt-8 flex flex-col items-start gap-3">
            <WhatsAppButton href={waLink()} className="!px-8 !py-4 text-base">
              {site.hero.cta}
            </WhatsAppButton>
            <span className="font-jost text-xs text-charcoal/45">{site.hero.ctaNote}</span>
          </motion.div>

          {showProof ? (
            <motion.div {...fade(0.85)} className="mt-8 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-gold/50" />
              <span className="font-jost text-sm text-charcoal/60">
                {site.hero.proof(site.googleRating, site.reviewCount)}
              </span>
            </motion.div>
          ) : null}
        </div>

        {/* ── Image column (right, bleeding off-edge) ──────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="relative lg:col-span-5"
        >
          <div className="relative ml-auto aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-gold/20 shadow-soft sm:aspect-[3/4] lg:aspect-auto lg:h-[68svh] lg:w-[calc(100%+2rem)]">
            <Image
              src="/projects/parati/hero.jpg"
              alt={site.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            {/* faint warm veil to unify with the cream ground */}
            <div className="absolute inset-0 bg-gradient-to-t from-cream/25 to-transparent" />
          </div>
          {/* small gold caption chip, offset — editorial detail */}
          <div className="absolute -bottom-4 left-4 rounded-full bg-ivory px-4 py-2 shadow-card lg:-left-6">
            <span className="font-jost text-[10px] uppercase tracking-label text-gold-deep">
              Santander · Cantabria
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
