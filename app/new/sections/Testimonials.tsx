"use client";

import { useEffect, useState } from "react";
import type { NewPageDict, TestimonialItem } from "../lib/i18n";

/**
 * Section 6b — TESTIMONIALS (trust).
 * Desktop: video testimonials left (~2/3), auto-advancing starred review
 * card right (~1/3). Mobile: videos stack on top, review card below.
 * Quotes ported from the old components/Proof.tsx CARDS via
 * lib/i18n.ts TESTIMONIAL_ITEMS, Corinna C. first (lime accent treatment,
 * matching the old AccentCard).
 */

const AUTO_ADVANCE_MS = 5000;

const VIDEOS = [
  { name: "Garrett Williams", company: "Econocraft Materials · USA", youtubeId: "3Gzbg1rI5Tg" },
  { name: "AJ", company: "Folkrm · US", youtubeId: "pVgC-3GciSw" },
];

function VideoEmbed({ youtubeId, name, company }: { youtubeId: string; name: string; company: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "9/16" }}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`}
          title={`Testimonial from ${name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
      <div className="text-left">
        <p className="font-sora text-[12px] font-semibold text-fg/65">{name}</p>
        <p className="font-sora text-[10px] text-fg/30 mt-0.5">{company}</p>
      </div>
    </div>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#D4FF2B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewSlider({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [items.length]);

  const item = items[index];
  const isAccent = index === 0;

  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full transition-colors duration-500"
      style={
        isAccent
          ? { background: "rgba(212,255,43,0.05)", border: "1px solid rgba(212,255,43,0.18)" }
          : { background: "rgba(255,255,255,0.014)", border: "1px solid rgba(255,255,255,0.05)" }
      }
    >
      <div key={index} className="testimonial-fade">
        <StarRow />
        <p className="font-sora font-light text-fg/65 leading-[1.7]" style={{ fontSize: "13.5px" }}>
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="mt-6">
        <p className="font-sora text-fg/75 font-semibold" style={{ fontSize: "12px" }}>{item.author}</p>
        <p className="font-sora text-fg/30 mt-0.5" style={{ fontSize: "10px" }}>{item.role}</p>
        <div className="flex gap-1.5 mt-5" role="tablist" aria-label="Reviews">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show review ${i + 1} of ${items.length}`}
              onClick={() => setIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? "18px" : "5px",
                height: "5px",
                background: i === index ? "rgba(212,255,43,0.7)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ d }: { d: NewPageDict }) {
  const items = d.testimonials.items;

  return (
    <section className="section-divider relative overflow-hidden py-16 md:py-24">
      {/* Soft section gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 760px 460px at 8% 100%, rgba(34,158,217,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">

        <div className="max-w-2xl mx-auto mb-12 text-center">
          <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            {d.testimonials.label}
          </p>
          <h2 data-reveal className="font-playfair font-normal text-fg mb-4 mx-auto" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "22ch" }}>
            {d.testimonials.headline}
          </h2>
          <p data-reveal className="font-sora font-light text-fg/45" style={{ fontSize: "14px" }}>
            {d.testimonials.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 items-stretch">

          {/* Videos — ~2/3 on desktop */}
          <div data-reveal="d0" className="grid grid-cols-2 gap-4 sm:gap-6" style={{ maxWidth: "640px" }}>
            {VIDEOS.map((video, i) => (
              <VideoEmbed key={i} youtubeId={video.youtubeId} name={video.name} company={video.company} />
            ))}
          </div>

          {/* Review slider — ~1/3 on desktop, auto-advances every ~5s, Corinna first */}
          <div data-reveal="d1">
            <ReviewSlider items={items} />
          </div>

        </div>

      </div>
    </section>
  );
}
