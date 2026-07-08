"use client";

import { useState } from "react";
import { FAQ as FAQ_ITEMS } from "../lib/config";
import { Dot } from "./Dot";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#f8f9fa] px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="oh-display text-center text-4xl text-[#171e19] sm:text-6xl">
          Questions<Dot />
        </h2>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="oh-card overflow-hidden rounded-xl border border-[#171e19]/10 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left min-h-[52px]"
                >
                  <span className="font-medium text-[#171e19]">{item.q}</span>
                  <span
                    aria-hidden
                    className={`oh-display flex-none text-2xl text-[#171e19]/40 transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[#171e19]/70">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
