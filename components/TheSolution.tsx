"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TheSolution() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-divider py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
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
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-sora font-light text-[13px] text-fg/40 leading-relaxed"
          >
            {t(content.solution.trust, lang)}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.solution.cards.map((card, i) => (
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
              {/* Large faded number */}
              <span className="absolute top-4 right-5 font-playfair text-[48px] font-normal text-accent/5 leading-none select-none pointer-events-none">
                {card.num}
              </span>

              <h3 className="font-sora text-[16px] font-semibold text-fg mb-3 pr-10">
                {t(card.title, lang)}
              </h3>
              <p className="font-sora font-light text-[13px] text-fg/40 leading-relaxed">
                {t(card.desc, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
