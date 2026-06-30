/**
 * New section — the anti-template wedge. Short, punchy callout right after
 * Problem/Solution that separates this offer from the generic GoHighLevel
 * dashboards every other "AI agency" resells. Plain band, no card chrome —
 * reads as a statement, not another feature box.
 */
export function AntiTemplate() {
  return (
    <section className="border-y border-[#171e19]/10 bg-[#f8f9fa] py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="oh-display text-3xl text-[#171e19] sm:text-4xl">
          Not another GoHighLevel template.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#171e19]/70">
          Every other agency hands you the same generic dashboard every contractor in town
          already has. We build yours custom — your website, your pricing, your voice.
          Different by design, so you stand out instead of blending in.
        </p>
      </div>
    </section>
  );
}
