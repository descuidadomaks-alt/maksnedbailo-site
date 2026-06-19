import { site } from "../lib/content";
import { Reveal } from "./Reveal";

/**
 * Disponibilidad cue — a slim, honest scarcity line (she's one person).
 * Deliberately not a banner: a thin gold-flanked whisper.
 */
export function AvailabilityCue() {
  return (
    <section className="bg-cream px-5 pb-8 sm:px-8">
      <Reveal className="mx-auto flex max-w-content items-center justify-center gap-4">
        <span aria-hidden className="h-px w-10 bg-gold/40 sm:w-16" />
        <p className="text-center font-jost text-xs uppercase tracking-label text-gold-deep">
          {site.availability}
        </p>
        <span aria-hidden className="h-px w-10 bg-gold/40 sm:w-16" />
      </Reveal>
    </section>
  );
}
