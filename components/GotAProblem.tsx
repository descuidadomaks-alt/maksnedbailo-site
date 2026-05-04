"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BOOKING_LINK } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function GotAProblem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-accent"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-6 text-black"
          >
            Got a different problem? We&apos;ve probably solved one like it.
          </motion.h2>

          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-sora font-light text-[15px] leading-relaxed mb-4"
            style={{ color: "rgba(0,0,0,0.65)" }}
          >
            Most businesses we work with have more than one bottleneck. Slow
            responses, leaking leads, manual booking, content backlog, support
            that doesn&apos;t scale — they all eat the same dollar.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-sora font-light text-[15px] leading-relaxed mb-10"
            style={{ color: "rgba(0,0,0,0.65)" }}
          >
            Tell us what&apos;s broken. We&apos;ll tell you straight whether we can fix
            it, or who we&apos;d send you to.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white font-semibold px-7 py-3.5 rounded-lg text-sm hover:bg-black/85 transition-all duration-200"
            >
              Get your free audit →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
