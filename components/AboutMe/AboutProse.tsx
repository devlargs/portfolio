import { Box, Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { FC, PropsWithChildren } from 'react';

const Lead: FC<PropsWithChildren> = ({ children }) => (
  <Box as="span" color="var(--color-accent)">
    {children}
  </Box>
);

/** The reading column: one drop-cap opening, one supporting paragraph. */
const AboutProse: FC = () => (
  <>
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
        enjoy turning ideas into reality through thoughtful, creative solutions, and I am always curious to explore new
        tools and ideas along the way.
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
  </>
);

export default AboutProse;
