'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

interface Options {
  /** Fraction of the element that must be visible before it reveals. */
  threshold?: number;
  /** Shrinks the viewport from the bottom so reveals fire above the fold edge. */
  rootMargin?: string;
}

/**
 * One-shot enter detection for the `line-reveal` primitive.
 *
 * Returns `revealed: true` immediately when IntersectionObserver is absent
 * (SSR, old browsers, or `prefers-reduced-motion` handled downstream in CSS),
 * so content is never trapped behind a transform that never runs.
 */
const useReveal = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
}: Options = {}): { ref: RefObject<T | null>; revealed: boolean } => {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return (): void => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, revealed };
};

export default useReveal;
