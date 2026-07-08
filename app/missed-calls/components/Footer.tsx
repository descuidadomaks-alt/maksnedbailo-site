import { BRAND } from "../lib/config";

export function Footer() {
  return (
    <footer className="bg-[#171e19] py-10 text-center text-white/60">
      <p className="oh-display text-2xl text-white">
        {BRAND}
        <span className="text-[#ffe17c]">.</span>
      </p>
      <p className="mx-auto mt-3 max-w-md px-5 text-xs">
        AI missed-call recovery for UK locksmiths.
      </p>
      <p className="mt-4 px-5 text-[11px]">
        <a href="/missed-calls/privacy" className="underline underline-offset-2 hover:text-white">
          Privacy Policy
        </a>
      </p>
    </footer>
  );
}
