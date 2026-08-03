import { BRAND } from "../lib/config";
import { ClockMark } from "./ClockMark";

/** Minimal footer — logo, disclosure, Privacy + Terms. No address, no other links. */
export function Footer() {
  return (
    <footer className="bg-[#171e19] pt-10 pb-28 text-center text-white/60 sm:pb-10">
      <p className="inline-flex items-center gap-2">
        <ClockMark variant="mark" className="h-6 w-6" />
        <span className="oh-display text-2xl text-white">
          {BRAND.replace(/\.$/, "")}
          <span className="text-[#ffe17c]">.</span>
        </span>
      </p>
      <p className="mx-auto mt-3 max-w-md px-5 text-xs">
        The AI operating system that runs your entire business.
      </p>
      <p className="mx-auto mt-2 max-w-md px-5 text-xs text-white/40">
        Demo figures shown anywhere on this page are sample data.
      </p>
      <p className="mt-4 flex items-center justify-center gap-3 px-5 text-[11px]">
        <a href="/projects/oos_v2_1/privacy" className="underline underline-offset-2 hover:text-white">
          Privacy Policy
        </a>
        <span className="text-white/30">·</span>
        <a href="/projects/oos_v2_1/terms" className="underline underline-offset-2 hover:text-white">
          Terms
        </a>
      </p>
    </footer>
  );
}
