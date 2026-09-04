import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  items: readonly { label: string; value: string }[];
}

/**
 * Settings, set as a definition list. Values are monospaced because every one
 * of them is a string the reader is going to retype into a form.
 */
const FieldsBlock: FC<Props> = ({ items }) => (
  <Box as="dl" m="0" borderTop="var(--rule-hair) solid var(--color-ink)">
    {items.map((item) => (
      <Box
        key={item.label}
        display="grid"
        gridTemplateColumns={{ base: 'minmax(0, 1fr)', sm: 'minmax(0, 12ch) minmax(0, 1fr)' }}
        gap={{ base: 'var(--space-3xs)', sm: 'var(--space-md)' }}
        py="var(--space-xs)"
        borderBottom="var(--rule-hair) solid var(--color-rule)"
      >
        <Text
          as="dt"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-2xs)"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="var(--color-ink-3)"
          m="0"
          pt="0.2em"
        >
          {item.label}
        </Text>
        <Text
          as="dd"
          fontFamily="var(--font-meta)"
          fontSize="var(--text-sm)"
          color="var(--color-ink)"
          overflowWrap="anywhere"
          m="0"
        >
          {item.value}
        </Text>
      </Box>
    ))}
  </Box>
);

export default FieldsBlock;
