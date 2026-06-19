import Image from "next/image";
import { site } from "../lib/content";
import { SectionHeading } from "./SectionHeading";
import { RevealGroup, RevealItem } from "./Reveal";

/**
 * Galería — 6-image grid, soft hover zoom. Below-the-fold → lazy loaded.
 */
export function Gallery() {
  const images = [1, 2, 3, 4, 5, 6];

  return (
    <section id="galeria" className="bg-ivory px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow={site.gallery.eyebrow}
          title={site.gallery.heading}
        />

        <RevealGroup
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
          stagger={0.08}
        >
          {images.map((n) => (
            <RevealItem
              key={n}
              className="group relative aspect-square overflow-hidden rounded-soft border border-gold/15"
            >
              <Image
                src={`/projects/parati/gallery-${n}.jpg`}
                alt={site.gallery.imageAlt(n)}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
