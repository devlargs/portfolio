import { Box, Text } from '@chakra-ui/react';
import { Learning, readingMinutes } from '@constants/learnings';
import NextLink from 'next/link';
import { FC } from 'react';
import TagList from './TagList';

interface Props {
  learning: Learning;
  index: string;
}

const ROW_SX = {
  /* `row-mark`, same treatment as the work index so the two read as one site. */
  transition: 'background var(--dur-2) var(--ease-out)',
  '& .row-edge': {
    position: 'absolute',
    insetBlock: '0',
    insetInlineStart: '0',
    width: 'var(--rule-edge)',
    background: 'var(--color-accent)',
    transformOrigin: 'center bottom',
    transform: 'scaleY(0)',
    transition: 'transform var(--dur-2) var(--ease-out)',
    pointerEvents: 'none',
  },
  '&:hover, &:focus-visible': { background: 'var(--color-paper-2)' },
  '&:hover .row-edge, &:focus-visible .row-edge': { transform: 'scaleY(1)' },
  '&:hover .row-arrow, &:focus-visible .row-arrow': { transform: 'translateX(4px)', opacity: 1 },
} as const;

const LearningsIndexRow: FC<Props> = ({ learning, index }) => (
  <Box as="li" position="relative" borderBottom="var(--rule-hair) solid var(--color-rule)">
    <Box
      as={NextLink}
      href={`/learnings/${learning.slug}`}
      display="block"
      position="relative"
      overflow="hidden"
      sx={ROW_SX}
    >
      <Box className="row-edge" aria-hidden="true" />

      <Box
        position="relative"
        display="grid"
        gridTemplateColumns="2.75ch minmax(0, 1fr) 1.5ch"
        gap="var(--space-sm)"
        py={{ base: 'var(--space-sm)', md: 'var(--space-md)' }}
        px={{ base: 'var(--space-2xs)', md: 'var(--space-xs)' }}
      >
        <Text
          as="span"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-2xs)"
          lineHeight={2.4}
          color="var(--color-ink-3)"
          letterSpacing="0.04em"
        >
          {index}
        </Text>

        <Box minW="0">
          <Box
            fontFamily="var(--font-meta)"
            fontSize="var(--text-2xs)"
            letterSpacing="0.08em"
            textTransform="uppercase"
            color="var(--color-ink-3)"
          >
            {readingMinutes(learning)} min read
          </Box>

          <Text
            as="h2"
            mt="var(--space-3xs)"
            fontFamily="var(--font-display)"
            fontSize={{ base: 'var(--text-xl)', md: 'var(--text-2xl)' }}
            lineHeight={1.2}
            letterSpacing="-0.015em"
            color="var(--color-ink)"
            overflowWrap="anywhere"
          >
            {learning.title}
          </Text>

          <Text mt="var(--space-2xs)" maxW="var(--measure)" fontSize="var(--text-md)" color="var(--color-ink-2)">
            {learning.summary}
          </Text>

          <Box mt="var(--space-sm)">
            <TagList tags={learning.tags} />
          </Box>
        </Box>

        <Box
          as="span"
          className="row-arrow"
          aria-hidden="true"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-sm)"
          lineHeight={2.2}
          color="var(--color-accent)"
          opacity={0.45}
          transition="transform var(--dur-2) var(--ease-out), opacity var(--dur-2) var(--ease-out)"
        >
          &#8594;
        </Box>
      </Box>
    </Box>
  </Box>
);

export default LearningsIndexRow;
