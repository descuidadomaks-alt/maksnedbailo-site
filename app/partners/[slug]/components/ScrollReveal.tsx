"use client";

import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to every [data-reveal] element and adds
 * the "revealed" class when ≥15% of the element enters the viewport.
 *
 * Runs inside requestAnimationFrame so it fires AFTER React hydration and
 * all "use client" component sub-trees are fully in the DOM.
 * This prevents the race condition where elements with data-reveal haven't
 * been inserted yet when the effect runs.
 */
export default function ScrollReveal() {
  useEffect(() => {
    let raf: number;
    let observer: IntersectionObserver;

    raf = requestAnimationFrame(() => {
      const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!els.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -32px 0px",
        }
      );

      els.forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  return null;
}
