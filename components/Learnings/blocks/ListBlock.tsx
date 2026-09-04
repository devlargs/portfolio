import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import RichText from '../RichText';

interface Props {
  items: readonly string[];
  ordered?: boolean;
}

/** Markers are drawn in the gutter so the copy keeps a flush left edge. */
const ListBlock: FC<Props> = ({ items, ordered = false }) => (
  <Box as={ordered ? 'ol' : 'ul'} listStyleType="none" m="0" p="0" display="grid" gap="var(--space-sm)">
    {items.map((item, i) => (
      <Box
        as="li"
        key={item}
        display="grid"
        gridTemplateColumns="2.5ch minmax(0, 1fr)"
        gap="var(--space-sm)"
        fontSize="var(--text-lg)"
        lineHeight={1.7}
        color="var(--color-ink-2)"
      >
        <Box
          as="span"
          aria-hidden="true"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-2xs)"
          lineHeight={2.6}
          color="var(--color-accent)"
        >
          {ordered ? String(i + 1).padStart(2, '0') : '/'}
        </Box>
        <Box as="span">
          <RichText content={item} />
        </Box>
      </Box>
    ))}
  </Box>
);

export default ListBlock;
