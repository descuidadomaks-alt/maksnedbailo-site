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
 * Interactive silhouette. Four zones (head, shoulders, torso, legs) compose a
 * calm figure; the active zone glows gold. Each zone is a real <button> for
 * keyboard + screen-reader access; the chips below mirror the same state.
 */
function BodyMap({
  active,
  onSelect,
  reduce,
}: {
  active: string;
  onSelect: (id: string) => void;
  reduce: boolean;
}) {
  const zoneLabel = (id: string) =>
    site.zones.find((z) => z.id === id)?.label ?? id;

  const fill = (id: string) => (active === id ? "#C2A05B" : "#E9DCC1");
  const stroke = (id: string) => (active === id ? "#9A7B33" : "#CBB889");

  const Z = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <g
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
      style={{ cursor: "pointer", transition: reduce ? "none" : "opacity .3s" }}
      className="pt-zone outline-none"
    >
      {children}
    </g>
  );

  return (
    <div className="relative w-full max-w-[300px]">
      {/* soft halo behind the figure — the logo's rising sun */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -z-0 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/10 blur-2xl"
      />
      <svg
        viewBox="0 0 240 470"
        className="relative w-full"
        style={{ filter: "drop-shadow(0 18px 40px rgba(154,123,51,0.15))" }}
      >
        <title>Cuerpo para elegir la zona a cuidar</title>

        {/* Legs (piernas) */}
        <Z id="piernas">
          <path
            d="M96 250 h48 q6 0 6 8 l-6 178 q-1 14 -13 14 q-11 0 -12 -13 l-5 -132 h-3 l-5 132 q-1 13 -12 13 q-12 0 -13 -14 l-6 -178 q0 -8 6 -8 z"
            fill={fill("piernas")}
            stroke={stroke("piernas")}
            strokeWidth={2.5}
            style={{ transition: reduce ? "none" : "fill .35s, stroke .35s" }}
          />
        </Z>

        {/* Torso (cuerpo entero) */}
        <Z id="cuerpo">
          <path
            d="M84 150 q-6 0 -6 10 l4 60 q2 26 14 40 q4 5 4 14 h40 q0 -9 4 -14 q12 -14 14 -40 l4 -60 q0 -10 -6 -10 z"
            fill={fill("cuerpo")}
            stroke={stroke("cuerpo")}
            strokeWidth={2.5}
            style={{ transition: reduce ? "none" : "fill .35s, stroke .35s" }}
          />
        </Z>

        {/* Shoulders + neck (espalda, cuello y hombros) */}
        <Z id="espalda">
          <path
            d="M112 84 h16 v18 q22 3 34 14 q10 9 12 26 q-30 -16 -54 -16 t-54 16 q2 -17 12 -26 q12 -11 34 -14 z"
            fill={fill("espalda")}
            stroke={stroke("espalda")}
            strokeWidth={2.5}
            style={{ transition: reduce ? "none" : "fill .35s, stroke .35s" }}
          />
        </Z>

        {/* Head (rostro y mirada) */}
        <Z id="rostro">
          <circle
            cx={120}
            cy={50}
            r={30}
            fill={fill("rostro")}
            stroke={stroke("rostro")}
            strokeWidth={2.5}
            style={{ transition: reduce ? "none" : "fill .35s, stroke .35s" }}
          />
        </Z>
      </svg>
    </div>
  );
}
