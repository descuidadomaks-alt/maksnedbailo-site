"use client";

/**
 * The body figure — 100% static/decorative. Uses the client-provided artwork
 * (public/projects/parati/body_svg.svg) as a plain <img>, completely
 * non-interactive (aria-hidden, no handlers, no cursor, not focusable).
 *
 * Zone "highlighting" is NOT done by touching the artwork's paths — it's a
 * soft absolutely-positioned gold glow overlaid on top, positioned per zone
 * as a percentage band of the figure's height. One-way data flow: the parent
 * owns `activeZone` state (set only by the text zone buttons) and this
 * component only ever reflects it.
 *
 * Color note: the artwork's native fill (#c2a15c) is already, to the eye,
 * identical to the brand gold (#C2A05B) — a 1-unit-per-channel difference.
 * No recolor filter is applied; forcing a CSS filter for a sub-pixel hex
 * difference risks introducing visible drift elsewhere in the image.
 */

const ZONE_ORDER = ["rostro", "espalda", "cuerpo", "piernas"] as const;

// Percentage bands (top / height) within the figure's bounding box, tuned
// visually against the actual artwork proportions.
const ZONE_BANDS: Record<string, { top: number; height: number }> = {
  rostro: { top: 0, height: 15 },
  espalda: { top: 9, height: 30 },
  cuerpo: { top: 0, height: 100 },
  piernas: { top: 46, height: 54 },
};

export function BodyFigure({
  activeZone,
  reduce,
  className = "",
}: {
  activeZone: string;
  reduce: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative select-none ${className}`}
      style={{ aspectRatio: "479.45 / 1428.67" }}
    >
      <img
        src="/projects/parati/body_svg.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ filter: "drop-shadow(0 14px 30px rgba(154,123,51,0.16))" }}
      />

      {ZONE_ORDER.map((id) => {
        const band = ZONE_BANDS[id];
        const isActive = id === activeZone;
        const isWhole = id === "cuerpo";
        return (
          <div
            key={id}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0"
            style={{
              top: `${band.top}%`,
              height: `${band.height}%`,
              opacity: isActive ? 1 : 0,
              transition: reduce ? "none" : "opacity 0.4s ease",
              background: isWhole
                ? "linear-gradient(180deg, rgba(194,160,91,0.22), rgba(194,160,91,0.16) 50%, rgba(194,160,91,0.22))"
                : "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(194,160,91,0.45) 0%, rgba(194,160,91,0.18) 55%, rgba(194,160,91,0) 80%)",
            }}
          />
        );
      })}
    </div>
  );
}
