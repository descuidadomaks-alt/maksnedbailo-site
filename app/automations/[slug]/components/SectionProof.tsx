import Image from "next/image";
import type { ProspectData } from "../data";

const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export default function SectionProof({ data }: { data: ProspectData }) {
  return (
    <section className="section-divider py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-sora text-[10px] uppercase tracking-[3px] text-fg/25 text-center mb-10">
          Three conversations that show {data.agentName} isn&apos;t a generic chatbot.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.proofScreenshots.map((shot, i) => (
            <figure key={i} className="flex flex-col gap-3">
              <div
                className="relative w-full rounded-xl overflow-hidden border border-white/[0.05]"
                style={{ aspectRatio: "9/16" }}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR}
                />
              </div>
              <figcaption className="font-sora text-[11px] text-fg/35 text-center leading-snug px-1">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
