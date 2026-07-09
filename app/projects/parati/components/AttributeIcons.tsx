import type { Objetivo, Service } from "../lib/content";

/**
 * The "tobacco-tin" attribute row: presión (dots) · objetivo (icon) ·
 * duración (clock) · differentiator tag. Thin gold-line icons matching the
 * body figure's stroke weight.
 */

const OBJETIVO_LABEL: Record<Objetivo, string> = {
  relajacion: "Relajación",
  tension: "Tensión muscular",
  circulacion: "Circulación",
  hidratacion: "Hidratación",
  lifting: "Lifting",
  limpieza: "Renovación",
  energia: "Energía",
};

function PressureDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`inline-block h-[7px] w-[7px] rounded-full ${
            n <= level ? "bg-gold-deep" : "border border-gold-deep/40"
          }`}
        />
      ))}
    </span>
  );
}

function ObjetivoGlyph({ kind, className = "h-4 w-4" }: { kind: Objetivo; className?: string }) {
  const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };
  switch (kind) {
    case "relajacion":
      // wave
      return (
        <svg {...common} aria-hidden>
          <path d="M2 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
          <path d="M2 10c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" opacity="0.55" />
        </svg>
      );
    case "tension":
      // spiral / knot
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3c-4 1-6 4-4 7s-1 4-3 3c2 3 6 3 8 0s0-5-2-6c3-1 5 1 5 3" />
        </svg>
      );
    case "circulacion":
      // droplet
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3.5c3 3.5 6 7.3 6 10.8a6 6 0 1 1-12 0c0-3.5 3-7.3 6-10.8Z" />
        </svg>
      );
    case "hidratacion":
      // leaf
      return (
        <svg {...common} aria-hidden>
          <path d="M5 19c-1-7 2-13 14-14 1 12-5 15-14 14Z" />
          <path d="M6.5 17.5 17 6" />
        </svg>
      );
    case "lifting":
      // upward arrow
      return (
        <svg {...common} aria-hidden>
          <path d="M12 20V5" />
          <path d="M6 11l6-6 6 6" />
        </svg>
      );
    case "limpieza":
      // sparkle (renovación)
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3l1.6 4.7L18 9l-4.4 1.3L12 15l-1.6-4.7L6 9l4.4-1.3L12 3Z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" opacity="0.6" />
        </svg>
      );
    case "energia":
      // sun rays
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.6 5.4l-2.1 2.1M7.5 16.5l-2.1 2.1M18.6 18.6l-2.1-2.1M7.5 7.5 5.4 5.4" />
        </svg>
      );
  }
}

function ClockGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

/** Legend shown once above the full ritual list, explaining the icon row. */
export function AttributeLegend({ legend, scale }: { legend: string; scale: string }) {
  return (
    <p className="font-jost text-[11px] uppercase tracking-label text-charcoal/45">
      {legend} <span className="mx-1.5 text-charcoal/25">·</span> {scale}
    </p>
  );
}

/** One row of presión / objetivo / duración glyphs + labels + differentiator tag. */
export function AttributeRow({ service }: { service: Pick<Service, "pressure" | "objetivo" | "duration" | "tag"> }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-gold-deep">
      <span className="inline-flex items-center gap-1.5">
        <PressureDots level={service.pressure} />
        <span className="font-jost text-[10px] uppercase tracking-label text-charcoal/50">Presión</span>
      </span>

      <span className="inline-flex items-center gap-1.5">
        {service.objetivo.map((o) => (
          <ObjetivoGlyph key={o} kind={o} />
        ))}
        <span className="font-jost text-[10px] uppercase tracking-label text-charcoal/50">
          {service.objetivo.map((o) => OBJETIVO_LABEL[o]).join(" + ")}
        </span>
      </span>

      <span className="inline-flex items-center gap-1.5">
        <ClockGlyph />
        <span className="font-jost text-[10px] uppercase tracking-label text-charcoal/50">
          {service.duration}
        </span>
      </span>

      <span className="inline-flex items-center rounded-full bg-gold/12 px-2 py-0.5 font-jost text-[10px] uppercase tracking-label text-gold-deep">
        {service.tag}
      </span>
    </div>
  );
}
