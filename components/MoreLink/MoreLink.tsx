import { Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

interface Props {
  href: string;
  label: string;
}

/** Underlined-in-accent continuation link. The arrow steps out on hover. */
const MoreLink: FC<Props> = ({ href, label }) => (
  <Box
    as={NextLink}
    href={href}
    display="inline-flex"
    alignItems="center"
    gap="var(--space-2xs)"
    whiteSpace="nowrap"
    fontFamily="var(--font-meta)"
    fontSize="var(--text-sm)"
    letterSpacing="0.04em"
    color="var(--color-ink)"
    pb="2px"
    borderBottom="var(--rule-thick) solid var(--color-accent)"
    transition="color var(--dur-1) var(--ease-out), gap var(--dur-2) var(--ease-out)"
    _hover={{ color: 'var(--color-accent)', gap: 'var(--space-xs)' }}
  >
    {label}
    <Box as="span" aria-hidden="true">
      &#8594;
    </Box>
  </Box>
);

export default MoreLink;
