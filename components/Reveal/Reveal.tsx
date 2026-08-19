'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import useReveal from 'hooks/useReveal';
import { FC, PropsWithChildren } from 'react';

interface Props extends BoxProps {
  /** Stagger offset in ms. Keep siblings under ~240ms total. */
  delay?: number;
  /** Vertical travel. 0 gives a pure fade for content that must not shift. */
  distance?: number;
}

/**
 * `line-reveal` primitive, single-element form.
 * Animates transform + opacity only; collapses to a 150ms fade under
 * prefers-reduced-motion via the global override in theme/styles.ts.
 */
const Reveal: FC<PropsWithChildren<Props>> = ({ delay = 0, distance = 16, children, ...rest }) => {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <Box
      ref={ref}
      opacity={revealed ? 1 : 0}
      transform={revealed ? 'translateY(0)' : `translateY(${distance}px)`}
      transition={`opacity var(--dur-4) var(--ease-out) ${delay}ms, transform var(--dur-4) var(--ease-out) ${delay}ms`}
      willChange="transform, opacity"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Reveal;
