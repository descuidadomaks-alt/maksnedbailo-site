"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";

function WhatsAppIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

export default function CTASection() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-divider py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[600px] mx-auto text-center"
        >
          {/* Thin accent line */}
          <div className="w-8 h-px bg-accent/40 mx-auto mb-8" />

          <h2 className="font-playfair font-normal text-3xl md:text-[38px] leading-tight mb-5">
            {t(content.cta.title, lang)}
          </h2>

          <p className="font-sora font-light text-[15px] text-fg/45 leading-relaxed mb-10 max-w-[480px] mx-auto">
            {t(content.cta.sub, lang)}
          </p>

          <div className="flex flex-col items-center gap-4">
            <a
              href={content.cta.cta1Link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-bg font-bold px-8 py-4 rounded-lg text-base hover:bg-accent/90 transition-all duration-200 w-full max-w-[340px] text-center"
            >
              {t(content.cta.cta1, lang)}
            </a>

            <a
              href={content.cta.cta2Link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 text-sm hover:text-green-300 transition-colors underline underline-offset-4 decoration-green-500/30"
            >
              <WhatsAppIcon />
              {t(content.cta.cta2, lang)}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
