'use client';

import { Box, Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { FC, PropsWithChildren } from 'react';
import StackList from './StackList';

const CORE_STACK = ['ReactJS', 'Next.js', 'NodeJS', 'TypeScript', 'MongoDB'] as const;
const WAYS_OF_WORKING = ['Daily stand-ups', 'Code reviews', 'Shared project management'] as const;

const Lead: FC<PropsWithChildren> = ({ children }) => (
  <Box as="span" color="var(--color-accent)">
    {children}
  </Box>
);

/**
 * Broadsheet body: one reading column at measure, annotations in the margin.
 * Collapses to a single column below md, notes last.
 */
const AboutMe: FC = () => (
  <Box
    display="grid"
    gap={{ base: 'var(--space-xl)', md: 'var(--space-2xl)' }}
    gridTemplateColumns={{ base: 'minmax(0, 1fr)', md: 'minmax(0, 1.6fr) minmax(0, 1fr)' }}
    alignItems="start"
  >
    <Box minW="0">
      <Reveal>
        {/* drop-cap opening — the one place the display face runs inside body copy */}
        <Text
          fontSize="var(--text-xl)"
          lineHeight={1.6}
          color="var(--color-ink)"
          maxW="var(--measure)"
          m="0"
          sx={{
            '&::first-letter': {
              fontFamily: 'var(--font-display)',
              float: 'left',
              fontSize: '3.4em',
              lineHeight: 0.82,
              paddingRight: '0.08em',
              marginTop: '0.06em',
              color: 'var(--color-accent)',
            },
          }}
        >
          I am a developer with a passion for building <Lead>clean web applications</Lead> that feel intuitive to use. I
          enjoy turning ideas into reality through thoughtful, creative solutions, and I am always curious to explore
          new tools and ideas along the way.
        </Text>
      </Reveal>

      <Reveal delay={100}>
        <Text
          mt="var(--space-md)"
          fontSize="var(--text-md)"
          lineHeight={1.8}
          color="var(--color-ink-2)"
          maxW="var(--measure)"
          m="0"
          pt="var(--space-md)"
        >
          Beyond solo hobby projects, I have collaborated with creative teams through daily stand-ups, code reviews and
          shared project management, shipping work that balances craft with pragmatism.
        </Text>
      </Reveal>
    </Box>

    <Reveal delay={160}>
      <Box
        display="flex"
        flexDirection="column"
        gap="var(--space-lg)"
        pl={{ base: '0', md: 'var(--space-md)' }}
        borderLeft={{ base: 'none', md: 'var(--rule-hair) solid var(--color-rule)' }}
      >
        <StackList label="Core stack" items={CORE_STACK} />
        <StackList label="Ways of working" items={WAYS_OF_WORKING} />
      </Box>
    </Reveal>
  </Box>
);

export default AboutMe;
