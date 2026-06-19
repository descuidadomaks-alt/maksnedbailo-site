import type { Review } from "../lib/content";
import { RevealItem } from "./Reveal";

/** Quiet quote card — serif body, gold quote mark, first name + stars. */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <RevealItem
      as="article"
      className="flex h-full flex-col rounded-soft border border-gold/15 bg-ivory p-7 sm:p-8"
    >
      <span aria-hidden className="font-display text-5xl leading-none text-gold/60">
        &ldquo;
      </span>

      <blockquote className="-mt-3 flex-1 font-display text-lg leading-relaxed text-charcoal/85">
        {review.quote}
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-gold/15 pt-5">
        <div className="flex flex-col">
          <span className="font-jost text-sm font-medium text-charcoal">
            {review.name}
          </span>
          {review.meta ? (
            <span className="font-jost text-xs text-charcoal/50">
              {review.meta}
            </span>
          ) : null}
        </div>
        <span
          className="ml-auto text-gold"
          aria-label={`${review.stars} de 5 estrellas`}
        >
          {"★".repeat(review.stars)}
        </span>
      </div>
    </RevealItem>
  );
}
