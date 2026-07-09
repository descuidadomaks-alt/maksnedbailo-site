"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site, type Service } from "../lib/content";
import { waServiceLink } from "../lib/whatsapp";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";
import { AttributeRow, AttributeLegend } from "./AttributeIcons";
import { BodyFigure } from "./BodyFigure";

const byName: Record<string, Service> = Object.fromEntries(
  site.services.items.map((s) => [s.name, s])
);
const zoneLabels: Record<string, string> = Object.fromEntries(
  site.zones.map((z) => [z.id, z.label])
);

const ZONE_ORDER = ["rostro", "espalda", "cuerpo", "piernas"] as const;

type Mode = "zone" | "list";

/**
 * Zone selection is one-way: text buttons (desktop chips + mobile pills) →
 * `activeZone` state → the body figure's highlight + the card panel. Hover
 * is CSS-only cosmetic tint — it never touches state, never touches layout.
 * That was the root cause of the old scroll-jump loop (hover → state →
 * content-height change → cursor lands on a different element → repeat).
 */
export function RitualExplorer() {
  const [mode, setMode] = useState<Mode>("zone");
  const [activeZone, setActiveZone] = useState<string>("cuerpo");
  const reduce = !!useReducedMotion();

  function handleSelectZone(id: string) {
    setActiveZone(id);
    if (mode === "list") {
      document.getElementById(`zone-${id}`)?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  return (
    <section id="rituales" className="relative bg-cream px-5 pb-20 pt-14 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-content">
        <SectionHeading eyebrow={site.explorer.eyebrow} title={site.explorer.heading} />
        <Reveal className="mx-auto mt-4 max-w-2xl text-center sm:mt-5">
          <p className="font-jost text-sm leading-relaxed text-charcoal/70 sm:text-base">
            {site.explorer.intro}
          </p>
        </Reveal>

        <div className="mt-5 flex justify-center sm:mt-8">
          <button
            type="button"
            onClick={() => setMode((m) => (m === "zone" ? "list" : "zone"))}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 font-jost text-xs uppercase tracking-label text-gold-deep transition-colors hover:border-gold-deep hover:bg-gold/10"
          >
            {mode === "list" ? site.explorer.mapToggle : site.explorer.listToggle}
          </button>
        </div>

        {/* Body column (sticky) + content column — shared skeleton for both modes.
            No `items-start`: grid cells stretch to the row height, so the inner
            `sticky` wrapper can pin the mini body while the cards scroll past. */}
        <div className="mt-6 grid grid-cols-[30%_1fr] gap-4 sm:mt-10 sm:grid-cols-[26%_1fr] md:grid-cols-2 md:gap-14">
          <div>
            <div className="sticky top-24">
              <BodyFigure
                activeZone={activeZone}
                reduce={reduce}
                className="mx-auto h-auto max-h-[36vh] w-full max-w-[150px] md:max-h-[64vh] md:max-w-[230px]"
              />

              {/* Mobile: compact vertical pill stack — the ONLY zone selector on
                  mobile now that the figure is non-interactive. Constrained to
                  the mini-body column's width. */}
              <div className="mt-3 flex flex-col gap-1.5 md:hidden">
                {ZONE_ORDER.map((id) => {
                  const z = site.zones.find((zz) => zz.id === id)!;
                  const on = activeZone === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleSelectZone(id)}
                      aria-pressed={on}
                      className={`min-h-11 w-full rounded-full px-1.5 font-jost text-[11px] uppercase tracking-label transition-colors ${
                        on
                          ? "bg-gold text-ivory"
                          : "border border-gold/30 text-charcoal/70 hover:border-gold hover:text-gold-deep"
                      }`}
                    >
                      {z.shortLabel}
                    </button>
                  );
                })}
              </div>

              {/* Desktop: horizontal chip row — zone mode only. Hover is a CSS
                  tint (hover: classes), never a state change. */}
              {mode === "zone" ? (
                <div className="mt-4 hidden flex-wrap justify-center gap-2 md:flex">
                  {ZONE_ORDER.map((id) => {
                    const z = site.zones.find((zz) => zz.id === id)!;
                    const on = activeZone === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleSelectZone(id)}
                        aria-pressed={on}
                        className={`rounded-full px-3.5 py-1.5 font-jost text-[11px] uppercase tracking-label transition-colors ${
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
              ) : (
                <p className="mt-3 hidden text-center font-jost text-[11px] uppercase tracking-label text-gold-deep md:block">
                  {zoneLabels[activeZone]}
                </p>
              )}
            </div>
          </div>

          <div>
            {mode === "list" ? (
              <GroupedList reduce={reduce} onActiveZoneChange={setActiveZone} />
            ) : (
              <StackedZonePanels activeZone={activeZone} reduce={reduce} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Zone-mode content: ALL FOUR zone panels render simultaneously, stacked in
 * the same CSS grid cell (grid-area 1/1). The container's height is
 * therefore always the height of the TALLEST panel — switching the active
 * zone can never change the section's geometry, so there is nothing for a
 * hover/click state change to shift under the cursor. Inactive panels use
 * `visibility: hidden` (not just opacity) so they drop out of the tab order.
 */
function StackedZonePanels({ activeZone, reduce }: { activeZone: string; reduce: boolean }) {
  return (
    <div className="grid">
      {ZONE_ORDER.map((id) => {
        const zone = site.zones.find((z) => z.id === id)!;
        const services = zone.services.map((n) => byName[n]).filter(Boolean) as Service[];
        const isActive = id === activeZone;
        return (
          <div
            key={id}
            aria-hidden={!isActive}
            style={{
              gridArea: "1 / 1",
              opacity: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
              transition: reduce
                ? "none"
                : isActive
                  ? "opacity 0.3s ease"
                  : "opacity 0.3s ease, visibility 0s 0.3s",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            <p className="font-display text-xl italic leading-snug text-charcoal/80">
              {zone.tagline}
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {services.map((s) => (
                <ServiceRow key={s.name} service={s} description={s.plain} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/**
 * List-mode content: every ritual, grouped by zone, scroll-spy driven.
 * Unchanged from the previous round — already layout-neutral (all zones
 * always render; only the mini-body highlight/label reacts to scroll).
 */
function GroupedList({
  reduce,
  onActiveZoneChange,
}: {
  reduce: boolean;
  onActiveZoneChange: (id: string) => void;
}) {
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.zone;
            if (id) onActiveZoneChange(id);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    Object.values(groupRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AttributeLegend legend={site.explorer.legend} scale={site.explorer.legendScale} />

      <div className="mt-5 flex flex-col gap-9">
        {ZONE_ORDER.map((id) => {
          const z = site.zones.find((zz) => zz.id === id)!;
          const services = z.services.map((n) => byName[n]).filter(Boolean) as Service[];
          return (
            <div
              key={id}
              id={`zone-${id}`}
              data-zone={id}
              ref={(el) => {
                groupRefs.current[id] = el;
              }}
              className="scroll-mt-24"
            >
              <p className="mb-3 font-jost text-[11px] uppercase tracking-label text-gold-deep">
                {z.label}
              </p>
              <ul className="flex flex-col gap-4">
                {services.map((s) => (
                  <ServiceRow key={s.name} service={s} description={s.benefit} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/** Shared service card: name/price, description, attribute row, WhatsApp CTA. */
function ServiceRow({ service, description }: { service: Service; description: string }) {
  return (
    <li className="rounded-soft border border-gold/15 bg-ivory p-5 transition-colors hover:border-gold/40">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl text-charcoal">{service.name}</h3>
        <span className="whitespace-nowrap font-display text-lg text-gold-deep">
          {service.price}
        </span>
      </div>
      <p className="mt-2 font-jost text-sm leading-relaxed text-charcoal/70">{description}</p>
      <AttributeRow service={service} />
      <div className="mt-4">
        <WhatsAppButton href={waServiceLink(service.name)} variant="outline" className="!py-2.5 !text-xs">
          {site.explorer.bookLabel}
        </WhatsAppButton>
      </div>
    </li>
  );
}
