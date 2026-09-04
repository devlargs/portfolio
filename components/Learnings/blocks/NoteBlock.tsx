import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import RichText from '../RichText';

interface Props {
  content: string;
  tone?: 'info' | 'warn';
}

/** An aside, marked by a rule in the margin rather than a tinted card. */
const NoteBlock: FC<Props> = ({ content, tone = 'info' }) => (
  <Box
    as="aside"
    borderLeft={`var(--rule-thick) solid ${tone === 'warn' ? 'var(--color-accent)' : 'var(--color-rule-strong)'}`}
    pl={{ base: 'var(--space-sm)', md: 'var(--space-md)' }}
    py="var(--space-3xs)"
  >
    <Text
      fontSize="var(--text-md)"
      lineHeight={1.7}
      color="var(--color-ink-2)"
      fontStyle={tone === 'warn' ? 'normal' : 'italic'}
      m="0"
    >
      <RichText content={content} />
    </Text>
  </Box>
);

export default NoteBlock;
