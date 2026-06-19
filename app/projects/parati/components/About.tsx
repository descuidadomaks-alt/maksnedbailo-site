import Image from "next/image";
import { site } from "../lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/**
 * Sobre mí — two columns on desktop, stacked on mobile.
 * Portrait + warm first-person bio: authority first, then the personal why.
 */
export function About() {
  return (
    <section id="sobre-mi" className="bg-ivory px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-content items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal className="order-1 md:order-none">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-soft border border-gold/20 shadow-card">
            <Image
              src="/projects/parati/portrait.jpg"
              alt={site.about.portraitAlt}
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="order-2 md:order-none" delay={0.1}>
          <SectionHeading
            eyebrow={site.about.eyebrow}
            title={site.about.heading}
            align="left"
          />
          <p className="mt-6 font-display text-xl italic leading-relaxed text-charcoal/80">
            {site.about.authority}
          </p>
          {site.about.body.map((p, i) => (
            <p
              key={i}
              className="mt-4 font-jost text-base leading-relaxed text-charcoal/70"
            >
              {p}
            </p>
          ))}
          <p className="mt-6 font-display text-lg text-gold-deep">
            {site.about.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
