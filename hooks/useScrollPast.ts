'use client';

import { useEffect, useState } from 'react';

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
