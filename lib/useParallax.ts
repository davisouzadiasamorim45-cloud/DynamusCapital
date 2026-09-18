"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks an element's position relative to the viewport and eases a vertical
 * offset toward it every frame, producing a soft, delayed parallax follow
 * instead of a 1:1 scroll-linked jump.
 */
export function useParallax(strength = 0.15, ease = 0.07) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    let raf = 0;

    function tick() {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const target = center * strength;
        current.current += (target - current.current) * ease;
        setOffset(current.current);
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [strength, ease]);

  return { ref, offset };
}
