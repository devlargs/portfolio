import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  label: string;
  items: readonly string[];
}

/**
 * Marginal note: a mono label over a hairline-separated set list.
 * Reads as an annotation in the margin rather than a card of chips.
 */
const StackList: FC<Props> = ({ label, items }) => (
  <Box>
    <Text
      as="h3"
      fontFamily="var(--font-meta)"
      fontSize="var(--text-2xs)"
      fontWeight={500}
      letterSpacing="0.12em"
      textTransform="uppercase"
      color="var(--color-ink-3)"
      m="0"
      pb="var(--space-2xs)"
      borderBottom="var(--rule-hair) solid var(--color-rule)"
    >
      {label}
    </Text>

    <Box as="ul" listStyleType="none" m="0" p="0">
      {items.map((item) => (
        <Box
          as="li"
          key={item}
          display="flex"
          alignItems="baseline"
          gap="var(--space-2xs)"
          py="var(--space-2xs)"
          borderBottom="var(--rule-hair) solid var(--color-rule)"
          fontSize="var(--text-sm)"
          color="var(--color-ink-2)"
        >
          <Box as="span" color="var(--color-accent)" aria-hidden="true" flexShrink={0} fontSize="var(--text-2xs)">
            &#9642;
          </Box>
          <Box as="span" minW="0">
            {item}
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export default StackList;
