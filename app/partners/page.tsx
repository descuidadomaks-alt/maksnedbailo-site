import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";
import VoidSection from "@/components/VoidSection";

export const metadata: Metadata = {
  title: "care less AI automation",
  description:
    "A working session to find where AI actually matters in your business.",
  robots: { index: false, follow: false },
};

const SCHEDULER_URL = "https://zcal.co/carelessmaks/ai-map";
const TELEGRAM_URL = "https://t.me/maksym_nedbailo";

export default function PartnersIndexPage() {
  return (
    <>
      {/* ── Minimal header ─────────────────────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-5 sm:px-8"
        style={{
          height: "56px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(6,6,8,0.98)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link href="/" aria-label="care less AI automation — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="care less AI automation"
            style={{ height: "28px", opacity: 0.6 }}
            className="hover:opacity-90 transition-opacity duration-200"
          />
        </Link>
      </header>

      <main className="min-h-screen pb-28 md:pb-0">

        {/* ══ Section 1: Hero ═════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden flex items-center"
          style={{ minHeight: "88svh" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 700px 500px at 50% 45%, rgba(212,255,43,0.05) 0%, transparent 65%)",
            }}
          />
          <div className="relative w-full max-w-[640px] mx-auto px-6 py-16 text-center">

            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2.5 mb-10"
              style={{
                fontFamily: "var(--font-roboto-mono)",
                fontSize: "9.5px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(212,255,43,0.55)",
                border: "1px solid rgba(212,255,43,0.16)",
                borderRadius: "999px",
                padding: "5px 14px",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "rgba(212,255,43,0.55)" }}
                aria-hidden
              />
              you found this yourself
            </div>

            {/* H1 */}
            <h1
              className="font-playfair font-normal text-fg"
              style={{
                fontSize: "clamp(32px, 5vw, 64px)",
                lineHeight: 1.08,
                letterSpacing: "-0.026em",
                marginBottom: "clamp(24px, 3vw, 36px)",
              }}
            >
              You found the page
              <br />
              <em className="not-italic text-fg/55">behind the page.</em>
            </h1>

            {/* Copy — short and punchy */}
            <div
              className="font-sora font-light text-fg/45 max-w-[46ch] mx-auto"
              style={{
                fontSize: "clamp(16px, 1.7vw, 18px)",
                lineHeight: 1.75,
                marginBottom: "clamp(28px, 4vw, 44px)",
              }}
            >
              <p>
                This page is not in the menu.
                It is not promoted.
                Most people will never see it.
              </p>
              <p style={{ marginTop: "1.2em" }}>
                If you landed here — you probably removed someone&apos;s name
                from a partner link to see what&apos;s behind it.
              </p>
              <p style={{ marginTop: "1.2em", color: "rgba(240,236,230,0.6)" }}>
                Good instinct.
              </p>
            </div>

            {/* Primary CTA */}
            <a
              href="#ai-map"
              className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_56px_rgba(212,255,43,0.22)] active:scale-[0.98]"
              style={{
                fontSize: "15px",
                padding: "17px 36px",
                minHeight: "58px",
                letterSpacing: "-0.01em",
              }}
            >
              See what I actually do
              <span
                className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block"
                aria-hidden
              >
                →
              </span>
            </a>

            <p
              className="font-sora font-light text-fg/25 mt-4"
              style={{ fontSize: "12px", letterSpacing: "0.3px" }}
            >
              No pitch yet. Just the map.
            </p>
          </div>
        </section>

        {/* ══ Curious Visitor Note ════════════════════════════════════════════ */}
        <section className="py-10 md:py-14">
          <div className="max-w-[560px] mx-auto px-6 text-center">
            <div
              data-reveal
              style={{
                border: "1px solid rgba(212,255,43,0.15)",
                borderRadius: "18px",
                padding: "clamp(28px, 4vw, 44px) clamp(24px, 3vw, 40px)",
                background: "rgba(212,255,43,0.025)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-roboto-mono)",
                  fontSize: "9px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "rgba(212,255,43,0.5)",
                  marginBottom: "18px",
                }}
              >
                Curious visitor note
              </div>
              <p
                className="font-playfair font-normal text-fg"
                style={{
                  fontSize: "clamp(18px, 2vw, 22px)",
                  lineHeight: 1.4,
                  letterSpacing: "-0.015em",
                  marginBottom: "16px",
                }}
              >
                Think of one task in your business that happens every week,
                takes over 30 minutes, and annoys someone on the team.
              </p>
              <p
                className="font-sora font-light text-fg/40"
                style={{
                  fontSize: "14px",
                  lineHeight: 1.65,
                  marginBottom: "28px",
                }}
              >
                That is usually where the first useful automation starts.
              </p>
              <a
                href={SCHEDULER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-sora font-semibold transition-all duration-200"
                style={{
                  fontSize: "13px",
                  color: "rgba(212,255,43,0.78)",
                  letterSpacing: "-0.01em",
                  border: "1px solid rgba(212,255,43,0.2)",
                  borderRadius: "10px",
                  padding: "10px 20px",
                }}
              >
                Map this task with me
                <span
                  className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block"
                  aria-hidden
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ══ Section 2: AI Map — VoidSection ════════════════════════════════ */}
        <VoidSection className="section-divider" minHeight="auto">
          <div
            id="ai-map"
            className="w-full max-w-[600px] mx-auto px-6 py-16 md:py-24 text-center"
          >
            {/* Label */}
            <div
              data-reveal
              style={{
                fontFamily: "var(--font-roboto-mono)",
                fontSize: "9px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(212,255,43,0.5)",
                marginBottom: "20px",
              }}
            >
              Strategic AI Map
            </div>

            {/* Headline */}
            <h2
              data-reveal
              className="font-playfair font-normal text-fg"
              style={{
                fontSize: "clamp(26px, 3.8vw, 50px)",
                lineHeight: 1.1,
                letterSpacing: "-0.024em",
                marginBottom: "clamp(20px, 2.5vw, 28px)",
              }}
            >
              Before we talk about AI,
              <br />
              <em className="not-italic text-fg/55">
                let&apos;s find where it actually matters.
              </em>
            </h2>

            {/* Short intro */}
            <p
              data-reveal
              className="font-sora font-light text-fg/45 max-w-[50ch] mx-auto"
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.75,
                marginBottom: "clamp(28px, 3.5vw, 40px)",
              }}
            >
              Most businesses don&apos;t need &ldquo;more AI.&rdquo; They need
              to know where time leaks, where work repeats, and where simple
              automation could quietly remove friction — before committing to
              anything.
            </p>

            {/* Bullets — left-aligned in a centered container */}
            <ul
              data-reveal="d1"
              className="inline-block text-left"
              style={{ listStyle: "none", padding: 0, margin: "0 auto", marginBottom: "clamp(28px, 3.5vw, 40px)" }}
            >
              {[
                "Find where your team loses time",
                "Spot repetitive tasks that can be automated",
                "Identify missed lead and follow-up opportunities",
                "See which AI ideas are worth testing first",
                "Avoid spending on tools that look impressive but change nothing",
              ].map((bullet) => (
                <li
                  key={bullet}
                  className="font-sora font-light flex items-start gap-3"
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 15px)",
                    color: "rgba(240,236,230,0.55)",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "rgba(212,255,43,0.55)" }}
                    aria-hidden
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div data-reveal="d2">
              <Link
                href="/ai-map"
                className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_56px_rgba(212,255,43,0.2)] active:scale-[0.98]"
                style={{
                  fontSize: "15px",
                  padding: "17px 36px",
                  minHeight: "58px",
                  letterSpacing: "-0.01em",
                }}
              >
                Start with the AI Map
                <span
                  className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block"
                  aria-hidden
                >
                  →
                </span>
              </Link>
              <p
                className="font-sora font-light text-fg/25 mt-4"
                style={{ fontSize: "12px", fontStyle: "italic" }}
              >
                No hype. No random chatbot. No system you don&apos;t need.
              </p>
            </div>
          </div>
        </VoidSection>

        {/* ══ Section 3: Final CTA ════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-20 md:py-32"
        >
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
            style={{
              width: "700px",
              height: "500px",
              background:
                "radial-gradient(ellipse, rgba(212,255,43,0.06) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-[580px] mx-auto px-6 text-center">

            <h2
              data-reveal
              className="font-playfair font-normal text-fg"
              style={{
                fontSize: "clamp(26px, 3.6vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.024em",
                marginBottom: "clamp(16px, 2vw, 22px)",
              }}
            >
              Since you&apos;re already here,
              <br />
              <em className="not-italic text-fg/55">
                let&apos;s make the curiosity useful.
              </em>
            </h2>

            <p
              data-reveal
              className="font-sora font-light text-fg/40 max-w-[46ch] mx-auto"
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.7,
                marginBottom: "clamp(28px, 3.5vw, 40px)",
              }}
            >
              I don&apos;t sell AI because it sounds impressive. I look for the
              smallest move that creates the biggest operational improvement —
              and I&apos;ll tell you if there isn&apos;t one.
            </p>

            {/* "Sometimes..." cards — scannable, not prose */}
            <div
              data-reveal="d1"
              className="grid grid-cols-2 gap-3 mb-12 text-left"
            >
              {[
                { icon: "◈", text: "An AI assistant" },
                { icon: "◈", text: "A better intake process" },
                { icon: "◈", text: "Automation behind the scenes" },
                { icon: "◈", text: "Honest: \"don't build this yet\"" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="font-sora font-light flex items-start gap-2.5"
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.55,
                    color: "rgba(240,236,230,0.45)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span
                    style={{ color: "rgba(212,255,43,0.4)", flexShrink: 0, fontSize: "10px", marginTop: "2px" }}
                    aria-hidden
                  >
                    {icon}
                  </span>
                  {text}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              data-reveal="d2"
              className="flex flex-col items-center gap-4"
            >
              <a
                href={SCHEDULER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.25)] active:scale-[0.99] w-full sm:w-auto"
                style={{
                  fontSize: "15px",
                  padding: "18px 40px",
                  minHeight: "60px",
                  letterSpacing: "-0.01em",
                }}
              >
                Book an AI Map session
                <span
                  className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block"
                  aria-hidden
                >
                  →
                </span>
              </a>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sora font-light transition-opacity duration-200 hover:opacity-80"
                style={{
                  fontSize: "14px",
                  color: "rgba(34,158,217,0.75)",
                  letterSpacing: "-0.01em",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Send me a message first
              </a>

              <p
                className="font-sora font-light text-fg/22"
                style={{ fontSize: "12px", letterSpacing: "0.2px", maxWidth: "38ch" }}
              >
                If there&apos;s no clear opportunity, I&apos;ll tell you.
                That&apos;s part of the work.
              </p>
            </div>
          </div>
        </section>

        {/* ══ Section 4: Bottleneck Score — lighter entry point ══════════════ */}
        <section className="section-divider py-14 md:py-20">
          <div className="max-w-lg mx-auto px-6 text-center">

            <p
              data-reveal
              className="font-label text-fg/30 mb-5"
              style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}
            >
              Not Ready to Book?
            </p>

            <h2
              data-reveal
              className="font-playfair font-normal text-fg mb-4"
              style={{ fontSize: "clamp(20px, 2.8vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
            >
              Start with the free Bottleneck Score
            </h2>

            <p
              data-reveal
              className="font-sora font-light text-fg/55 leading-[1.85] mb-8"
              style={{ fontSize: "14px", maxWidth: "48ch", marginInline: "auto" }}
            >
              Two minutes, no booking required. Answer a few questions about how your business handles customer messages and get an instant score — plus where you&apos;re likely losing the most.
            </p>

            <Link
              data-reveal="d1"
              href="/score"
              className="group inline-flex items-center justify-center gap-2.5 font-sora font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
              style={{
                fontSize: "14px",
                padding: "15px 32px",
                minHeight: "52px",
                letterSpacing: "-0.01em",
                color: "rgba(212,255,43,0.85)",
                border: "1px solid rgba(212,255,43,0.22)",
                background: "rgba(212,255,43,0.04)",
              }}
            >
              Get your Bottleneck Score
              <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block" aria-hidden>→</span>
            </Link>

          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer
        className="flex items-center justify-center py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span
          className="font-sora text-fg/18"
          style={{ fontSize: "11px", letterSpacing: "1px" }}
        >
          care less AI automation · Santander, Spain
        </span>
      </footer>

      <ScrollReveal />
    </>
  );
}
