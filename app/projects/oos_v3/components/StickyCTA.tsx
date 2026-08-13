"use client";

import { useEffect, useState } from "react";
import { useAudit } from "./AuditContext";

/**
 * Mobile-only sticky CTA, same shell as the sibling pages' StickyCTA.tsx —
 * appears once the visitor has scrolled past the demo video.
 */
export function StickyCTA() {
  const { openAudit } = useAudit();
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

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#171e19]/10 bg-white/95 p-3 backdrop-blur sm:hidden">
      <button
        type="button"
        onClick={() => openAudit("sticky_cta")}
        className="oh-display w-full rounded-lg bg-[#ffe17c] px-6 py-4 text-lg text-[#171e19] shadow-lg min-h-[52px]"
      >
        Get my free audit →
      </button>
    </div>
  );
}
