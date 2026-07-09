/**
 * Section — the signature contrast block. Left = the old way (charcoal,
 * red ✕, sage muted). Right = the Overtime OS way (#272727, yellow border,
 * yellow ✓, crisp white). Refined for the front-office base — no ads
 * language, adds the emergency-triage line. Final NEW row folds in the
 * anti-GoHighLevel-template message (the standalone section was removed).
 */

const OLD = [
  "A lead calls while you're working. It goes to voicemail. They call the next guy.",
  "A form comes in at 9pm. You see it at noon. Too late.",
  "Follow-up is a sticky note you forgot to read.",
  "No-shows eat your week. Nobody reminded them.",
  "You tried a cheap AI answering app… and became its unpaid IT department.",
];

const NEW = [
  "Every call, text, and form answered in under 60 seconds. 24/7.",
  "The AI qualifies the job and books it on your calendar.",
  "It knows a real emergency from a tire-kicker — and books the real ones.",
  "Automatic text reminders kill no-shows before they happen.",
  "Custom-built for your business — not another GoHighLevel template every contractor in town already has.",
  "We build it, run it, and tune it every month — you never log into anything.",
];

export function ProblemSolution() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* THE OLD WAY */}
      <div className="bg-[#171e19] px-6 py-14 text-white sm:px-10 sm:py-20">
        <div className="mx-auto max-w-md lg:ml-auto lg:mr-0">
          <h2 className="oh-display text-4xl text-white sm:text-5xl">The old way</h2>
          <ul className="mt-8 space-y-6">
            {OLD.map((line) => (
              <li key={line} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-red-500/15 text-red-400"
                >
                  ✕
                </span>
                <p className="text-lg leading-snug text-[#b7c6c2]">{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* THE OVERTIME OS WAY */}
      <div className="border-t-4 border-[#ffe17c] bg-[#272727] px-6 py-14 text-white lg:border-l-4 lg:border-t-0 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-md lg:mr-auto lg:ml-0">
          <h2 className="oh-display text-4xl text-white sm:text-5xl">
            The <span className="text-[#ffe17c]">Overtime OS</span> way
          </h2>
          <ul className="mt-8 space-y-6">
            {NEW.map((line) => (
              <li key={line} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#ffe17c] text-[#171e19]"
                >
                  ✓
                </span>
                <p className="text-lg font-medium leading-snug text-white">{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
