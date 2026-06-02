import type { DirectPageDict } from "../lib/directi18n";

export default function DirectProblem({ d }: { d: DirectPageDict }) {
  return (
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.problem.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-8"
          style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          {d.problem.headline}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/55 leading-[1.9]" style={{ fontSize: "15px", maxWidth: "62ch" }}>
          {d.problem.body}
        </p>
      </div>
    </section>
  );
}
