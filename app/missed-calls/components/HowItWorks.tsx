import { HOW_IT_WORKS } from "../lib/config";
import { Dot } from "./Dot";

export function HowItWorks() {
  return (
    <section className="bg-[#f8f9fa] px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="oh-display text-center text-4xl text-[#171e19] sm:text-6xl">
          How it works<Dot />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((s) => (
            <div
              key={s.step}
              className="oh-card rounded-2xl border border-[#171e19]/10 bg-white p-6 shadow-sm"
            >
              <span className="oh-display flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe17c] text-lg text-[#171e19]">
                {s.step}
              </span>
              <h3 className="oh-display mt-4 text-xl text-[#171e19]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#171e19]/70">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
