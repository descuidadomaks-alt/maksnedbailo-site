"use client";

import { useCallback, useRef, useState } from "react";
import type { NewPageDict, TestimonialItem } from "../lib/i18n";

/**
 * Section 6b — TESTIMONIALS (trust).
 * Desktop: video testimonials left (~2/3), vertical slider of starred
 * review cards right (~1/3). Mobile: videos stack on top, review cards
 * become a horizontal swipeable row. Prev/next buttons drive the slider
 * on both axes. Quotes ported from the old components/Proof.tsx CARDS via
 * lib/i18n.ts TESTIMONIAL_ITEMS, Corinna C. first (lime accent treatment,
 * matching the old AccentCard).
 */

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

function QuoteCard({ item, accent }: { item: TestimonialItem; accent: boolean }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={
        accent
          ? { background: "rgba(212,255,43,0.05)", border: "1px solid rgba(212,255,43,0.18)" }
          : { background: "rgba(255,255,255,0.014)", border: "1px solid rgba(255,255,255,0.05)" }
      }
    >
      <StarRow />
      <p className="font-sora font-light text-fg/65 leading-[1.65]" style={{ fontSize: "12.5px" }}>
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-auto">
        <p className="font-sora text-fg/75 font-semibold" style={{ fontSize: "11px" }}>{item.author}</p>
        <p className="font-sora text-fg/30 mt-0.5" style={{ fontSize: "10px" }}>{item.role}</p>
      </div>
    </div>
  );
}

function ChevronIcon({ dir }: { dir: "prev" | "next" }) {
  const d = dir === "prev" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13";
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Vertical slider on desktop (lg+, scroll-snap-y, matches video column
 * height), horizontal swipe row on mobile (scroll-snap-x). Prev/next
 * buttons scroll one "page" in whichever axis is active.
 */
function TestimonialSlider({ items }: { items: TestimonialItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isVertical = window.matchMedia("(min-width: 1024px)").matches;
    const pos = isVertical ? el.scrollTop : el.scrollLeft;
    const max = isVertical ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
    setCanPrev(pos > 4);
    setCanNext(pos < max - 4);
  }, []);

  const scrollByStep = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const isVertical = window.matchMedia("(min-width: 1024px)").matches;
    if (isVertical) {
      const amount = el.clientHeight * 0.9;
      el.scrollBy({ top: dir === "next" ? amount : -amount, behavior: "smooth" });
    } else {
      const amount = el.clientWidth * 0.9;
      el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
    }
  };

  return (
    <div className="testimonial-slider-wrap h-full min-h-0 flex flex-col">
      <div ref={scrollRef} onScroll={handleScroll} className="testimonial-slider flex-1 min-h-0">
        {items.map((item, i) => (
          <QuoteCard key={i} item={item} accent={i === 0} />
        ))}
      </div>
      <div className="flex gap-2 mt-4 justify-center lg:justify-start shrink-0">
        <button
          type="button"
          onClick={() => scrollByStep("prev")}
          disabled={!canPrev}
          aria-label="Previous reviews"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
          style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
        >
          <ChevronIcon dir="prev" />
        </button>
        <button
          type="button"
          onClick={() => scrollByStep("next")}
          disabled={!canNext}
          aria-label="Next reviews"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20"
          style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
        >
          <ChevronIcon dir="next" />
        </button>
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

          {/* Review slider — ~1/3 on desktop (vertical), horizontal swipe on mobile, Corinna first */}
          <div data-reveal="d1" className="h-full min-h-0">
            <TestimonialSlider items={items} />
          </div>

        </div>

      </div>
    </section>
  );
}
