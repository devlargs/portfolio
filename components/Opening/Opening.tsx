'use client';

import { Box, Text } from '@chakra-ui/react';
import Reveal, { RevealLines } from '@components/Reveal';
import { PROFILE } from '@constants/profile';
import { FC } from 'react';
import AvailabilityLine from './AvailabilityLine';
import Portrait from './Portrait';

interface Props {
  portraitPlaceholder?: string;
}

const Opening: FC<Props> = ({ portraitPlaceholder }) => (
  <Box as="section" id="top" position="relative">
    <Box
      maxW="var(--page-max)"
      mx="auto"
      px="var(--page-gutter)"
      py={{ base: 'var(--space-2xl)', md: 'var(--space-3xl)' }}
    >
      {/* standing head: role and place, the way a masthead dateline reads */}
      <Reveal distance={8}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          gap="var(--space-xs)"
          pb="var(--space-sm)"
          borderBottom="var(--rule-hair) solid var(--color-rule)"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-xs)"
          letterSpacing="0.08em"
          textTransform="uppercase"
          color="var(--color-ink-3)"
        >
          <Box as="span" color="var(--color-ink-2)">
            {PROFILE.role}
          </Box>
          <Box as="span" aria-hidden="true">
            /
          </Box>
          <Box as="span">{PROFILE.location}</Box>
        </Box>
      </Reveal>

      {/* the one h1 on the page */}
      <Box mt={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}>
        <RevealLines
          as="h1"
          fontSize="var(--text-display)"
          lineHeight={1.02}
          letterSpacing="-0.035em"
          lines={[
            'I build web software',
            <>
              that feels{' '}
              <Box
                as="span"
                position="relative"
                color="var(--color-accent)"
                sx={{
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '0.06em',
                    height: '0.055em',
                    background: 'currentColor',
                    opacity: 0.42,
                  },
                }}
              >
                obvious
              </Box>
              .
            </>,
          ]}
        />
      </Box>

      {/* asymmetric band: reading column left, identity block right */}
      <Box
        mt={{ base: 'var(--space-xl)', md: 'var(--space-2xl)' }}
        display="grid"
        gap={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}
        gridTemplateColumns={{ base: 'minmax(0, 1fr)', md: 'minmax(0, 1.35fr) minmax(0, 1fr)' }}
        alignItems="start"
      >
        <Reveal delay={120}>
          <Text fontSize="var(--text-lg)" lineHeight={1.7} color="var(--color-ink-2)" maxW="var(--measure)" m="0">
            React, Next.js, Node and TypeScript, shipped with teams across Europe, Asia and the US. I care about the
            parts nobody is meant to notice: the state that stays in sync, the form that does not lose your work, the
            page that is already there when you arrive.
          </Text>

          <Box mt="var(--space-md)">
            <Box
              as="a"
              href="#work"
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
              See selected work
              <Box as="span" aria-hidden="true">
                &#8595;
              </Box>
            </Box>
          </Box>
        </Reveal>

        <Reveal delay={200}>
          <Box display="flex" gap="var(--space-md)" alignItems="flex-start">
            <Portrait
              src="/images/linkedin/ralph.jpg"
              alt={`${PROFILE.name}, ${PROFILE.role}`}
              blurDataURL={portraitPlaceholder}
            />
            <Box minW="0">
              <Text
                fontFamily="var(--font-display)"
                fontSize="var(--text-2xl)"
                lineHeight={1.15}
                color="var(--color-ink)"
                m="0"
              >
                {PROFILE.name}
              </Text>
              <Box mt="var(--space-2xs)">
                <AvailabilityLine label={PROFILE.availabilityLabel} live={PROFILE.available} />
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </Box>
  </Box>
);

export default Opening;
