import { Box } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  tags: readonly string[];
}

const TagList: FC<Props> = ({ tags }) => (
  <Box
    as="ul"
    listStyleType="none"
    display="flex"
    flexWrap="wrap"
    gap="var(--space-xs)"
    m="0"
    p="0"
    fontFamily="var(--font-meta)"
    fontSize="var(--text-2xs)"
    letterSpacing="0.08em"
    color="var(--color-ink-3)"
  >
    {tags.map((tag) => (
      <Box
        as="li"
        key={tag}
        px="var(--space-2xs)"
        py="2px"
        border="var(--rule-hair) solid var(--color-rule)"
        borderRadius="var(--radius-sm)"
        whiteSpace="nowrap"
      >
        {tag}
      </Box>
    ))}
  </Box>
);

export default TagList;
