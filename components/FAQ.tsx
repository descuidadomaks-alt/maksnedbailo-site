"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FAQItem({
  q,
  a,
  index,
  inView,
}: {
  q: string;
  a: string;
  index: number;
  inView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      custom={index + 1}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-4 group"
      >
        <span className="font-sora font-light text-[15px] text-fg/80 group-hover:text-fg transition-colors leading-relaxed">
          {q}
        </span>
        <span
          className={`shrink-0 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
            open ? "border-accent/50 rotate-45" : "group-hover:border-white/40"
          }`}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1V9M1 5H9"
              stroke={open ? "#D4FF2B" : "rgba(240,236,230,0.5)"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sora font-light text-[14px] text-fg/45 leading-relaxed pb-6 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-divider py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-[700px] mx-auto">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-playfair font-normal text-3xl md:text-4xl leading-tight mb-12"
          >
            {t(content.faq.title, lang)}
          </motion.h2>

          <div>
            {content.faq.items.map((item, i) => (
              <FAQItem
                key={i}
                q={t(item.q, lang)}
                a={t(item.a, lang)}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
