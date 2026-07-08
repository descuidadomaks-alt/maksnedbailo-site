/**
 * Section 7 — high-contrast testimonial grid (center card dark, offset down).
 *
 * {/* PLACEHOLDER — replace with REAL testimonials only. Do not publish
 *     fabricated reviews. *\/}
 *
 * This component is intentionally NOT rendered in page.tsx until real reviews
 * exist. Build is complete so it can be dropped in the moment they do — wire
 * it into the page between TiersSection and FinalCTA, and replace REVIEWS below.
 */

const REVIEWS = [
  {
    quote: "PLACEHOLDER — real client quote goes here. Do not publish until real.",
    name: "Owner name",
    role: "Business — city",
    dark: false,
  },
  {
    quote: "PLACEHOLDER — real client quote goes here. Do not publish until real.",
    name: "Owner name",
    role: "Business — city",
    dark: true,
  },
  {
    quote: "PLACEHOLDER — real client quote goes here. Do not publish until real.",
    name: "Owner name",
    role: "Business — city",
    dark: false,
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="oh-display mb-10 text-center text-4xl text-[#171e19] sm:text-6xl">
          What owners say
        </h2>
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure
              key={i}
              className={`oh-card rounded-2xl border p-7 ${
                r.dark
                  ? "border-[#b7c6c2]/10 bg-[#171e19] text-white md:translate-y-4"
                  : "border-[#171e19]/10 bg-white text-[#171e19]"
              }`}
            >
              <div className="mb-4 text-2xl tracking-widest text-[#ffe17c]">★★★★★</div>
              <blockquote
                className={`text-lg font-medium ${r.dark ? "text-white" : "text-[#171e19]/80"}`}
              >
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-12 w-12 flex-none rounded-full bg-[#b7c6c2] grayscale" />
                <span>
                  <span className="oh-display block text-base">{r.name}</span>
                  <span className={`text-sm ${r.dark ? "text-white/60" : "text-[#171e19]/55"}`}>
                    {r.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
