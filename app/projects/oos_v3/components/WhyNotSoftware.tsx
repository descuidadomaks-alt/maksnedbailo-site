import { X, Check } from "lucide-react";

/** Section 5 — honest two-column contrast. No numbers, no invented figures. */
export function WhyNotSoftware() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="oh-display text-center text-3xl text-[#171e19] sm:text-5xl">
          Why not just buy software?
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#171e19]/10 bg-[#f8f9fa] p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#171e19]/10 text-[#171e19]/60">
                <X className="h-4 w-4" aria-hidden />
              </span>
              <h3 className="oh-display text-xl text-[#171e19]">Cheap software</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-[#171e19]/70">
              You set it up, you maintain it, you fix it. You become the developer.
            </p>
          </div>

          <div className="oh-card rounded-2xl border-2 border-[#171e19] bg-[#171e19] p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#ffe17c]/15 text-[#ffe17c]">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              <h3 className="oh-display text-xl text-white">Overtime OS</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Fully managed, done for you, for less than the cost of a part-time receptionist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
