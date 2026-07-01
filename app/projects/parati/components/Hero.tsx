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
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  const showProof = !site.googleRating.includes("[") && site.reviewCount > 0;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cream px-5 pt-24 pb-16 sm:px-8"
    >
      {/* Soft hero photograph, warm gold tones (placeholder — see TODO). */}
      <div className="absolute inset-0">
        <Image
          src="/projects/parati/hero.jpg"
          alt={site.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Cream veil keeps text legible and the mood luminous, not dark. */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/85 via-cream/70 to-cream/90" />
      </div>

      <PetalField />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Full brand lockup (lotus + wordmark + tagline) — gentle bloom on load */}
        <motion.div
          className={reduce ? "" : "animate-bloom"}
          initial={reduce ? { opacity: 0 } : false}
          animate={reduce ? { opacity: 1 } : undefined}
          transition={reduce ? { duration: 0.6 } : undefined}
        >
          <Image
            src="/projects/parati/Logo_l.png"
            alt={`${site.business} — ${site.tagline}`}
            width={1007}
            height={832}
            priority
            className="mb-4 h-auto w-[230px] sm:w-[270px] md:w-[300px]"
          />
        </motion.div>

        <motion.h1
          {...fade(0.3)}
          className="mt-2 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl md:text-6xl"
        >
          {site.hero.headline}
        </motion.h1>

        <motion.p
          {...fade(0.45)}
          className="mt-6 max-w-xl font-jost text-base leading-relaxed text-charcoal/75 sm:text-lg"
        >
          {site.hero.sub}
        </motion.p>

        <motion.div {...fade(0.6)} className="mt-9">
          <WhatsAppButton href={waLink()} className="!px-8 !py-4 text-base">
            {site.hero.cta}
          </WhatsAppButton>
        </motion.div>

        {showProof ? (
          <motion.p
            {...fade(0.75)}
            className="mt-6 font-jost text-sm tracking-wide text-charcoal/70"
          >
            <span className="text-gold-deep">{site.hero.proof(site.googleRating, site.reviewCount)}</span>
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
