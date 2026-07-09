import { Dot } from "./Dot";

/**
 * "Don't confuse us with an app" — sits directly after the value stack, before
 * the old/new way section. Repositions the offer against the two mental
 * models a visitor might already have (a cheap answering app, a full-time
 * hire) so neither anchor sticks. Center card is the hero (yellow border),
 * matching TiersSection's "highlight" treatment. Fixed min-height + stretch
 * items so the three cards line up with zero layout shift on any viewport.
 */

type Card = {
  name: string;
  body: string;
  variant: "plain" | "highlight";
};

const CARDS: Card[] = [
  {
    name: "$99 answering app",
    body: "Answers calls. That's it. YOU set it up, YOU write its answers, YOU fix it when it breaks. No website, no follow-up that converts, no ads, nobody accountable.",
    variant: "plain",
  },
  {
    name: "Overtime OS",
    body: "Your entire front office — website, calls, texts, follow-up, reviews — built, run, and tuned FOR you by a real team. And when you're ready to grow, we bring the customers too.",
    variant: "highlight",
  },
  {
    name: "Full-time office hire",
    body: "$3,500+/month. 40 hours a week, one call at a time, sick days included.",
    variant: "plain",
  },
];

export function AppComparison() {
  return (
    <section className="bg-[#f8f9fa] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="oh-display text-center text-4xl text-[#171e19] sm:text-6xl">
          Don&apos;t confuse us with an app<Dot />
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-[#171e19]/70">
          Apps hand you another job to manage. We take jobs off your plate.
        </p>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {CARDS.map((card) => {
            const highlight = card.variant === "highlight";
            return (
              <div
                key={card.name}
                className={`oh-card flex min-h-[240px] flex-col rounded-2xl p-7 sm:min-h-[260px] ${
                  highlight
                    ? "border-2 border-[#ffe17c] bg-[#fffdf5] text-[#171e19] shadow-2xl"
                    : "border border-[#171e19]/10 bg-white text-[#171e19]"
                }`}
              >
                <h3 className="oh-display text-2xl sm:text-3xl">{card.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#171e19]/70 sm:text-base">
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
