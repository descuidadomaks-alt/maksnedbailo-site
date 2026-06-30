/**
 * Section 6 — 1:2 layout, sticky title left, big yellow numerals right.
 * No ads language — the base is the AI front desk, not media spend.
 */

const STEPS = [
  {
    n: "1",
    title: "We build your AI front desk.",
    body: "Your custom site + AI receptionist, your branding, live in 48 hours.",
  },
  {
    n: "2",
    title: "Your AI answers & books.",
    body: "Every call, text, and form — answered, qualified, and booked. 24/7.",
  },
  {
    n: "3",
    title: "You show up & close.",
    body: "Walk into booked, qualified jobs. No chasing. No admin.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#171e19] py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h2 className="oh-display text-5xl text-white sm:text-7xl lg:sticky lg:top-28">
            How it works
          </h2>
        </div>

        <div className="lg:col-span-2">
          <ul>
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                className={`group flex flex-col gap-2 py-8 sm:flex-row sm:gap-8 ${
                  i !== STEPS.length - 1 ? "border-b border-[#b7c6c2]/10" : ""
                }`}
              >
                <span className="oh-display flex-none text-7xl text-[#ffe17c]/20 transition-colors duration-300 group-hover:text-[#ffe17c] sm:text-8xl">
                  {s.n}
                </span>
                <div className="pt-1">
                  <h3 className="oh-display text-3xl text-white sm:text-4xl">{s.title}</h3>
                  <p className="mt-2 max-w-md text-lg text-[#b7c6c2]">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
