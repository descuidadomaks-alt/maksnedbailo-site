"use client";

/**
 * The ritual-explorer centerpiece: a single continuous-outline, unisex
 * standing figure (front view, arms slightly away from the torso, legs
 * slightly apart — no musculature, no inner lines, no facial features).
 *
 * Built from one hand-placed point list smoothed into a closed Catmull-Rom
 * spline, so the whole body is ONE path — proportions: head ≈ 1/7.5 of total
 * height, shoulders ≈ 2 head-widths. Iterated visually until it read cleanly
 * at small sizes (this is the centerpiece of the page — treated like a logo).
 *
 * Zone highlighting doesn't split the path into segments: a translucent gold
 * band (18% opacity) is clipped to the body outline for the active zone's
 * y-range, and the SAME outline is redrawn — clipped to that same band, at a
 * bolder stroke — layered on top of the thin always-visible base outline.
 */

const CX = 110;
export const BODY_VIEWBOX = "0 0 220 640";

type Pt = [number, number];

// Right-half anchor points, head-top to crotch. Mirrored below for the left.
const RIGHT: Pt[] = [
  [136, 24], [150, 56], [142, 90], [124, 102], [148, 110],
  [182, 132], [196, 208], [194, 268], [184, 336],
  [170, 372], [154, 372], [160, 340], [166, 286], [162, 222], [152, 176],
  [146, 158], [138, 196], [130, 250],
  [158, 316], [160, 368], [148, 434], [140, 502], [132, 556],
  [156, 586], [138, 606], [118, 592],
  [122, 558], [120, 500], [118, 434], [118, 368],
];
const HEAD_TOP: Pt = [110, 18];
const CROTCH: Pt = [110, 336];

function smoothClosedPath(pts: Pt[]): string {
  const n = pts.length;
  const d: string[] = [`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(
      `C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
    );
  }
  d.push("Z");
  return d.join(" ");
}

const mirror = ([x, y]: Pt): Pt => [2 * CX - x, y];
const FULL_POINTS: Pt[] = [HEAD_TOP, ...RIGHT, CROTCH, ...RIGHT.slice().reverse().map(mirror)];
export const BODY_PATH_D = smoothClosedPath(FULL_POINTS);

/** Vertical band (SVG user units) each zone occupies, for the fill + bold-stroke overlay. */
export const ZONE_BANDS: Record<string, { y: number; h: number }> = {
  rostro: { y: 6, h: 114 },
  espalda: { y: 100, h: 162 },
  cuerpo: { y: 6, h: 624 },
  piernas: { y: 300, h: 330 },
};

export const ZONE_ORDER = ["rostro", "espalda", "cuerpo", "piernas"] as const;

export function BodySilhouette({
  activeZone,
  onSelectZone,
  onHoverZone,
  reduce,
  className = "",
  zoneLabels,
}: {
  activeZone: string;
  onSelectZone: (id: string) => void;
  onHoverZone?: (id: string | null) => void;
  reduce: boolean;
  className?: string;
  zoneLabels: Record<string, string>;
}) {
  const band = ZONE_BANDS[activeZone];

  return (
    <svg
      viewBox={BODY_VIEWBOX}
      className={className}
      style={{ filter: "drop-shadow(0 14px 30px rgba(154,123,51,0.16))" }}
      role="img"
      aria-label="Cuerpo para elegir la zona a cuidar"
    >
      <defs>
        <clipPath id="pt-body-clip">
          <path d={BODY_PATH_D} />
        </clipPath>
        {ZONE_ORDER.map((id) => (
          <clipPath key={id} id={`pt-band-${id}`}>
            <rect x={0} y={ZONE_BANDS[id].y} width={220} height={ZONE_BANDS[id].h} />
          </clipPath>
        ))}
      </defs>

      {/* base outline — always visible, thin, muted */}
      <path d={BODY_PATH_D} fill="none" stroke="#CBB889" strokeWidth={1.6} />

      {/* active-zone translucent fill, clipped to the body outline + zone band */}
      <g clipPath="url(#pt-body-clip)">
        {band ? (
          <g clipPath={`url(#pt-band-${activeZone})`} style={{ transition: reduce ? "none" : "opacity .35s ease" }}>
            <rect x={0} y={0} width={220} height={640} fill="#C2A05B" fillOpacity={0.18} />
          </g>
        ) : null}
      </g>

      {/* active-zone bold outline segment (same path, clipped to the band) */}
      {band ? (
        <g clipPath={`url(#pt-band-${activeZone})`} style={{ transition: reduce ? "none" : "opacity .35s ease" }}>
          <path d={BODY_PATH_D} fill="none" stroke="#9A7B33" strokeWidth={2.4} />
        </g>
      ) : null}

      {/* transparent, full-width tap targets — generous hit area per zone */}
      {ZONE_ORDER.map((id) => {
        const b = ZONE_BANDS[id];
        return (
          <rect
            key={id}
            x={0}
            y={b.y}
            width={220}
            height={b.h}
            fill="transparent"
            role="button"
            tabIndex={0}
            aria-label={zoneLabels[id] ?? id}
            aria-pressed={activeZone === id}
            onClick={() => onSelectZone(id)}
            onMouseEnter={() => onHoverZone?.(id)}
            onMouseLeave={() => onHoverZone?.(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectZone(id);
              }
            }}
            style={{ cursor: "pointer", outline: "none" }}
          />
        );
      })}
    </svg>
  );
}
