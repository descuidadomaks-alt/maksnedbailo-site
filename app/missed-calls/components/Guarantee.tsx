import { GUARANTEE_HEADLINE, GUARANTEE_EXCLUSIONS } from "../lib/config";
import { Dot } from "./Dot";

export function Guarantee() {
  return (
    <section className="bg-[#171e19] px-5 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="oh-display text-4xl sm:text-6xl">
          The guarantee<Dot />
        </h2>
        <p className="oh-display mx-auto mt-6 max-w-xl text-2xl leading-tight text-[#ffe17c] sm:text-3xl">
          {GUARANTEE_HEADLINE}
        </p>

        <div className="oh-card mx-auto mt-10 max-w-lg rounded-xl border border-[#b7c6c2]/15 bg-[#0f1410] p-6 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-white/50">
            Doesn&apos;t apply to
          </p>
          <ul className="mt-3 space-y-2">
            {GUARANTEE_EXCLUSIONS.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-white/60">
                <span aria-hidden>—</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
