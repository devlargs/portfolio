'use client';

import { Box } from '@chakra-ui/react';
import useReveal from 'hooks/useReveal';
import { ElementType, FC, ReactNode } from 'react';

interface Props {
  /** Copy authored as explicit lines so the mask lands on real line breaks. */
  lines: ReadonlyArray<ReactNode>;
  as?: ElementType;
  stagger?: number;
  fontSize?: string;
  lineHeight?: string | number;
  letterSpacing?: string;
  color?: string;
  maxW?: string;
}

/**
 * `line-reveal` primitive, multi-line form.
 * Each line sits in its own overflow-clipped row and travels up from below it,
 * so the copy unmasks rather than fading in as a block.
 */
const RevealLines: FC<Props> = ({
  lines,
  as = 'h2',
  stagger = 60,
  fontSize = 'var(--text-display-s)',
  lineHeight = 1.05,
  letterSpacing = '-0.02em',
  color = 'var(--color-ink)',
  maxW,
}) => {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <Box ref={ref} as={as} maxW={maxW} color={color} fontSize={fontSize} letterSpacing={letterSpacing} m="0">
      {lines.map((line, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={i} overflow="hidden" display="block" lineHeight={lineHeight}>
          <Box
            display="block"
            transform={revealed ? 'translateY(0)' : 'translateY(102%)'}
            opacity={revealed ? 1 : 0}
            transition={`transform var(--dur-4) var(--ease-out) ${
              i * stagger
            }ms, opacity var(--dur-3) var(--ease-out) ${i * stagger}ms`}
            willChange="transform"
          >
            {line}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RevealLines;
