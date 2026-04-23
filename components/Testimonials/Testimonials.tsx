import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, chakra, IconButton, Text } from '@chakra-ui/react';
import openNewTab from '@utils/openNewTab';
import testimonials from 'constants/testimonials';
import Image from 'next/image';
import { FC, PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import defaults from 'theme/defaults';

const AUTOPLAY_MS = 6000;
const SLIDE_MS = 500;
const SWIPE_THRESHOLD = 50;

const Testimonials: FC<{
  imagePlaceholders: Record<string, string>;
}> = ({ imagePlaceholders }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const total = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number>(0);
  const trackWidth = useRef<number>(0);

  const goTo = useCallback(
    (next: number): void => {
      setIndex(((next % total) + total) % total);
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

  useEffect(() => {
    if (isPaused || isDragging) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return (): void => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isDragging, total]);

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
    <Box
      w="100%"
      position="relative"
      onMouseEnter={(): void => setIsPaused(true)}
      onMouseLeave={(): void => setIsPaused(false)}
    >
      <Box mt="24px" mb="24px" display="flex" alignItems="center" justifyContent="space-between" gap="12px">
        <IconButton
          aria-label="Previous testimonial"
          icon={<ChevronLeftIcon boxSize="32px" />}
          onClick={prev}
          size="lg"
          variant="ghost"
          color={defaults.primary}
          _hover={{ bg: 'rgba(255,255,255,0.06)' }}
        />

        <Box display="flex" gap="8px" alignItems="center">
          {testimonials.map((t, i) => (
            <Box
              key={t.name}
              as="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={(): void => goTo(i)}
              w={i === index ? '20px' : '8px'}
              h="8px"
              borderRadius="4px"
              bg={i === index ? defaults.primary : 'rgba(196,207,222,0.3)'}
              transition="all 300ms ease"
              cursor="pointer"
              border="none"
              p="0"
            />
          ))}
        </Box>

        <IconButton
          aria-label="Next testimonial"
          icon={<ChevronRightIcon boxSize="32px" />}
          onClick={next}
          size="lg"
          variant="ghost"
          color={defaults.primary}
          _hover={{ bg: 'rgba(255,255,255,0.06)' }}
        />
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
        {testimonials.map((testimonial, i) => {
          const splitted = testimonial.avatar.split('.jpg').filter(Boolean)[0].split('/');
          const placeholder = splitted[splitted.length - 1];
          const offset = (i - index) * 100 + dragPercent;

          return (
            <Box
              key={testimonial.name}
              position="absolute"
              top="0"
              left="0"
              w="100%"
              transform={`translateX(${offset}%)`}
              transition={isDragging ? 'none' : `transform ${SLIDE_MS}ms ease-in-out`}
              ref={(el: HTMLDivElement | null): void => {
                slideRefs.current[i] = el;
              }}
            >
              <Box gap="12px" display="flex" alignItems="center">
                <Box w="40px" h="40px">
                  <Image
                    src={testimonial.avatar}
                    width={100}
                    height={100}
                    alt={testimonial.avatar}
                    style={{ borderRadius: '50%', pointerEvents: 'none' }}
                    placeholder="blur"
                    blurDataURL={imagePlaceholders[placeholder]}
                    draggable={false}
                  />
                </Box>
                <Text fontSize="14px" position="relative" zIndex="99">
                  <chakra.span
                    fontWeight="bold"
                    color={defaults.primary}
                    cursor="pointer"
                    onClick={(): void => openNewTab(`https://linkedin.com/in/${testimonial.url}`)}
                  >
                    {testimonial.name}
                  </chakra.span>
                  &nbsp;<chakra.span fontSize="11px">- {testimonial.company}</chakra.span>
                </Text>
              </Box>
              <Box mt="16px">
                <Text
                  fontSize="16px"
                  lineHeight={{ base: '24px', lg: '28px' }}
                  color="#c4cfde"
                  textAlign={{ base: 'justify', lg: 'initial' }}
                >
                  {testimonial.testimonial}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Testimonials;
