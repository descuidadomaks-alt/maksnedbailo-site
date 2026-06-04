/**
 * GotAProblemNew — identical to GotAProblem except:
 *   - Bottom CTA links to https://www.maksnedbailo.site/ai-map (not the free-audit zcal)
 *   - Button text: "Get your Strategic AI Map →"
 *
 * The shared GotAProblem.tsx is NOT modified so the live homepage is unaffected.
 * Used only on /new.
 */
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUpVariants } from "@/lib/animations";

const SERVICES = [
  "WhatsApp Automation",
  "AI Customer Service",
  "Custom Automated Flows",
  "Voice Agents",
  "Lead Capture Automation",
  "Appointment Booking AI",
  "Multilingual Chatbots",
  "CRM Integration",
  "Financial Automation",
  "Email Automation",
  "24/7 AI Support",
  "Sales Funnel Automation",
  "eCommerce AI",
  "Real Estate Lead Capture",
  "Hospitality Automation",
  "Healthcare Patient Intake",
  "Legal Intake Automation",
  "Restaurant Reservation AI",
  "Beauty Salon Booking",
  "After-Hours AI Support",
  "Customer Journey Automation",
  "WhatsApp Business API",
  "AI Response Systems",
  "Conversion Optimisation",
  "Outbound AI Sequences",
  "Booking & Scheduling AI",
];

// New CTA destination — /ai-map instead of the free-audit zcal link
const AI_MAP_LINK = "https://www.maksnedbailo.site/ai-map";

export default function GotAProblemNew() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();
  const fadeUp = fadeUpVariants(shouldReduce ?? false);

  const doubled = [...SERVICES, ...SERVICES];

  return (
    <section ref={ref} className="bg-accent">
      <div className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-playfair font-medium text-3xl md:text-4xl leading-tight mb-6 text-black"
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
              {/* CTA → /ai-map (was: free-audit zcal link) */}
              <a
                href={AI_MAP_LINK}
                className="inline-block bg-black font-semibold px-7 py-3.5 rounded-lg text-sm hover:bg-black/85 transition-all duration-200"
                style={{ color: "#D4FF2B" }}
              >
                Get your Strategic AI Map →
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services ticker */}
      <div
        className="w-full overflow-hidden flex items-center"
        style={{ height: "40px", background: "#000000" }}
      >
        <div className="ticker-track-services whitespace-nowrap flex">
          {doubled.map((service, i) => (
            <span
              key={i}
              className="font-sora text-[10px] font-light tracking-widest"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {service}
              <span style={{ color: "#D4FF2B", margin: "0 20px" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
