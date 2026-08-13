import { PhoneIncoming, Bot, ClipboardCheck, CalendarCheck, BellRing, ArrowRight } from "lucide-react";

const STEPS = [
  { label: "Lead calls or texts", Icon: PhoneIncoming },
  { label: "AI answers in seconds", Icon: Bot },
  { label: "Qualifies the job", Icon: ClipboardCheck },
  { label: "Books your calendar", Icon: CalendarCheck },
  { label: "You get a text", Icon: BellRing },
];

/** Section 3 — the logical proof. Horizontal on desktop, stacked on mobile. */
export function HowItWorks() {
  return (
    <section className="bg-[#f8f9fa] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-2">
          {STEPS.map(({ label, Icon }, i) => (
            <div key={label} className="flex items-center gap-3 sm:flex-col sm:gap-2 sm:text-center">
              <div className="flex flex-none flex-col items-center gap-2 sm:w-32">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-[#171e19]/10 bg-white shadow-sm">
                  <Icon className="h-6 w-6 text-[#171e19]" aria-hidden />
                </span>
                <span className="text-sm font-semibold leading-snug text-[#171e19]">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ArrowRight
                  className="h-5 w-5 flex-none rotate-90 text-[#171e19]/25 sm:rotate-0"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-lg text-center text-sm font-medium text-[#171e19]/70 sm:text-base">
          No missed calls. No voicemail tag. No lead slips through — day, night, or weekend.
        </p>
      </div>
    </section>
  );
}
