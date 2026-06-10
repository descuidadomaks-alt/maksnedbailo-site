"use client";

import type { NewPageDict, TestimonialItem } from "../lib/i18n";

/**
 * Section 6b — TESTIMONIALS (trust).
 * Desktop: video testimonials left (~2/3), vertical auto-scroll quote
 * marquee right (~1/3). Mobile: videos stack on top, quotes become a
 * horizontal swipeable row (scroll-snap, animation disabled — see
 * .testimonial-marquee in globals.css). Quotes ported from the old
 * components/Proof.tsx CARDS via lib/i18n.ts TESTIMONIAL_ITEMS,
 * Corinna C. first.
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

function QuoteCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.014] p-4 flex flex-col gap-3">
      <p className="font-sora font-light text-fg/55 leading-[1.65]" style={{ fontSize: "12.5px" }}>
        &ldquo;{item.quote}&rdquo;
      </p>
      <div>
        <p className="font-sora text-fg/65 font-semibold" style={{ fontSize: "11px" }}>{item.author}</p>
        <p className="font-sora text-fg/28" style={{ fontSize: "10px" }}>{item.role}</p>
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

          {/* Quote marquee — ~1/3 on desktop, vertical auto-scroll; horizontal swipe on mobile */}
          <div data-reveal="d1" className="testimonial-marquee-wrap rounded-2xl border border-white/[0.05]" style={{ background: "rgba(255,255,255,0.008)" }}>
            <div className="testimonial-marquee">
              {[...items, ...items].map((item, i) => (
                <QuoteCard key={i} item={item} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
