"use client";

import { useEffect, useRef } from "react";

/**
 * Observes the ref target and adds `visible` (or custom) class once it enters the viewport.
 * Unobserves after the first intersection.
 */
export function useInView(visibleClass = "visible") {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add(visibleClass);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleClass]);

  return ref;
}
