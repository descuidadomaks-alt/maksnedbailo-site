const TRADES = ["Roofers", "HVAC", "Contractors", "Plumbers", "Electricians", "Solar"];

/**
 * Full-bleed trades marquee above the header. Rendered in normal document
 * flow (not fixed) so it scrolls away with the page while Nav — sticky, see
 * Nav.tsx — pins to the top once scrolled past. Content is doubled +
 * `translateX(-50%)` for a seamless loop, same technique as the root site's
 * AnnouncementBar (components/AnnouncementBar.tsx): the track is absolutely
 * positioned inside a `relative overflow-hidden` bar so it shrink-wraps to
 * its own (doubled) content width instead of stretching to the bar's width
 * — that's what makes -50% land exactly on one full copy.
 *
 * Positioning/animation both live in the `.oh-marquee-track` class (layout
 * tsx's scoped <style>), not Tailwind utilities, because the two states need
 * different `left`/`transform` values: animated runs from `left:0` and
 * slides to -50% of its own width; `prefers-reduced-motion` instead sets
 * `left:50%; transform:translateX(-50%)` (the standard unknown-width
 * centering trick) with the animation off, which reads as a static,
 * edge-cropped, centered full-bleed strip. Mixing a Tailwind translate
 * utility into the animated element would fight the keyframe's own
 * `transform`, so don't add one here — see the CSS comment for detail.
 *
 * Height is a fixed 32px (h-8) — Hero.tsx's `100svh` math subtracts this
 * plus Nav's 80px (h-20), so keep those three numbers in sync if any of
 * them change.
 */
export function TradesBar() {
  const items = [...TRADES, ...TRADES];

  return (
    <div className="relative h-8 w-full overflow-hidden bg-[#0d110e]">
      <div className="oh-marquee-track flex h-full items-center whitespace-nowrap">
        {items.map((trade, i) => (
          <span key={i} className="flex items-center text-[10px] font-bold uppercase tracking-[0.25em]">
            <span className={trade === "Contractors" ? "text-[#ffe17c]" : "text-[#b7c6c2]/70"}>
              {trade}
            </span>
            <span className="mx-4 text-[#b7c6c2]/25">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
