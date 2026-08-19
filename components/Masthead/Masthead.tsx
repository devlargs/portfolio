'use client';

import { Box, Text } from '@chakra-ui/react';
import { NAV_LINKS, PROFILE, SECTIONS } from '@constants/profile';
import useActiveSection from 'hooks/useActiveSection';
import { FC, useMemo } from 'react';
import NavLink from './NavLink';
import ScrollProgress from './ScrollProgress';
import ThemeToggle from './ThemeToggle';

/** N9 edge-aligned: wordmark hard left, destinations hard right, hairline under. */
const Masthead: FC = () => {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex={20}
      bg="color-mix(in oklab, var(--color-paper) 88%, transparent)"
      backdropFilter="blur(10px)"
      borderBottom="var(--rule-hair) solid var(--color-rule)"
    >
      <ScrollProgress />

      <Box
        maxW="var(--page-max)"
        mx="auto"
        px="var(--page-gutter)"
        h={{ base: '56px', md: '64px' }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="var(--space-sm)"
      >
        <Box
          as="a"
          href="#top"
          display="inline-flex"
          alignItems="baseline"
          gap="var(--space-2xs)"
          whiteSpace="nowrap"
          color="var(--color-ink)"
          transition="color var(--dur-1) var(--ease-out)"
          _hover={{ color: 'var(--color-accent)' }}
        >
          <Text as="span" fontFamily="var(--font-display)" fontSize="var(--text-lg)" letterSpacing="-0.01em">
            <Box as="span" display={{ base: 'none', sm: 'inline' }}>
              {PROFILE.wordmark}
            </Box>
            <Box as="span" display={{ base: 'inline', sm: 'none' }}>
              RL
            </Box>
          </Text>
          <Box
            as="span"
            w="5px"
            h="5px"
            borderRadius="var(--radius-pill)"
            bg="var(--color-accent)"
            flexShrink={0}
            aria-hidden="true"
          />
        </Box>

        <Box as="nav" aria-label="Sections" display="flex" alignItems="center" gap={{ base: '14px', md: '24px' }}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.id} href={`#${link.id}`} label={link.label} active={active === link.id} />
          ))}
          <ThemeToggle />
        </Box>
      </Box>
    </Box>
  );
};

export default Masthead;
