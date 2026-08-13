import { Dot } from "./Dot";

/** Section 2 — the anti-SaaS pitch. Exact copy from the brief. */
export function ProblemSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <h2 className="oh-display text-3xl leading-tight text-[#171e19] sm:text-5xl">
          You don&apos;t need more software. You need your phone answered<Dot />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#171e19]/75 sm:text-lg">
          Software doesn&apos;t answer the phone when you&apos;re under a sink. Apps don&apos;t
          call back the lead who found you at 9pm. Another dashboard to log into is just another
          job. You need a front office that runs itself — not one more app to manage.
        </p>
      </div>
    </section>
  );
}
