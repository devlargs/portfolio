'use client';

import { PointerEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react';

export const SLIDE_MS = 460;
const SWIPE_THRESHOLD = 50;

interface Carousel<T extends HTMLElement> {
  index: number;
  goTo: (next: number) => void;
  next: () => void;
  prev: () => void;
  trackRef: RefObject<T | null>;
  slideRefs: RefObject<Array<HTMLDivElement | null>>;
  containerHeight?: number;
  isDragging: boolean;
  dragPercent: number;
  handlers: {
    onPointerDown: (e: PointerEvent<T>) => void;
    onPointerMove: (e: PointerEvent<T>) => void;
    onPointerUp: (e: PointerEvent<T>) => void;
    onPointerCancel: (e: PointerEvent<T>) => void;
  };
}

const useCarousel = <T extends HTMLElement = HTMLDivElement>(total: number): Carousel<T> => {
  const [index, setIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<T>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dragStartX = useRef(0);
  const trackWidth = useRef(0);

  const goTo = useCallback(
    (nextIndex: number): void => {
      if (total <= 0) return;
      setIndex(((nextIndex % total) + total) % total);
    },
    [total]
  );

  const next = useCallback((): void => goTo(index + 1), [goTo, index]);
  const prev = useCallback((): void => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const measure = (): void => {
      const node = slideRefs.current[index];
      if (node) setContainerHeight(node.scrollHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return (): void => window.removeEventListener('resize', measure);
  }, [index]);

  const onPointerDown = (e: PointerEvent<T>): void => {
    if (trackRef.current) {
      trackWidth.current = trackRef.current.offsetWidth;
      trackRef.current.setPointerCapture(e.pointerId);
    }
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };

  const onPointerMove = (e: PointerEvent<T>): void => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  };

  const onPointerUp = (e: PointerEvent<T>): void => {
    if (!isDragging) return;
    if (trackRef.current) trackRef.current.releasePointerCapture(e.pointerId);
    const delta = e.clientX - dragStartX.current;
    setIsDragging(false);
    setDragOffset(0);
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
  };

  const dragPercent = isDragging && trackWidth.current ? (dragOffset / trackWidth.current) * 100 : 0;

  return {
    index,
    goTo,
    next,
    prev,
    trackRef,
    slideRefs,
    containerHeight,
    isDragging,
    dragPercent,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
  };
};

export default useCarousel;
