import VoidSection from "@/components/VoidSection";
import type { DirectPageDict } from "../lib/directi18n";

/**
 * DirectProblem — "Your operation is leaking money" section.
 * Wrapped in VoidSection for the pure-black background + parallax dot field.
 * Text is center-aligned per spec. Hard-cut top + bottom edges (no border-radius).
 */
export default function DirectProblem({ d }: { d: DirectPageDict }) {
  return (
    <VoidSection className="section-divider">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <p
          data-reveal
          className="font-label text-fg/28 mb-5"
          style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
        >
          {d.problem.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-8"
          style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "22ch" }}
        >
          {d.problem.headline}
        </h2>
        <p
          data-reveal
          className="font-sora font-light text-fg/55 leading-[1.9]"
          style={{ fontSize: "15px", maxWidth: "58ch" }}
        >
          {d.problem.body}
        </p>
      </div>
    </VoidSection>
  );
}
