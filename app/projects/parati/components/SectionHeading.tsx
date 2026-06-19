"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Section heading: uppercase tracked eyebrow + serif title +
 * a gold hairline underline that animates its width in on scroll.
 */
export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  intro,
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  intro?: string;
}) {
  const reduce = useReducedMotion();
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignClass} gap-4`}>
      <span className="font-jost text-xs uppercase tracking-label text-gold-deep">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <motion.span
        aria-hidden
        className="block h-px bg-gold"
        initial={{ width: reduce ? 64 : 0 }}
        whileInView={{ width: 64 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      />
      {intro ? (
        <p className={`max-w-xl font-jost text-base leading-relaxed text-charcoal/70 ${align === "center" ? "mx-auto" : ""}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
