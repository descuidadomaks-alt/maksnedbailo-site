/**
 * Shared animation variants — premium ease-out-expo timing.
 * Pass `reducedMotion` from useReducedMotion() to respect system prefs.
 */

export const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const STAGGER = 0.12;
export const DURATION = 0.82;

export function fadeUpVariants(reducedMotion = false) {
  return {
    hidden: reducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 24, scale: 0.98 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reducedMotion
        ? { duration: 0.2 }
        : {
            duration: DURATION,
            delay: i * STAGGER,
            ease: EASING,
          },
    }),
  };
}

/** Single-element fade (no stagger) */
export function fadeVariants(reducedMotion = false) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reducedMotion ? 0.15 : 0.6, ease: EASING },
    },
  };
}
