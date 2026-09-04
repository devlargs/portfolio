'use client';

import { useEffect, useState } from 'react';

/**
 * Whether the document is scrolled further than `threshold` pixels.
 *
 * Separate from `useScrollProgress` on purpose: progress is a ratio, and a
 * ratio cannot answer "has the reader actually travelled far enough to want a
 * way back". On a two-screen page 8% progress is eighty pixels.
 */
const useScrollPast = (threshold: number): boolean => {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = (): void => {
      frame = 0;
      setPast(window.scrollY > threshold);
    };

    const onScroll = (): void => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return (): void => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [threshold]);

  return past;
};

export default useScrollPast;
