import { BRAND } from "../lib/config";

/** Minimal footer. Demo/portfolio disclosure kept honest. */
export function Footer() {
  return (
    <footer className="bg-[#171e19] pt-10 pb-28 text-center text-white/60 sm:pb-10">
      <p className="oh-display text-2xl text-white">
        {BRAND.replace(/\.$/, "")}
        <span className="text-[#ffe17c]">.</span>
      </p>
      <p className="mx-auto mt-3 max-w-md px-5 text-xs">
        Done-for-you lead-to-booking for home-service businesses. Demo figures shown
        anywhere on this page are sample data.
      </p>
    </footer>
  );
}
