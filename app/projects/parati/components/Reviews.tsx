import { site } from "../lib/content";
import { RATING, REVIEW_COUNT } from "../lib/config";
import { SectionHeading } from "./SectionHeading";
import { ReviewsSlider } from "./ReviewsSlider";
import { Reveal } from "./Reveal";

/**
 * Reseñas — real Google reviews as a swipeable slider.
 * Pull-quote accent + a link out to the Google Maps profile (new tab).
 */
export function Reviews() {
  return (
    <section id="resenas" className="bg-cream px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-content">
        <SectionHeading
          eyebrow={site.reviews.eyebrow}
          title={site.reviews.heading(RATING)}
        />

        <Reveal className="mt-8 text-center">
          <p className="font-display text-2xl italic text-gold-deep sm:text-3xl">
            &ldquo;{site.reviews.pullQuote}&rdquo;
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ReviewsSlider reviews={[...site.reviews.items]} />
        </Reveal>

        <Reveal className="mt-10 text-center">
          <a
            href={site.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-jost text-sm text-gold-deep underline-offset-4 transition-colors hover:text-charcoal hover:underline"
          >
            {site.reviews.moreLink(REVIEW_COUNT)}
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
