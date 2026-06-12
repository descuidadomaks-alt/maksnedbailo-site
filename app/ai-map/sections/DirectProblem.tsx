import ElevatorField from "@/app/new/components/ElevatorField";
import type { DirectPageDict } from "../lib/directi18n";

/**
 * DirectProblem — "Your operation is leaking money" section.
 * Wrapped in the homepage's ElevatorField for the tunnel-depth dot shaft
 * (same look as the Mechanism section on the homepage). `clip` keeps the
 * canvas inside this section so the neighbouring solid sections and their
 * thin dividers stay untouched; cameraOffset starts the camera mid-shaft so
 * floors are visible above AND below. Content sits in the same
 * .map-content-panel glass treatment as the homepage Mechanism section,
 * with the same scroll-reveal.
 */
export default function DirectProblem({ d }: { d: DirectPageDict }) {
  return (
    <ElevatorField className="section-divider" clip cameraSpan={0.1} cameraOffset={0.42}>
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div data-reveal className="map-content-panel w-full flex flex-col items-center text-center">
          <p
            className="font-label text-fg/28 mb-5"
            style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
          >
            {d.problem.label}
          </p>
          <h2
            className="font-playfair font-normal text-fg mb-6"
            style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em", maxWidth: "22ch" }}
          >
            {d.problem.headline}
          </h2>
          <p
            className="font-sora font-light text-fg/55 leading-[1.9]"
            style={{ fontSize: "15px", maxWidth: "58ch" }}
          >
            {d.problem.body}
          </p>
        </div>
      </div>
    </ElevatorField>
  );
}
