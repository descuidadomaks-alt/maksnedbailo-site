import { site } from "../lib/content";
import { SectionHeading } from "./SectionHeading";
import { ReviewCard } from "./ReviewCard";
import { RevealGroup, Reveal } from "./Reveal";

/**
 * Reseñas — the 3 real Google reviews (verbatim, from context.md).
 * Pull-quote accent + a small link out to the Google Maps profile.
 */
export function Reviews() {
  return (
    <section id="resenas" className="bg-cream px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow={site.reviews.eyebrow}
          title={site.reviews.heading}
        />

        <Reveal className="mt-8 text-center">
          <p className="font-display text-2xl italic text-gold-deep sm:text-3xl">
            &ldquo;{site.reviews.pullQuote}&rdquo;
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {site.reviews.items.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <a
            href={site.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-jost text-sm text-gold-deep underline-offset-4 transition-colors hover:text-charcoal hover:underline"
          >
            {site.reviews.moreLink}
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
