"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only sticky CTA bar. Hidden until the visitor has scrolled past the
 * video + form section (they've already seen the offer by then), then stays
 * pinned within thumb reach. Tapping it jumps straight to the form (not just
 * the section top) so a second scroll isn't needed. Hidden on sm+ (the nav +
 * section CTAs cover desktop).
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const demo = document.getElementById("demo");
    if (!demo) return;

    let ticking = false;
    const check = () => {
      ticking = false;
      const bottom = demo.getBoundingClientRect().bottom;
      setVisible(bottom < 0);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("book-call-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#171e19]/10 bg-white/95 p-3 backdrop-blur sm:hidden">
      <button
        type="button"
        onClick={scrollToForm}
        className="oh-display w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-lg min-h-[52px]"
      >
        Book my free call
      </button>
    </div>
  );
}
