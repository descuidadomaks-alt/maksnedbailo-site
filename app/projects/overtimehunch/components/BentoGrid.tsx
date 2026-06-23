import { Mockup } from "./Mockup";
import { ChatDemo } from "./ChatDemo";

/**
 * Section 5 — bento feature grid. Desktop: 3 cols laid out as 3 clean rows,
 * each with one wide (span-2) card and one thin card, alternating sides. No
 * fixed row height — cards size to content (so the calendar mockup no longer
 * overflows into the row below), and every thin card carries a small abstract
 * UI element so nothing reads as empty. Mobile: single column.
 */

function Card({
  title,
  body,
  dark = false,
  className = "",
  children,
}: {
  title: string;
  body?: string;
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`oh-card flex min-h-[300px] flex-col rounded-2xl border p-6 hover:-translate-y-1 hover:shadow-xl sm:min-h-[340px] sm:p-7 ${
        dark
          ? "border-[#b7c6c2]/10 bg-[#171e19] text-white"
          : "border-[#171e19]/10 bg-[#f8f9fa] text-[#171e19]"
      } ${className}`}
    >
      <div>
        <h3 className="oh-display text-2xl sm:text-3xl">{title}</h3>
        {body && (
          <p className={`mt-3 text-base ${dark ? "text-white/75" : "text-[#171e19]/70"}`}>
            {body}
          </p>
        )}
      </div>
      {children && <div className="mt-6 flex flex-1 flex-col">{children}</div>}
    </div>
  );
}

export function BentoGrid() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="oh-display mb-10 max-w-2xl text-4xl text-[#171e19] sm:text-6xl">
          Everything that turns a lead into a booked job.
        </h2>

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {/* Row 1 — wide left: live chat */}
          <Card
            title="Instant lead response"
            body="Form, call, or text — answered in seconds, day or night. First responder wins. Now that's you."
            dark
            className="md:col-span-2"
          >
            <div className="mt-auto h-full min-h-[180px] rounded-xl bg-black/20 p-4">
              <ChatDemo />
            </div>
          </Card>

          <Card
            title="Voice agent that books"
            body="It qualifies the lead and books the appointment. It doesn't sell — it hands you a ready-to-close call."
          >
            <div className="mt-auto">
              <div className="flex h-12 items-end gap-1.5">
                {[0.5, 0.9, 0.4, 1, 0.7, 0.95, 0.45, 0.8, 0.55, 1, 0.6, 0.85, 0.4].map((h, i) => (
                  <span
                    key={i}
                    className="oh-eq-bar w-1.5 flex-1 rounded-full bg-[#ffe17c]"
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm font-medium text-[#171e19]/60">
                Live call · qualifying… 0:42
              </p>
            </div>
          </Card>

          {/* Row 2 — wide right: calendar mockup */}
          <Card title="Follow-up on autopilot" dark>
            <ul className="mt-auto space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <span className="text-[#ffe17c]">✓</span> Day 1 — first text sent
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <span className="text-[#ffe17c]">✓</span> Day 3 — friendly reminder
              </li>
              <li className="flex items-center gap-2 text-white/45">
                <span className="text-white/30">○</span> Day 5 — final nudge
              </li>
              <li className="pt-1 text-xs text-white/50">
                Chased until they book or say no. Nothing slips.
              </li>
            </ul>
          </Card>

          <Card title="Your calendar, filled" className="md:col-span-2">
            <div className="mt-auto">
              <Mockup />
            </div>
          </Card>

          {/* Row 3 — wide left: all done for you */}
          <Card title="All done for you" className="md:col-span-2">
            <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { n: "1", t: "We build it", d: "Your AI + ad setup, done." },
                { n: "2", t: "We run the ads", d: "Local homeowners, daily." },
                { n: "3", t: "We manage it", d: "Tuned every week." },
              ].map((s) => (
                <div
                  key={s.n}
                  className="rounded-xl border border-[#171e19]/10 bg-white p-4"
                >
                  <span className="oh-display text-2xl text-[#ffe17c]">{s.n}</span>
                  <p className="oh-display mt-1 text-base text-[#171e19]">{s.t}</p>
                  <p className="mt-1 text-sm text-[#171e19]/60">{s.d}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Kill no-shows" dark>
            <div className="mt-auto space-y-2">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-sm text-white/85">
                Reminder: your appointment is tomorrow at 9:00 AM. Reply YES to confirm.
              </div>
              <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-[#ffe17c] px-3 py-2 text-sm font-medium text-[#171e19]">
                YES 👍
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
