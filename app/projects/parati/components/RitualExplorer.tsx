"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { site, type Service } from "../lib/content";
import { waServiceLink } from "../lib/whatsapp";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";

const byName: Record<string, Service> = Object.fromEntries(
  site.services.items.map((s) => [s.name, s])
);

const ZONE_ORDER = ["rostro", "espalda", "cuerpo", "piernas"] as const;

export function RitualExplorer() {
  const [zoneId, setZoneId] = useState<string>("cuerpo");
  const [showList, setShowList] = useState(false);
  const reduce = useReducedMotion();

  const zone = site.zones.find((z) => z.id === zoneId)!;
  const zoneServices = zone.services
    .map((n) => byName[n])
    .filter(Boolean) as Service[];

  return (
    <section id="rituales" className="relative bg-cream px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading eyebrow={site.explorer.eyebrow} title={site.explorer.heading} />
        <Reveal className="mx-auto mt-5 max-w-2xl text-center">
          <p className="font-jost text-base leading-relaxed text-charcoal/70">
            {site.explorer.intro}
          </p>
        </Reveal>

        {/* Map / list toggle */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowList((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 font-jost text-xs uppercase tracking-label text-gold-deep transition-colors hover:border-gold-deep hover:bg-gold/10"
          >
            {showList ? site.explorer.mapToggle : site.explorer.listToggle}
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {showList ? (
            <FullList key="list" reduce={!!reduce} />
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid items-start gap-8 lg:grid-cols-2 lg:gap-14"
            >
              {/* ── Silhouette + zone chips ─────────────────────────── */}
              <div className="flex flex-col items-center">
                <BodyMap active={zoneId} onSelect={setZoneId} reduce={!!reduce} />

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {ZONE_ORDER.map((id) => {
                    const z = site.zones.find((zz) => zz.id === id)!;
                    const on = z.id === zoneId;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setZoneId(id)}
                        aria-pressed={on}
                        className={`rounded-full px-4 py-2 font-jost text-xs uppercase tracking-label transition-all ${
                          on
                            ? "bg-gold text-ivory shadow-soft"
                            : "border border-gold/30 text-charcoal/70 hover:border-gold hover:text-gold-deep"
                        }`}
                      >
                        {z.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 font-jost text-xs text-charcoal/40">
                  {site.explorer.hint}
                </p>
              </div>

              {/* ── Selected zone panel ─────────────────────────────── */}
              <div className="lg:pt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={zoneId}
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-jost text-xs uppercase tracking-label text-gold-deep">
                      {zone.label}
                    </span>
                    <p className="mt-2 font-display text-xl italic leading-snug text-charcoal/80">
                      {zone.tagline}
                    </p>

                    <ul className="mt-6 flex flex-col gap-4">
                      {zoneServices.map((s) => (
                        <ServiceRow key={s.name} service={s} />
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bonos + IVA note */}
        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-8">
            {site.services.bonos.map((b) => (
              <span key={b} className="inline-flex items-center gap-2 font-jost text-sm text-charcoal/75">
                <span aria-hidden className="text-gold">✦</span>
                {b}
              </span>
            ))}
          </div>
          <p className="font-jost text-xs uppercase tracking-label text-charcoal/40">
            {site.services.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** One service row inside the selected-zone panel. */
function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="rounded-soft border border-gold/15 bg-ivory p-5 transition-colors hover:border-gold/40">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl text-charcoal">{service.name}</h3>
        <span className="whitespace-nowrap font-display text-lg text-gold-deep">
          {service.price}
        </span>
      </div>
      <p className="mt-0.5 font-jost text-[11px] uppercase tracking-label text-charcoal/40">
        {service.duration}
      </p>
      <p className="mt-3 font-jost text-sm leading-relaxed text-charcoal/70">
        {service.plain}
      </p>
      <div className="mt-4">
        <WhatsAppButton href={waServiceLink(service.name)} variant="outline" className="!py-2.5 !text-xs">
          {site.explorer.bookLabel}
        </WhatsAppButton>
      </div>
    </li>
  );
}

/** Full-carta fallback view. */
function FullList({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-10"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {site.services.items.map((s) => (
          <div
            key={s.name}
            className="flex items-baseline justify-between gap-4 rounded-soft border border-gold/15 bg-ivory px-5 py-4"
          >
            <div>
              <h3 className="font-display text-lg text-charcoal">{s.name}</h3>
              <p className="font-jost text-[11px] uppercase tracking-label text-charcoal/40">
                {s.duration}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-display text-lg text-gold-deep">{s.price}</span>
              <a
                href={waServiceLink(s.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost text-[11px] uppercase tracking-label text-gold-deep underline-offset-4 hover:underline"
              >
                {site.explorer.bookLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Interactive silhouette. One seamless figure (same-fill shapes merge into a
 * clean body); selecting a zone lights up a gold band clipped to the body, so
 * the highlight always fits the figure exactly. Transparent hit-rects capture
 * taps; the chips below mirror the same state for keyboard / screen-reader use.
 */
const BAND: Record<
  string,
  { hl: { y: number; h: number }; hit: { x: number; y: number; w: number; h: number } }
> = {
  rostro: { hl: { y: 6, h: 86 }, hit: { x: 70, y: 6, w: 80, h: 86 } },
  espalda: { hl: { y: 92, h: 92 }, hit: { x: 44, y: 92, w: 132, h: 84 } },
  cuerpo: { hl: { y: 6, h: 458 }, hit: { x: 66, y: 176, w: 88, h: 74 } },
  piernas: { hl: { y: 250, h: 216 }, hit: { x: 58, y: 250, w: 104, h: 214 } },
};

// Same shapes power the fill, the clip, and (kept identical) the silhouette.
const BODY_SHAPES = (
  <>
    <circle cx="110" cy="48" r="30" />
    <rect x="100" y="72" width="20" height="24" rx="9" />
    <path d="M74 100 C90 92 130 92 146 100 C153 98 156 105 155 113 L149 196 C147 226 137 250 128 256 L92 256 C83 250 73 226 71 196 L65 113 C64 105 67 98 74 100 Z" />
    <rect x="83" y="250" width="25" height="206" rx="12" />
    <rect x="112" y="250" width="25" height="206" rx="12" />
  </>
);

function BodyMap({
  active,
  onSelect,
  reduce,
}: {
  active: string;
  onSelect: (id: string) => void;
  reduce: boolean;
}) {
  const zoneLabel = (id: string) => site.zones.find((z) => z.id === id)?.label ?? id;

  return (
    <div className="relative w-full max-w-[240px]">
      <svg
        viewBox="0 0 220 470"
        className="w-full"
        style={{ filter: "drop-shadow(0 16px 34px rgba(154,123,51,0.16))" }}
      >
        <title>Cuerpo para elegir la zona a cuidar</title>
        <defs>
          <clipPath id="pt-body">{BODY_SHAPES}</clipPath>
        </defs>

        {/* base fill + active-zone highlight, both clipped to the body */}
        <g clipPath="url(#pt-body)">
          <rect x="0" y="0" width="220" height="470" fill="#E7D8B8" />
          {ZONE_ORDER.map((id) => (
            <rect
              key={id}
              x="0"
              y={BAND[id].hl.y}
              width="220"
              height={BAND[id].hl.h}
              fill="#C2A05B"
              style={{ opacity: active === id ? 1 : 0, transition: reduce ? "none" : "opacity .4s ease" }}
            />
          ))}
        </g>

        {/* transparent tap targets */}
        {ZONE_ORDER.map((id) => {
          const h = BAND[id].hit;
          return (
            <rect
              key={id}
              x={h.x}
              y={h.y}
              width={h.w}
              height={h.h}
              fill="transparent"
              role="button"
              tabIndex={0}
              aria-label={zoneLabel(id)}
              aria-pressed={active === id}
              onClick={() => onSelect(id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(id);
                }
              }}
              style={{ cursor: "pointer", outline: "none" }}
            />
          );
        })}
      </svg>
    </div>
  );
}
