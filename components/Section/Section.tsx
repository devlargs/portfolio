import { Box } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface Props {
  id: string;
  /** Sunken bands break the page rhythm without adding a card. */
  sunken?: boolean;
}

const Section: FC<PropsWithChildren<Props>> = ({ id, sunken = false, children }) => (
  <Box
    as="section"
    id={id}
    aria-labelledby={`${id}-head`}
    position="relative"
    bg={sunken ? 'var(--color-paper-2)' : 'transparent'}
    transition="background var(--dur-2) var(--ease-out)"
  >
    <Box
      maxW="var(--page-max)"
      mx="auto"
      px="var(--page-gutter)"
      py={{ base: 'var(--space-2xl)', md: 'var(--space-3xl)' }}
    >
      {children}
    </Box>
  </Box>
);

export default Section;
