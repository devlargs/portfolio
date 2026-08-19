import { Box, Text } from '@chakra-ui/react';
import { ACTIVE_SOCIALS, PROFILE } from '@constants/profile';
import { FC } from 'react';

interface Props {
  /** Passed from the server so the footer year never hydrates differently. */
  year: number;
}

/**
 * Ft5 statement footer: the name set large, then one hairline, then the meta
 * line. No link columns, no social icon row.
 */
const Colophon: FC<Props> = ({ year }) => (
  <Box as="footer" borderTop="var(--rule-hair) solid var(--color-rule)" bg="var(--color-paper-2)">
    <Box
      maxW="var(--page-max)"
      mx="auto"
      px="var(--page-gutter)"
      py={{ base: 'var(--space-xl)', md: 'var(--space-2xl)' }}
    >
      <Text
        fontFamily="var(--font-display)"
        fontSize="var(--text-display-s)"
        lineHeight={1.02}
        letterSpacing="-0.035em"
        color="var(--color-ink)"
        m="0"
        overflowWrap="anywhere"
      >
        {PROFILE.name}
        <Box as="span" color="var(--color-accent)" aria-hidden="true">
          .
        </Box>
      </Text>

      <Box
        mt={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}
        pt="var(--space-sm)"
        borderTop="var(--rule-hair) solid var(--color-rule-strong)"
        display="flex"
        flexWrap="wrap"
        alignItems="baseline"
        justifyContent="space-between"
        gap="var(--space-sm)"
        fontFamily="var(--font-meta)"
        fontSize="var(--text-2xs)"
        letterSpacing="0.06em"
        color="var(--color-ink-3)"
      >
        <Box as="span">&copy; {year} &middot; Built with Next.js, typeset in Fraunces and IBM Plex</Box>

        {ACTIVE_SOCIALS.length > 0 && (
          <Box display="flex" gap="var(--space-md)">
            {ACTIVE_SOCIALS.map((social) => (
              <Box
                as="a"
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener me"
                whiteSpace="nowrap"
                color="var(--color-ink-2)"
                transition="color var(--dur-1) var(--ease-out)"
                _hover={{ color: 'var(--color-accent)' }}
              >
                {social.label}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  </Box>
);

export default Colophon;
