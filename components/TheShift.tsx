"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

export default function TheShift() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-divider py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 lg:gap-14 items-center">

          {/* Left: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            {/* Ambient glow behind phone */}
            <div className="relative w-full max-w-[360px]">
              <div
                className="absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{
                  background: "radial-gradient(ellipse, rgba(212,255,43,0.07) 0%, transparent 70%)",
                  transform: "scale(1.2)",
                }}
              />
              <div
                style={{
                  animation: "phoneFloat 5s ease-in-out infinite",
                  aspectRatio: "3/4",
                  position: "relative",
                  width: "100%",
                }}
              >
                <Image
                  src="/phone-mockup.png"
                  alt="Smart assistant on mobile"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 1024px) 360px, 42vw"
                />
              </div>
            </div>
          </motion.div>

          <style jsx>{`
            @keyframes phoneFloat {
              0%, 100% { transform: translateY(0px) rotate(-1deg); }
              50% { transform: translateY(-14px) rotate(1deg); }
            }
          `}</style>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-8"
            >
              {t(content.shift.title, lang)}
            </motion.h2>

            <div className="flex flex-col gap-5">
              <motion.p
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-sora font-light text-[15px] text-fg/45 leading-relaxed"
              >
                {t(content.shift.p1, lang)}
              </motion.p>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-sora font-light text-[15px] text-fg/55 leading-relaxed"
              >
                {t(content.shift.p2, lang)}
              </motion.p>

              <motion.p
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-sora font-light text-[15px] text-fg/45 leading-relaxed"
              >
                {t(content.shift.p3, lang)}
              </motion.p>

              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="mt-2 border-l-2 border-accent/30 pl-5 py-1"
              >
                <p className="font-sora text-[15px] font-normal text-fg/75 leading-relaxed">
                  {t(content.shift.closer, lang)}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
