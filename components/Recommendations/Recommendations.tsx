'use client';

import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import Quote, { Testimonial } from './Quote';
import QuoteNav from './QuoteNav';
import useCarousel, { SLIDE_MS } from './useCarousel';

interface Props {
  items: Testimonial[];
  imagePlaceholders: Record<string, string>;
}

/** `/images/linkedin/marc.jpg` -> `marc` */
const getPlaceholderKey = (avatar: string): string => {
  const [path] = avatar.split('.jpg');
  const parts = path.split('/');
  return parts[parts.length - 1];
};

const Recommendations: FC<Props> = ({ items, imagePlaceholders }) => {
  const total = items.length;
  const { index, goTo, next, prev, trackRef, slideRefs, containerHeight, isDragging, dragPercent, handlers } =
    useCarousel<HTMLDivElement>(total);

  return (
    <Box w="100%" position="relative">
      <Box mb={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}>
        <QuoteNav total={total} index={index} onPrev={prev} onNext={next} onGoTo={goTo} />
      </Box>

      <Box
        ref={trackRef}
        position="relative"
        overflow="hidden"
        w="100%"
        minW="0"
        height={containerHeight ? `${containerHeight}px` : 'auto'}
        transition={`height ${SLIDE_MS}ms var(--ease-in-out)`}
        cursor={isDragging ? 'grabbing' : 'grab'}
        sx={{ touchAction: 'pan-y', userSelect: 'none', contain: 'layout' }}
        {...handlers}
      >
        {items.map((testimonial, i) => {
          const offset = (i - index) * 100 + dragPercent;
          const isActive = i === index;

          return (
            <Box
              key={testimonial.name}
              ref={(el: HTMLDivElement | null): void => {
                slideRefs.current[i] = el;
              }}
              /* The active slide stays in flow so the track is its true height
                 in the server HTML. If every slide were absolute the track would
                 render 0px tall and only gain its height after mount, shifting
                 everything below it once the page had already been scrolled. */
              position={isActive ? 'relative' : 'absolute'}
              top="0"
              left="0"
              w="100%"
              aria-hidden={!isActive}
              inert={!isActive}
              transform={`translateX(${offset}%)`}
              opacity={isActive ? 1 : 0}
              transition={
                isDragging
                  ? 'none'
                  : `transform ${SLIDE_MS}ms var(--ease-in-out), opacity ${SLIDE_MS}ms var(--ease-in-out)`
              }
            >
              <Quote testimonial={testimonial} blurDataURL={imagePlaceholders[getPlaceholderKey(testimonial.avatar)]} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Recommendations;
