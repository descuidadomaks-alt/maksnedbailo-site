"use client";

import { useEffect, useRef } from "react";
import { BODY_GROUP_IDS, ZONE_GROUP_MAP, FAINT_OPACITY, ACTIVE_OPACITY } from "../lib/bodyFigure";

/**
 * The body figure — 100% static/decorative artwork (New_body.svg), fully
 * non-interactive (aria-hidden, no handlers, no cursor, not focusable).
 *
 * The artwork itself is pre-composed into four named groups (Head,
 * Shoulders, Body, legs) sitting under a permanent full-detail outline
 * layer. "Highlighting" a zone means raising ONLY that zone's group(s) to
 * full opacity while the rest stay faint — no separate glow/overlay shapes.
 *
 * `initialMarkup` arrives pre-processed server-side (see page.tsx) with the
 * correct opacity for the DEFAULT zone already baked in as inline styles, so
 * there's no flash-then-correct on first paint. Zone switches after that are
 * plain DOM opacity writes on the already-mounted nodes — no re-render of
 * the SVG string, no remount, no layout impact (opacity only).
 *
 * One-way data flow: the parent owns `activeZone` (set only by the text
 * zone buttons) and this component only ever reflects it.
 */
export function BodyFigure({
  initialMarkup,
  activeZone,
  reduce,
  className = "",
}: {
  initialMarkup: string;
  activeZone: string;
  reduce: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const activeGroups = new Set(ZONE_GROUP_MAP[activeZone] ?? []);
    for (const id of BODY_GROUP_IDS) {
      const el = root.querySelector<SVGGElement>(`#${id}`);
      if (!el) continue;
      el.style.transition = reduce ? "none" : "opacity 0.4s ease";
      el.style.opacity = String(activeGroups.has(id) ? ACTIVE_OPACITY : FAINT_OPACITY);
    }
  }, [activeZone, reduce]);

  return (
    <div
      aria-hidden="true"
      className={`relative select-none ${className}`}
      style={{ aspectRatio: "479.46 / 1428.68" }}
    >
      <div
        ref={wrapRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full [&>svg]:h-full [&>svg]:w-full"
        style={{ filter: "drop-shadow(0 14px 30px rgba(154,123,51,0.16))" }}
        // Static, trusted, build-time asset (see lib/bodyFigure.ts) — not user input.
        dangerouslySetInnerHTML={{ __html: initialMarkup }}
      />
    </div>
  );
}
