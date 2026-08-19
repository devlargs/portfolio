import { Box } from '@chakra-ui/react';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from '@constants/skills';
import { FC } from 'react';
import CapabilityGroup from './CapabilityGroup';

interface Props {
  imagePlaceholders: Record<string, string>;
}

const Capabilities: FC<Props> = ({ imagePlaceholders }) => (
  <Box display="flex" flexDirection="column" gap={{ base: 'var(--space-xl)', md: 'var(--space-2xl)' }}>
    <CapabilityGroup title="Primary" skills={PRIMARY_SKILLS} imagePlaceholders={imagePlaceholders} emphasis />
    <CapabilityGroup title="Secondary" skills={SECONDARY_SKILLS} imagePlaceholders={imagePlaceholders} />
  </Box>
);

export default Capabilities;
