"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";

// Bar is now in normal flow (28px); nav is fixed at 64px → only nav height needed
const TOP_OFFSET = 64;

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function Hero() {
  const { lang } = useLang();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxY = scrollY * 0.1;

  return (
    <section
      ref={heroRef}
      className="relative flex items-center"
      style={{ paddingTop: `${TOP_OFFSET}px`, minHeight: "100svh" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-6 items-center">

          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.p
              variants={fadeUp(0.08)}
              className="text-[11px] uppercase tracking-[3.5px] text-accent/60 font-sora"
            >
              {t(content.hero.tag, lang)}
            </motion.p>

            <motion.h1
              variants={fadeUp(0.18)}
              className="font-playfair font-normal leading-tight"
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
            >
              {t(content.hero.h1line1, lang)}
              <br />
              <em className="text-accent not-italic italic">
                {t(content.hero.h1line2, lang)}
              </em>
            </motion.h1>

            <motion.p
              variants={fadeUp(0.3)}
              className="font-sora font-light text-[15px] text-fg/50 max-w-[460px] leading-relaxed mx-auto lg:mx-0"
            >
              {t(content.hero.sub, lang)}
            </motion.p>

            <motion.div
              variants={fadeUp(0.42)}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href={content.hero.cta1Link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-bg font-semibold px-6 py-3 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200 text-center"
              >
                {t(content.hero.cta1, lang)}
              </a>
              <a
                href={content.hero.cta2Link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-green-500/30 text-green-400 px-6 py-3 rounded-lg text-sm hover:border-green-500/55 hover:bg-green-500/5 transition-all duration-200"
              >
                <WhatsAppIcon />
                {t(content.hero.cta2, lang)}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Hero image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[500px]" style={{ aspectRatio: "3/4" }}>
              {/* Parallax wrapper */}
              <div
                className="absolute inset-0"
                style={{
                  transform: `translateY(${-parallaxY}px)`,
                  transition: "transform 0.08s linear",
                }}
              >
                <Image
                  src="/hero-image.png"
                  alt="Maks Nedbailo"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>

              {/* Bottom fade so image bleeds into bg */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, #060608 0%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}
