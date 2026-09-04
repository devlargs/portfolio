import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import RichText from '../RichText';

interface Props {
  content: string;
}

const Paragraph: FC<Props> = ({ content }) => (
  <Text fontSize="var(--text-lg)" lineHeight={1.75} color="var(--color-ink-2)" m="0">
    <RichText content={content} />
  </Text>
);

export default Paragraph;
