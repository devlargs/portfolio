import { Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { FC } from 'react';

interface Props {
  /** Section id. The heading is what `Section` points `aria-labelledby` at. */
  id: string;
  children: string;
  delay?: number;
}

const SectionTitle: FC<Props> = ({ id, children, delay = 0 }) => (
  <Reveal delay={delay} distance={12}>
    <Text
      as="h2"
      id={`${id}-head`}
      fontSize="var(--text-4xl)"
      lineHeight={1.06}
      letterSpacing="-0.02em"
      color="var(--color-ink)"
      m="0"
    >
      {children}
    </Text>
  </Reveal>
);

export default SectionTitle;
