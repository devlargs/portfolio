'use client';

import { Box } from '@chakra-ui/react';
import { SECTIONS } from '@constants/profile';
import useActiveSection from 'hooks/useActiveSection';
import { FC, useMemo } from 'react';

/**
 * `rail-track` primitive, vertical form.
 * A numbered index of the document that marks where the reader is.
 * lg and up only — on narrow screens the masthead carries navigation alone.
 */
const SideRail: FC = () => {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);

  return (
    <Box
      as="nav"
      aria-label="Document index"
      /* xl and up only, and pinned into the leftover margin outside the page
         container so it can never sit on top of the reading column. */
      display={{ base: 'none', xl: 'block' }}
      position="fixed"
      left="max(0.5rem, calc((100vw - var(--page-max)) / 2 - var(--rail-width) - 0.5rem))"
      top="50%"
      transform="translateY(-50%)"
      zIndex={15}
      w="var(--rail-width)"
    >
      <Box display="flex" flexDirection="column" gap="var(--space-sm)">
        {SECTIONS.map((section) => {
          const isActive = active === section.id;

          return (
            <Box
              as="a"
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? 'true' : undefined}
              position="relative"
              display="flex"
              alignItems="center"
              gap="var(--space-2xs)"
              fontFamily="var(--font-meta)"
              fontSize="var(--text-2xs)"
              letterSpacing="0.08em"
              color={isActive ? 'var(--color-accent)' : 'var(--color-ink-3)'}
              transition="color var(--dur-2) var(--ease-out)"
              _hover={{ color: 'var(--color-accent)' }}
              sx={{ '&:hover .rail-label, &:focus-visible .rail-label': { opacity: 1, transform: 'translateX(0)' } }}
            >
              <Box
                as="span"
                w="18px"
                h="var(--rule-hair)"
                bg="currentColor"
                flexShrink={0}
                transformOrigin="left center"
                transform={isActive ? 'scaleX(1)' : 'scaleX(0.45)'}
                transition="transform var(--dur-3) var(--ease-out)"
                aria-hidden="true"
              />
              <Box as="span">{section.index}</Box>

              <Box
                as="span"
                className="rail-label"
                position="absolute"
                left="calc(100% + 10px)"
                whiteSpace="nowrap"
                opacity={0}
                transform="translateX(-6px)"
                transition="opacity var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out)"
                pointerEvents="none"
                textTransform="lowercase"
              >
                {section.label}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SideRail;
