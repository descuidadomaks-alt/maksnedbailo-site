import Image from "next/image";
import { site } from "../lib/content";

/**
 * A single full-bleed atmospheric moment — replaces the old photo grid with
 * one editorial image + the pull-quote. Calm, sacred, breathing room.
 */
export function AtmosBand() {
  return (
    <section className="relative h-[58svh] min-h-[360px] w-full overflow-hidden">
      <Image
        src="/projects/parati/accent-1.jpg"
        alt="Ritual de masaje con piedras calientes en Para Ti, Santander"
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <p className="max-w-2xl text-center font-display text-3xl italic leading-snug text-ivory sm:text-4xl md:text-5xl">
          &ldquo;{site.reviews.pullQuote}&rdquo;
        </p>
      </div>
    </section>
  );
}
