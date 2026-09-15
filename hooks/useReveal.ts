'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
}

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

    const height = node.getBoundingClientRect().height;
    const fit = height > 0 ? Math.min(threshold, (window.innerHeight * threshold) / height) : threshold;

    let first = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const onArrival = first && entry.intersectionRect.height > 0;
        first = false;
        if (!entry.isIntersecting && !onArrival) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: fit, rootMargin }
    );

    observer.observe(node);
    return (): void => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, revealed };
};

export default useReveal;
