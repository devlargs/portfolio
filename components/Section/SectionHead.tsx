import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Reveal from '@components/Reveal';

interface Props {
  id: string;
  title: string;
  /** Short standfirst. Sits under the rule at narrow measure, never beside it. */
  lede?: string;
}

/**
 * Rule above, heading below, standfirst below that — one column, always.
 * The tag-left / heading-right hanging header is deliberately not used here.
 */
const SectionHead: FC<Props> = ({ id, title, lede }) => (
  <Box mb={{ base: 'var(--space-lg)', md: 'var(--space-xl)' }}>
    <Box h="var(--rule-hair)" bg="var(--color-ink)" mb="var(--space-md)" />

    <Reveal distance={12}>
      <Text
        as="h2"
        id={`${id}-head`}
        fontSize="var(--text-4xl)"
        lineHeight={1.06}
        letterSpacing="-0.02em"
        color="var(--color-ink)"
        m="0"
      >
        {title}
      </Text>
    </Reveal>

    {lede && (
      <Reveal delay={80} distance={12}>
        <Text
          mt="var(--space-sm)"
          maxW="var(--measure)"
          fontSize="var(--text-lg)"
          lineHeight={1.6}
          color="var(--color-ink-2)"
        >
          {lede}
        </Text>
      </Reveal>
    )}
  </Box>
);

export default SectionHead;
