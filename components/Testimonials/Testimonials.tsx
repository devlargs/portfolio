'use client';

import { Box } from '@chakra-ui/react';
import testimonials from 'constants/testimonials';
import { shuffleArray } from 'largs-utils';
import { FC, PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import Nav from './Nav';
import Slide from './Slide';

const SLIDE_MS = 500;
const SWIPE_THRESHOLD = 50;

const getPlaceholderKey = (avatar: string): string => {
  const parts = avatar.split('.jpg').filter(Boolean)[0].split('/');
  return parts[parts.length - 1];
};

const Testimonials: FC<{
  imagePlaceholders: Record<string, string>;
}> = ({ imagePlaceholders }) => {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState(testimonials);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = items.length;

  useEffect(() => {
    setItems(shuffleArray(testimonials) ?? testimonials);
  }, []);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number>(0);
  const trackWidth = useRef<number>(0);

  const goTo = useCallback(
    (nextIndex: number): void => {
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

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>): void => {
    if (trackRef.current) {
      trackWidth.current = trackRef.current.offsetWidth;
      trackRef.current.setPointerCapture(e.pointerId);
    }
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    if (trackRef.current) trackRef.current.releasePointerCapture(e.pointerId);
    const delta = e.clientX - dragStartX.current;
    setIsDragging(false);
    setDragOffset(0);
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
  };

  const dragPercent = isDragging && trackWidth.current ? (dragOffset / trackWidth.current) * 100 : 0;

  return (
    <Box w="100%" position="relative">
      <Box mt="24px" mb="32px">
        <Nav total={total} index={index} onPrev={prev} onNext={next} onGoTo={goTo} />
      </Box>

      <Box
        position="relative"
        overflow="hidden"
        w="100%"
        minW="0"
        height={containerHeight ? `${containerHeight}px` : 'auto'}
        transition={`height ${SLIDE_MS}ms ease-in-out`}
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        sx={{ touchAction: 'pan-y', userSelect: 'none', contain: 'layout' }}
        cursor={isDragging ? 'grabbing' : 'grab'}
      >
        {items.map((testimonial, i) => {
          const offset = (i - index) * 100 + dragPercent;
          const isActive = i === index;

          return (
            <Box
              key={testimonial.name}
              position="absolute"
              top="0"
              left="0"
              w="100%"
              transform={`translateX(${offset}%)`}
              opacity={isActive ? 1 : 0.4}
              transition={
                isDragging ? 'none' : `transform ${SLIDE_MS}ms ease-in-out, opacity ${SLIDE_MS}ms ease-in-out`
              }
              ref={(el: HTMLDivElement | null): void => {
                slideRefs.current[i] = el;
              }}
            >
              <Slide testimonial={testimonial} blurDataURL={imagePlaceholders[getPlaceholderKey(testimonial.avatar)]} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Testimonials;
