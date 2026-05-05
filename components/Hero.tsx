"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { content, t } from "@/lib/content";
import { EASING } from "@/lib/animations";
import MagneticButton from "@/components/MagneticButton";

const TOP_OFFSET = 64; // nav height

export default function Hero() {
  const { lang } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  // Parallax via useScroll — no scroll listeners, motion values only
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, shouldReduce ? 0 : -60]);

  // Mouse-following glow
  const rawX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 400);
  const rawY = useMotionValue(300);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 22, mass: 0.5 });
  const smoothY = useSpring(rawY, { stiffness: 55, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (shouldReduce) return;
    const handleMouseMove = (e: MouseEvent) => {
      const section = heroRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY, shouldReduce]);

  const fadeUp = (delay: number) => ({
    hidden: shouldReduce
      ? { opacity: 0 }
      : { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: shouldReduce ? 0.2 : 0.85, delay: shouldReduce ? 0 : delay, ease: EASING },
    },
  });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden lg:flex lg:items-center"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Animated mesh gradient background — desktop only ── */}
      {!shouldReduce && (
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0, opacity: 0.042 }}>
          <div
            className="mesh-orb-1 absolute rounded-full"
            style={{
              width: 700,
              height: 700,
              top: "-10%",
              right: "-5%",
              background: "radial-gradient(circle, rgba(212,255,43,1) 0%, transparent 65%)",
            }}
          />
          <div
            className="mesh-orb-2 absolute rounded-full"
            style={{
              width: 500,
              height: 500,
              bottom: "-5%",
              left: "-8%",
              background: "radial-gradient(circle, rgba(212,255,43,1) 0%, transparent 65%)",
            }}
          />
          <div
            className="mesh-orb-3 absolute rounded-full"
            style={{
              width: 400,
              height: 400,
              top: "35%",
              left: "35%",
              background: "radial-gradient(circle, rgba(212,255,43,1) 0%, transparent 65%)",
            }}
          />
        </div>
      )}

      {/* ── Ambient background orbs — desktop only ── */}
      <div
        className="hero-orb hidden lg:block pointer-events-none absolute rounded-full"
        style={{
          width: 640,
          height: 640,
          top: "5%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(212,255,43,0.055) 0%, transparent 68%)",
          zIndex: 0,
        }}
      />
      <div
        className="hero-orb-2 hidden lg:block pointer-events-none absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          bottom: "0%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(212,255,43,0.032) 0%, transparent 68%)",
          zIndex: 0,
        }}
      />

      {/* ── Mouse-following glow — desktop only ── */}
      <motion.div
        className="hidden lg:block pointer-events-none absolute rounded-full"
        style={{
          left: smoothX,
          top: smoothY,
          width: 720,
          height: 720,
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, rgba(212,255,43,0.042) 0%, transparent 62%)",
          zIndex: 0,
        }}
      />

      {/* ── Mobile spacer: promo bar (28px) + gap (8px) + nav (44px) = 80px, -15px ── */}
      <div className="lg:hidden" style={{ height: 65 }} />

      {/* ── Mobile: full-bleed square-ish image in normal flow ── */}
      <motion.div
        className="lg:hidden relative w-full overflow-hidden"
        style={{ aspectRatio: "9 / 10" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/hero-image.png"
          alt="Maks Nedbailo"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Top fade — wider gradient, transparent point reached sooner */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "25%",
            background: "linear-gradient(to bottom, #060608 0%, transparent 75%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "30%",
            background: "linear-gradient(to top, #060608 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-6 pb-12 lg:pt-16 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 lg:gap-6 items-center">

          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 text-center lg:text-left"
          >
            <motion.p
              variants={fadeUp(0.08)}
              className="text-[11px] uppercase tracking-[3.5px] text-accent/60 font-sora"
            >
              {t(content.hero.tag, lang)}
            </motion.p>

            <motion.h1
              variants={fadeUp(0.18)}
              className="font-playfair leading-tight"
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
              <MagneticButton>
                <a
                  href={content.hero.cta1Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-accent text-bg font-semibold px-6 py-3 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200 text-center"
                >
                  {t(content.hero.cta1, lang)}
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={content.hero.cta2Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-green-500/30 text-green-400 px-6 py-3 rounded-lg text-sm hover:border-green-500/55 hover:bg-green-500/5 transition-all duration-200"
                >
                  <WhatsAppIcon />
                  {t(content.hero.cta2, lang)}
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: Hero image — desktop only (lg+) with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex relative justify-center"
          >
            <div className="relative w-full max-w-[500px]" style={{ aspectRatio: "3/4" }}>
              {/* Parallax wrapper */}
              <motion.div
                className="absolute inset-0"
                style={{ y: parallaxY }}
              >
                <Image
                  src="/hero-image.png"
                  alt="Maks Nedbailo"
                  fill
                  className="object-contain object-bottom"
                  priority
                  sizes="(min-width: 1024px) 45vw, 0vw"
                />
              </motion.div>

              {/* Bottom fade */}
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
