'use client';

import { Box } from '@chakra-ui/react';
import useScrollProgress from 'hooks/useScrollProgress';
import { FC } from 'react';

/**
 * `rail-track` primitive, horizontal form.
 * Sits on the masthead's bottom hairline and scales along it. Decorative only —
 * the side rail carries the accessible position information.
 */
const ScrollProgress: FC = () => {
  const progress = useScrollProgress();

  return (
    <Box position="absolute" left="0" right="0" bottom="-1px" h="var(--rule-thick)" aria-hidden="true">
      <Box
        h="100%"
        bg="var(--color-accent)"
        transformOrigin="left center"
        transform={`scaleX(${progress})`}
        willChange="transform"
      />
    </Box>
  );
};

export default ScrollProgress;
