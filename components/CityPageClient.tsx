"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CityData } from "@/lib/cities";
import { BOOKING_LINK, WA_LINK } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const NAV_H = 64;
const BAR_H = 28;
const TOP_OFFSET = NAV_H;

// ── Icons ──────────────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.5.5 0 0 0 .615.612l5.782-1.517A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.374l-.36-.213-3.724.977.997-3.647-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#D4FF2B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ── City FAQ accordion ─────────────────────────────────────────────────────

function CityFAQItem({ q, a, index, inView }: { q: string; a: string; index: number; inView: boolean }) {
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
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-sora font-light text-[14px] text-fg/80 group-hover:text-fg transition-colors leading-relaxed">
          {q}
        </span>
        <span
          className={`shrink-0 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
            open ? "border-accent/50 rotate-45" : "group-hover:border-white/40"
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
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
            <p className="font-sora font-light text-[13px] text-fg/45 leading-relaxed pb-4 pr-8">
              {a}
            </p>
            {/* Subtle CTA at end of every answer */}
            <p className="pb-5 pr-8">
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sora text-[12px] text-accent/70 hover:text-accent underline underline-offset-4 decoration-accent/30 transition-colors"
              >
                ¿Quieres ver cómo funcionaría en tu negocio? → Auditoría gratuita
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function CityPageClient({ city }: { city: CityData }) {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);

  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });
  const testimonialInView = useInView(testimonialRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex items-center min-h-[90svh]"
        style={{ paddingTop: `${TOP_OFFSET + BAR_H}px` }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(212,255,43,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto px-6 py-16 w-full text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Link href="/" className="font-sora text-[11px] text-fg/30 hover:text-fg/60 transition-colors">
              Inicio
            </Link>
            <span className="text-fg/20 text-[11px]">/</span>
            <span className="font-sora text-[11px] text-fg/40">{city.name}</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[10px] uppercase tracking-[3.5px] text-accent/60 font-sora mb-5"
          >
            {city.hero.tag}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="font-playfair font-normal leading-tight mb-6"
            style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
          >
            {city.hero.h1}
            <br />
            <em className="text-accent not-italic italic">{city.hero.h1accent}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="font-sora font-light text-[15px] text-fg/50 max-w-[560px] mx-auto leading-relaxed mb-10"
          >
            {city.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-bg font-semibold px-7 py-3.5 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200 w-full sm:w-auto text-center"
            >
              Auditoría Gratuita para {city.name} →
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-green-500/30 text-green-400 px-6 py-3.5 rounded-lg text-sm hover:border-green-500/55 hover:bg-green-500/5 transition-all duration-200 w-full sm:w-auto"
            >
              <WhatsAppIcon />
              Hablar por WhatsApp
            </a>
          </motion.div>

          {/* City + industry tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {city.industries.map((ind) => (
              <span
                key={ind}
                className="font-sora text-[10px] text-fg/25 border border-white/[0.05] rounded-full px-3 py-1 capitalize"
              >
                {ind}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="section-divider py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {[
              { num: "73%", label: `de los clientes en ${city.name} compran al primero que responde — no al mejor` },
              { num: "19h", label: "tiempo medio de respuesta de las pymes en España" },
              { num: "<60s", label: "con lo que mis clientes responden en automático, 24/7", accent: true },
            ].map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                className={`h-full rounded-xl p-7 text-center border flex flex-col justify-center ${
                  stat.accent
                    ? "bg-accent/[0.04] border-accent/15"
                    : "bg-white/[0.015] border-white/[0.04]"
                }`}
              >
                <div
                  className={`font-playfair text-[44px] font-normal leading-none mb-3 ${
                    stat.accent ? "text-accent" : "text-accent"
                  }`}
                >
                  {stat.num}
                </div>
                <p className="font-sora text-[12px] text-fg/40 leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section ref={stepsRef} className="section-divider py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={stepsInView ? "visible" : "hidden"}
            className="font-playfair font-normal text-3xl md:text-4xl text-center mb-14"
          >
            La solución tarda 48 horas. Tú no tocas nada.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                title: "Auditoría Gratuita",
                desc: `Analizo cómo responde tu negocio en ${city.name} y te muestro exactamente dónde desaparecen los leads. 48 horas. No te cuesta nada.`,
              },
              {
                num: "02",
                title: "Construyo tu Asistente",
                desc: `Un asistente entrenado para tu negocio específico en ${city.region}: tus servicios, tu tono, tus preguntas más frecuentes. WhatsApp, web, o los dos.`,
              },
              {
                num: "03",
                title: "Solo pagas cuando funciona",
                desc: "30 días gratis. Si no genera resultados, no pagas nada. Sin contratos, sin permanencia. Yo asumo el riesgo.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={stepsInView ? "visible" : "hidden"}
                className="relative overflow-hidden rounded-xl border border-white/[0.04] p-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.005) 100%)",
                }}
              >
                <span className="absolute top-4 right-5 font-playfair text-[48px] text-accent/5 leading-none select-none">
                  {step.num}
                </span>
                <h3 className="font-sora text-[15px] font-semibold text-fg mb-3 pr-10">
                  {step.title}
                </h3>
                <p className="font-sora font-light text-[13px] text-fg/40 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      {city.testimonials.length > 0 && (
        <section ref={testimonialRef} className="section-divider py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6">
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={testimonialInView ? "visible" : "hidden"}
              className="font-playfair font-normal text-2xl md:text-3xl text-center mb-10"
            >
              Lo que dicen los negocios que ya trabajan conmigo
            </motion.h2>

            <div className={`grid grid-cols-1 ${city.testimonials.length > 1 ? "md:grid-cols-2" : ""} gap-5`}>
              {city.testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  animate={testimonialInView ? "visible" : "hidden"}
                  className="rounded-xl p-7"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <StarRow />
                  <blockquote className="font-sora font-light text-[14px] text-fg/70 leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <p className="font-sora text-[12px] font-semibold text-fg/70">{t.author}</p>
                  <p className="font-sora text-[11px] text-fg/30 mt-0.5">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CITY FAQ ──────────────────────────────────────────────────────── */}
      <section ref={faqRef} className="section-divider py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            className="font-playfair font-normal text-3xl md:text-4xl mb-12"
          >
            Preguntas que hacen los negocios de {city.name}
          </motion.h2>

          {city.faqItems.map((item, i) => (
            <CityFAQItem
              key={i}
              q={item.q}
              a={item.a}
              index={i}
              inView={faqInView}
            />
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="section-divider py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-playfair font-normal text-3xl md:text-4xl mb-5">
            ¿Cuántos clientes estás perdiendo{" "}
            <em className="text-accent not-italic italic">esta semana</em>?
          </h2>
          <p className="font-sora font-light text-[15px] text-fg/45 leading-relaxed mb-10 max-w-lg mx-auto">
            Hablo con negocios en {city.name} todos los meses. La auditoría dura 15 minutos, es gratuita, y te doy un número concreto de lo que te está costando no responder a tiempo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-bg font-semibold px-8 py-4 rounded-lg text-sm hover:bg-accent/90 transition-all duration-200 w-full sm:w-auto text-center"
            >
              Reserva tu Auditoría Gratuita →
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-green-500/30 text-green-400 px-6 py-4 rounded-lg text-sm hover:border-green-500/55 hover:bg-green-500/5 transition-all duration-200 w-full sm:w-auto"
            >
              <WhatsAppIcon />
              O escríbeme ahora
            </a>
          </div>
        </div>
      </section>

      {/* ── STICKY WHATSAPP (mobile) ───────────────────────────────────────── */}
      <div className="fixed bottom-6 left-0 right-0 px-5 z-40 sm:hidden">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-sora font-semibold text-[14px] py-4 rounded-xl shadow-lg"
        >
          <WhatsAppIcon size={20} />
          Hablar por WhatsApp ahora
        </a>
      </div>
    </>
  );
}
