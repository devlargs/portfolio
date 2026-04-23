import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, chakra, IconButton, Text } from '@chakra-ui/react';
import openNewTab from '@utils/openNewTab';
import testimonials from 'constants/testimonials';
import Image from 'next/image';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import defaults from 'theme/defaults';

const AUTOPLAY_MS = 6000;
const FADE_MS = 250;

const Testimonials: FC<{
  imagePlaceholders: Record<string, string>;
}> = ({ imagePlaceholders }) => {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const total = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const goTo = useCallback(
    (next: number): void => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (index === displayIndex) return;
    setIsVisible(false);
    const t = setTimeout(() => {
      setDisplayIndex(index);
      setIsVisible(true);
    }, FADE_MS);
    return (): void => clearTimeout(t);
  }, [index, displayIndex]);

  const next = useCallback((): void => goTo(index + 1), [goTo, index]);
  const prev = useCallback((): void => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!contentRef.current) return;
    const node = contentRef.current;
    const update = (): void => setContainerHeight(node.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return (): void => ro.disconnect();
  }, [displayIndex]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return (): void => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

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

      {((): JSX.Element => {
        const testimonial = testimonials[displayIndex];
        const splitted = testimonial.avatar.split('.jpg').filter(Boolean)[0].split('/');
        const placeholder = splitted[splitted.length - 1];

        return (
          <Box
            height={containerHeight !== undefined ? `${containerHeight}px` : 'auto'}
            transition={`height ${FADE_MS}ms ease-in-out, opacity ${FADE_MS}ms ease-in-out`}
            opacity={isVisible ? 1 : 0}
            overflow="hidden"
          >
            <Box ref={contentRef}>
              <Box gap="12px" display="flex" alignItems="center">
                <Box w="40px" h="40px">
                  <Image
                    src={testimonial.avatar}
                    width={100}
                    height={100}
                    alt={testimonial.avatar}
                    style={{ borderRadius: '50%' }}
                    placeholder="blur"
                    blurDataURL={imagePlaceholders[placeholder]}
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
          </Box>
        );
      })()}
    </Box>
  );
};

export default Testimonials;
