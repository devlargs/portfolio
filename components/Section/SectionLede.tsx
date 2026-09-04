import { Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { FC } from 'react';

interface Props {
  children: string;
  delay?: number;
}

/** Short standfirst. Sits under the heading at narrow measure, never beside it. */
const SectionLede: FC<Props> = ({ children, delay = 80 }) => (
  <Reveal delay={delay} distance={12}>
    <Text mt="var(--space-sm)" maxW="var(--measure)" fontSize="var(--text-lg)" lineHeight={1.6} color="var(--color-ink-2)">
      {children}
    </Text>
  </Reveal>
);

export default SectionLede;
