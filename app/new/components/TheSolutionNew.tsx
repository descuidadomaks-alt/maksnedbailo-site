/**
 * TheSolutionNew — identical to TheSolution, with the trust line updated.
 * Used only on /new; the live homepage still uses the original TheSolution.
 * The only diff: `content.solution.trustNew` instead of `content.solution.trust`.
 */
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";
import { fadeUpVariants } from "@/lib/animations";

function IconAudit() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="11" y1="8" x2="11" y2="14" />
    </svg>
  );
}
function IconBuild() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconGuarantee() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

const ICONS = [IconAudit, IconBuild, IconGuarantee];

export default function TheSolutionNew() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const fadeUp = fadeUpVariants(shouldReduce ?? false);

  return (
    <section ref={ref} className="section-divider py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-[700px] mx-auto text-center mb-14">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-4"
          >
            {t(content.solution.title, lang)}
          </motion.h2>
          {/* Updated trust line — only change from the original TheSolution */}
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-sora font-light text-[13px] text-fg/40 leading-relaxed"
          >
            {t(content.solution.trustNew, lang)}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.solution.cards.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={card.num}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="group relative overflow-hidden rounded-xl border border-white/[0.04] p-8 transition-all duration-300 hover:border-accent/12 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.005) 100%)",
                }}
              >
                <span className="absolute top-4 right-5 font-playfair text-[48px] font-normal text-accent/5 leading-none select-none pointer-events-none">
                  {card.num}
                </span>
                <div className="text-accent/40 mb-5 group-hover:text-accent/60 transition-colors duration-300">
                  <Icon />
                </div>
                <h3 className="font-sora text-[16px] font-semibold text-fg mb-3 pr-10">
                  {t(card.title, lang)}
                </h3>
                <p className="font-sora font-light text-[13px] text-fg/40 leading-relaxed">
                  {t(card.desc, lang)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
