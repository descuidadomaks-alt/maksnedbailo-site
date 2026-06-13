"use client";

import Link from "next/link";
import type { ShortPageDict } from "../lib/i18n";
import { SCORE_TARGET } from "@/app/new/lib/config";

export default function SectionBottleneckScore({ d }: { d: ShortPageDict }) {
  const b = d.bottleneckScore;

  return (
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-lg mx-auto px-6 text-center">

        <p data-reveal className="font-label text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {b.label}
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-4"
          style={{ fontSize: "clamp(20px, 2.8vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
        >
          {b.headline}
        </h2>

        <p data-reveal className="font-sora font-light text-fg/55 leading-[1.85] mb-8" style={{ fontSize: "14px", maxWidth: "48ch", marginInline: "auto" }}>
          {b.body}
        </p>

        <Link
          data-reveal="d1"
          href={SCORE_TARGET}
          className="group inline-flex items-center justify-center gap-2.5 font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
          style={{
            fontSize: "14px",
            padding: "15px 32px",
            minHeight: "52px",
            letterSpacing: "-0.01em",
            color: "rgba(212,255,43,0.85)",
            border: "1px solid rgba(212,255,43,0.22)",
            background: "rgba(212,255,43,0.04)",
          }}
        >
          {b.cta}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
        </Link>

      </div>
    </section>
  );
}
