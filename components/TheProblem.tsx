"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t, WA_LINK } from "@/lib/content";

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return value;
}

function StatCard({
  children,
  accentBorder,
}: {
  children: React.ReactNode;
  accentBorder?: boolean;
}) {
  return (
    <div
      className={`group h-full bg-white/[0.015] border rounded-xl p-7 text-center transition-all duration-300 hover:bg-white/[0.025] flex flex-col justify-center ${
        accentBorder
          ? "border-accent/15 hover:border-accent/25"
          : "border-white/[0.04] hover:border-accent/10"
      }`}
    >
      {children}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TheProblem() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const card1Value = useCountUp(73, 1400, inView);
  const card2Value = useCountUp(19, 1400, inView);

  return (
    <section ref={ref} className="section-divider py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 items-stretch">
          {/* Card 1 */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="h-full"
          >
            <StatCard>
              <div className="font-playfair text-[42px] font-normal text-accent leading-none mb-3">
                {card1Value}%
              </div>
              <p className="font-sora text-[12px] text-fg/40 leading-relaxed">
                {t(content.problem.cards.c1label, lang)}
              </p>
            </StatCard>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="h-full"
          >
            <StatCard>
              <div className="font-playfair text-[42px] font-normal text-accent leading-none mb-3">
                {card2Value}h
              </div>
              <p className="font-sora text-[12px] text-fg/40 leading-relaxed">
                {t(content.problem.cards.c2label, lang)}
              </p>
            </StatCard>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="h-full"
          >
            <StatCard accentBorder>
              <a
                href={content.problem.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div
                  className="font-playfair text-[42px] font-normal text-accent leading-none mb-3"
                  style={{
                    animation: "pulse 2.5s ease-in-out infinite",
                  }}
                >
                  ???
                </div>
                <p className="font-sora text-[12px] text-accent/70 leading-relaxed hover:text-accent/90 transition-colors">
                  {t(content.problem.cards.c3label, lang)}
                </p>
              </a>
            </StatCard>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.figure
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-[580px] mx-auto mb-20"
        >
          <div
            className="rounded-xl px-8 py-6"
            style={{
              background: "rgba(212,255,43,0.03)",
              border: "1px solid rgba(212,255,43,0.07)",
            }}
          >
            <blockquote className="font-playfair text-[17px] italic text-fg/50 mb-3 leading-relaxed">
              {t(content.problem.quote, lang)}
            </blockquote>
            <figcaption className="font-sora text-[11px] text-fg/25 tracking-wide uppercase">
              {t(content.problem.quoteAttribution, lang)}
            </figcaption>
          </div>
        </motion.figure>

        {/* Title + body */}
        <div className="max-w-[640px] mx-auto text-center">
          <motion.h2
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-8"
          >
            {t(content.problem.title, lang)}
          </motion.h2>

          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-sora font-light text-[15px] text-fg/45 leading-relaxed mb-8"
          >
            {t(content.problem.body, lang)}
          </motion.p>

          <motion.a
            custom={6}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            href={content.problem.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sora text-sm text-accent hover:underline underline-offset-4 transition-all"
          >
            {t(content.problem.cta, lang)}
          </motion.a>

          {/* WhatsApp micro-CTA */}
          <motion.div
            custom={7}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-4"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sora text-[12px] text-fg/30 hover:text-green-400 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
              {lang === "es" ? "¿Pregunta rápida? Escríbeme." : "Quick question? Just message me."}
            </a>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
}
