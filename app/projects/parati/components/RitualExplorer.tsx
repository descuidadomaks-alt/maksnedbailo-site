"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { site, type Service } from "../lib/content";
import { waServiceLink } from "../lib/whatsapp";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";
import { AttributeRow, AttributeLegend } from "./AttributeIcons";
import { BodySilhouette, ZONE_ORDER } from "./BodySilhouette";

const byName: Record<string, Service> = Object.fromEntries(
  site.services.items.map((s) => [s.name, s])
);
const zoneLabels: Record<string, string> = Object.fromEntries(
  site.zones.map((z) => [z.id, z.label])
);

type Mode = "zone" | "list";

export function RitualExplorer() {
  const [mode, setMode] = useState<Mode>("zone");
  const [activeZone, setActiveZone] = useState<string>("cuerpo");
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const reduce = !!useReducedMotion();

  const displayZone = hoverZone ?? activeZone;
  const zone = site.zones.find((z) => z.id === displayZone)!;
  const zoneServices = zone.services.map((n) => byName[n]).filter(Boolean) as Service[];

  function handleSelectZone(id: string) {
    setActiveZone(id);
    setHoverZone(null);
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
              <BodySilhouette
                activeZone={displayZone}
                onSelectZone={handleSelectZone}
                onHoverZone={(id) => mode === "zone" && setHoverZone(id)}
                reduce={reduce}
                zoneLabels={zoneLabels}
                className="mx-auto h-auto max-h-[36vh] w-full max-w-[150px] md:max-h-[64vh] md:max-w-[230px]"
              />

              {mode === "zone" ? (
                <>
                  <p className="mt-3 text-center font-jost text-[11px] uppercase tracking-label text-gold-deep md:hidden">
                    {zone.label}
                  </p>
                  <div className="mt-4 hidden flex-wrap justify-center gap-2 md:flex">
                    {ZONE_ORDER.map((id) => {
                      const z = site.zones.find((zz) => zz.id === id)!;
                      const on = displayZone === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => handleSelectZone(id)}
                          onMouseEnter={() => setHoverZone(id)}
                          onMouseLeave={() => setHoverZone(null)}
                          aria-pressed={on}
                          className={`rounded-full px-3.5 py-1.5 font-jost text-[11px] uppercase tracking-label transition-all ${
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
                  <p className="mt-3 hidden text-center font-jost text-xs text-charcoal/40 md:block">
                    {site.explorer.hint}
                  </p>
                </>
              ) : (
                <p className="mt-3 text-center font-jost text-[11px] uppercase tracking-label text-gold-deep">
                  {zoneLabels[activeZone]}
                </p>
              )}
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait" initial={false}>
              {mode === "list" ? (
                <GroupedList key="list" reduce={reduce} onActiveZoneChange={setActiveZone} />
              ) : (
                <ZonePanel key={`zone-${displayZone}`} zone={zone} services={zoneServices} reduce={reduce} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Zone-mode content panel: tagline + that zone's services. */
function ZonePanel({
  zone,
  services,
  reduce,
}: {
  zone: (typeof site.zones)[number];
  services: Service[];
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-display text-xl italic leading-snug text-charcoal/80">{zone.tagline}</p>
      <ul className="mt-6 flex flex-col gap-4">
        {services.map((s) => (
          <ServiceRow key={s.name} service={s} description={s.plain} />
        ))}
      </ul>
    </motion.div>
  );
}

/** List-mode content: every ritual, grouped by zone, scroll-spy driven. */
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
      exit={{ opacity: 0 }}
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
