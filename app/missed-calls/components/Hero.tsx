import { BOOKING_LINK } from "../lib/config";

/**
 * Promise-first hero. No lead form here — the ad's Meta Instant Form is the
 * capture mechanism; this page's CTA routes straight to the booking calendar
 * for anyone who clicks through from the ad to learn more first.
 */
export function Hero() {
  return (
    <section className="oh-grid-bg bg-white px-5 pb-16 pt-28 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="oh-display text-sm text-[#171e19]/50 sm:text-base">
          For UK locksmiths
        </p>
        <h1 className="oh-display mt-4 text-5xl text-[#171e19] sm:text-7xl">
          Every missed call becomes a booked job<span className="text-[#ffe17c]">.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[#171e19]/70 sm:text-xl">
          Our AI answers your missed calls in under 60 seconds, qualifies the job, and books it
          straight into your diary — 24/7, even while you're mid-job.
        </p>
        <a
          href={BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="oh-display oh-card mt-8 inline-block rounded-lg bg-[#171e19] px-8 py-4 text-xl text-white shadow-lg hover:scale-[1.02] active:scale-100 min-h-[56px]"
        >
          Book my free call
        </a>
      </div>
    </section>
  );
}
