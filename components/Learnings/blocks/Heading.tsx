import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import RichText from '../RichText';

interface Props {
  content: string;
  /** Anchor target, so a single step can be linked to directly. */
  id: string;
}

const Heading: FC<Props> = ({ content, id }) => (
  <Box pt="var(--space-md)">
    <Box h="var(--rule-hair)" bg="var(--color-rule-strong)" mb="var(--space-sm)" />
    <Text as="h2" id={id} fontSize="var(--text-2xl)" lineHeight={1.2} letterSpacing="-0.015em" m="0">
      <RichText content={content} />
    </Text>
  </Box>
);

export default Heading;
