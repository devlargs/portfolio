import { Box, Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import NextLink from 'next/link';
import { FC, ReactNode } from 'react';

interface Props {
  /** Small uppercase kicker above the rule. */
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Right-hand meta on the kicker line: counts, dates, tags. */
  meta?: ReactNode;
  backHref?: string;
  backLabel?: string;
}

/**
 * The `<h1>` band for a document that is not the home page. Same rule-above,
 * heading-below rhythm as SectionHead, one level up in the outline.
 */
const PageHead: FC<Props> = ({ eyebrow, title, lede, meta, backHref = '/', backLabel = 'Home' }) => (
  <Box
    maxW="var(--page-max)"
    mx="auto"
    px="var(--page-gutter)"
    pt={{ base: 'var(--space-xl)', md: 'var(--space-2xl)' }}
    pb={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}
  >
    <Reveal distance={8}>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="baseline"
        justifyContent="space-between"
        gap="var(--space-sm)"
        pb="var(--space-sm)"
        fontFamily="var(--font-meta)"
        fontSize="var(--text-2xs)"
        letterSpacing="0.12em"
        textTransform="uppercase"
        color="var(--color-ink-3)"
      >
        <Box display="inline-flex" alignItems="baseline" gap="var(--space-xs)">
          <Box
            as={NextLink}
            href={backHref}
            display="inline-flex"
            alignItems="baseline"
            gap="var(--space-3xs)"
            color="var(--color-ink-2)"
            transition="color var(--dur-1) var(--ease-out)"
            _hover={{ color: 'var(--color-accent)' }}
          >
            <Box as="span" aria-hidden="true">
              &#8592;
            </Box>
            {backLabel}
          </Box>

          {eyebrow && (
            <>
              <Box as="span" aria-hidden="true">
                /
              </Box>
              <Box as="span">{eyebrow}</Box>
            </>
          )}
        </Box>

        {meta && <Box as="span">{meta}</Box>}
      </Box>
    </Reveal>

    <Box h="var(--rule-hair)" bg="var(--color-ink)" mb="var(--space-md)" />

    <Reveal distance={12}>
      <Text
        as="h1"
        fontSize="var(--text-display-s)"
        lineHeight={1.04}
        letterSpacing="-0.03em"
        color="var(--color-ink)"
        m="0"
      >
        {title}
      </Text>
    </Reveal>

    {lede && (
      <Reveal delay={80} distance={12}>
        <Text
          mt="var(--space-md)"
          maxW="var(--measure)"
          fontSize="var(--text-lg)"
          lineHeight={1.65}
          color="var(--color-ink-2)"
        >
          {lede}
        </Text>
      </Reveal>
    )}
  </Box>
);

export default PageHead;
