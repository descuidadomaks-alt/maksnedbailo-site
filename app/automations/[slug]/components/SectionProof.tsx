import Image from "next/image";
import type { ProspectData } from "../data";

const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export default function SectionProof({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        {/* Section title — H2 at ~80% of hero H1 size/weight */}
        <h2
          data-reveal
          className="font-playfair font-normal text-center text-fg mb-14"
          style={{
            fontSize: "clamp(24px, 3.4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em",
          }}
        >
          Three conversations that show{" "}
          <em className="not-italic text-accent">{data.agentName}</em>{" "}
          isn&apos;t a generic chatbot.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.proofScreenshots.map((shot, i) => (
            <figure key={i} data-reveal={`d${i}`} className="flex flex-col gap-4">
              {/* Chat screenshot — 375×600 aspect (mobile chat) */}
              <div
                className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.018] shadow-[0_8px_48px_rgba(0,0,0,0.45)] hover:border-white/[0.1] hover:shadow-[0_12px_60px_rgba(0,0,0,0.5)] transition-all duration-400"
                style={{ aspectRatio: "375 / 600" }}
              >
                {shot.src ? (
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  /* Placeholder div until real screenshots are supplied */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/[0.015]">
                    <div
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center"
                      style={{ background: "rgba(212,255,43,0.03)" }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(240,236,230,0.18)"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                    <div className="text-center px-6">
                      <p
                        className="font-sora text-fg/20 mb-1"
                        style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}
                      >
                        Screenshot #{i + 1}
                      </p>
                      <p className="font-sora text-fg/12" style={{ fontSize: "9px" }}>
                        375 × 600 px
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <figcaption
                className="font-sora text-center text-fg/40 leading-snug px-2"
                style={{ fontSize: "12px" }}
              >
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
