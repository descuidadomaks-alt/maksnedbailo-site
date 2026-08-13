import { Check } from "lucide-react";

const ITEMS = [
  "24/7 AI receptionist — calls, texts, and website chat answered instantly",
  "Emergency lead triage — real jobs prioritized, tire-kickers filtered",
  "5-star review engine — automated follow-up that wins local Google search",
  "A custom AI-ready website + hosting — built to convert, included",
  "Done-for-you build & management — we build it, tune it, and run it; you never touch the code",
];

/**
 * Section 4 — what you get. Outcomes, not features; no price, no totals,
 * no strikethrough values (unlike the sibling pages' PricingCard.tsx,
 * which this deliberately doesn't reuse).
 */
export function Deliverables() {
  return (
    <section className="bg-[#171e19] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="oh-display text-center text-3xl text-white sm:text-5xl">What you get</h2>

        <ul className="mt-10 space-y-4">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#ffe17c]/15 text-[#ffe17c]"
              >
                <Check className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-base leading-snug text-white/85 sm:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
