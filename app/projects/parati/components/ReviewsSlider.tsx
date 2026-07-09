"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Review } from "../lib/content";
import { ReviewCard } from "./ReviewCard";

/**
 * Swipeable review slider — CSS scroll-snap (no carousel library). One card
 * + a peek of the next on mobile, three visible on desktop. Auto-advances
 * every 6s, pauses on hover/touch, small gold dot indicators.
 */
export function ReviewsSlider({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [index, setIndex] = useState(0);
  const reduce = !!useReducedMotion();

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    const child = track?.children[i] as HTMLElement | undefined;
    if (!track || !child) return;
    track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  // Auto-advance
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => {
        const next = (i + 1) % reviews.length;
        scrollToIndex(next);
        return next;
      });
    }, 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, reviews.length]);

  // Keep dots in sync with manual swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        let closest = 0;
        let closestDist = Infinity;
        children.forEach((c, i) => {
          const dist = Math.abs(c.offsetLeft - track.offsetLeft - track.scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => {
          setTimeout(() => (pausedRef.current = false), 4000);
        }}
      >
        {reviews.map((r) => (
          <div key={r.name} className="w-[86%] flex-none snap-start sm:w-[64%] md:w-[calc(33.333%-0.75rem)]">
            <ReviewCard review={r} />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a la reseña ${i + 1} de ${reviews.length}`}
            aria-current={i === index}
            onClick={() => {
              pausedRef.current = true;
              scrollToIndex(i);
              setIndex(i);
            }}
            className="flex h-11 w-8 items-center justify-center"
          >
            <span
              aria-hidden
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-gold" : "w-1.5 bg-gold/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
