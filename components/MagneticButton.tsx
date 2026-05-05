"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * MagneticButton — desktop-only magnetic hover effect.
 * Wraps any child element; on mouse-move within the trigger radius (40px),
 * the element smoothly follows the cursor up to `maxOffset` pixels.
 * On mouse-leave it springs back to centre.
 *
 * Usage:
 *   <MagneticButton>
 *     <a href="..." className="...">CTA text</a>
 *   </MagneticButton>
 */
export default function MagneticButton({
  children,
  maxOffset = 8,
  triggerRadius = 40,
  className,
}: {
  children: React.ReactNode;
  maxOffset?: number;
  triggerRadius?: number;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.6 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduce) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < triggerRadius + rect.width / 2) {
        // Normalise & cap at maxOffset
        const factor = Math.min(1, (triggerRadius / Math.max(dist, 1)) * 0.5);
        rawX.set(dx * factor * (maxOffset / triggerRadius));
        rawY.set(dy * factor * (maxOffset / triggerRadius));
      }
    },
    [shouldReduce, triggerRadius, maxOffset, rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
