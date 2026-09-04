import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  index: string;
  title: string;
  href: string;
  domain: string;
  /** Notable engagement — carries the accent tick and full-strength ink. */
  highlight?: boolean;
  /** Server-side link check failed, so no anchor is rendered. */
  unavailable?: boolean;
}

const ROW_SX = {
  /* `row-mark`: a neutral surface step plus a solid accent edge that draws up
     the left side. Deliberately not a tinted fill — a light tint of the red
     accent is pink, and at full-row scale it swamps the page.
     Same treatment on :focus-visible so keyboard gets identical feedback. */
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
  '&:hover .row-domain, &:focus-visible .row-domain': { color: 'var(--color-accent)' },
} as const;

const IndexRow: FC<Props> = ({ index, title, href, domain, highlight = false, unavailable = false }) => {
  const content = (
    <>
      {!unavailable && <Box className="row-edge" aria-hidden="true" />}

      <Box
        position="relative"
        display="grid"
        gridTemplateColumns="2.75ch minmax(0, 1fr) 1.5ch"
        gap="var(--space-sm)"
        alignItems="baseline"
        py={{ base: 'var(--space-xs)', md: 'var(--space-sm)' }}
        px={{ base: 'var(--space-2xs)', md: 'var(--space-xs)' }}
      >
        <Text
          as="span"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-2xs)"
          color="var(--color-ink-3)"
          letterSpacing="0.04em"
        >
          {index}
        </Text>

        <Box
          minW="0"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'flex-start', md: 'baseline' }}
          justifyContent="space-between"
          gap={{ base: '2px', md: 'var(--space-md)' }}
        >
          <Text
            as="span"
            fontFamily="var(--font-display)"
            fontSize={{ base: 'var(--text-xl)', md: 'var(--text-2xl)' }}
            lineHeight={1.2}
            letterSpacing="-0.015em"
            color={unavailable ? 'var(--color-ink-3)' : highlight ? 'var(--color-ink)' : 'var(--color-ink-2)'}
            overflowWrap="anywhere"
            minW="0"
          >
            {title}
            {highlight && !unavailable && (
              <Box as="span" ml="0.35em" color="var(--color-accent)" fontSize="0.5em" aria-hidden="true">
                &#9679;
              </Box>
            )}
          </Text>

          <Text
            as="span"
            className="row-domain"
            fontFamily="var(--font-meta)"
            fontSize="var(--text-2xs)"
            letterSpacing="0.04em"
            color="var(--color-ink-3)"
            whiteSpace="nowrap"
            flexShrink={0}
            transition="color var(--dur-2) var(--ease-out)"
          >
            {unavailable ? 'link unavailable' : domain}
          </Text>
        </Box>

        <Box
          as="span"
          className="row-arrow"
          aria-hidden="true"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-sm)"
          color="var(--color-accent)"
          opacity={unavailable ? 0 : 0.45}
          transition="transform var(--dur-2) var(--ease-out), opacity var(--dur-2) var(--ease-out)"
        >
          {unavailable ? '' : '→'}
        </Box>
      </Box>
    </>
  );

  if (unavailable) {
    return (
      <Box as="li" position="relative" borderBottom="var(--rule-hair) solid var(--color-rule)">
        <Box position="relative" title="This site did not respond when the page was built">
          {content}
        </Box>
      </Box>
    );
  }

  return (
    <Box as="li" position="relative" borderBottom="var(--rule-hair) solid var(--color-rule)">
      <Box
        as="a"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        display="block"
        position="relative"
        overflow="hidden"
        sx={ROW_SX}
      >
        {content}
      </Box>
    </Box>
  );
};

export default IndexRow;
