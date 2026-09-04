import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import StackList from './StackList';

const CORE_STACK = ['ReactJS', 'Next.js', 'NodeJS', 'TypeScript', 'MongoDB'] as const;
const WAYS_OF_WORKING = ['Daily stand-ups', 'Code reviews', 'Shared project management'] as const;

/**
 * Margin annotations. Starts level with the section heading rather than below
 * the lede, so the column head is not left holding dead space.
 */
const AboutRail: FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    gap="var(--space-lg)"
    pl={{ base: '0', md: 'var(--space-md)' }}
    borderLeft={{ base: 'none', md: 'var(--rule-hair) solid var(--color-rule)' }}
  >
    <StackList label="Core stack" items={CORE_STACK} />
    <StackList label="Ways of working" items={WAYS_OF_WORKING} />
  </Box>
);

export default AboutRail;
