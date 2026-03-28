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
            <div className="relative w-full max-w-[340px]" style={{ aspectRatio: "3/4" }}>
              <Image
                src="/phone-mockup.png"
                alt="Smart assistant on mobile"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 340px, 42vw"
              />
            </div>
          </motion.div>

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

              <motion.blockquote
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="border-l-2 border-accent/20 pl-4 italic text-accent/50 font-playfair text-lg leading-relaxed mt-2"
              >
                {t(content.shift.closer, lang)}
              </motion.blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
