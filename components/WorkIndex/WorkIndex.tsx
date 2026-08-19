import { Box } from '@chakra-ui/react';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { FC } from 'react';
import IndexGroup from './IndexGroup';

interface Props {
  brokenLinks?: string[];
}

const WorkIndex: FC<Props> = ({ brokenLinks = [] }) => {
  const brokenSet = new Set(brokenLinks);

  return (
    <Box display="flex" flexDirection="column" gap={{ base: 'var(--space-xl)', md: 'var(--space-2xl)' }}>
      <IndexGroup title="Client work" projects={COMPANY_CONTRIBUTIONS} brokenSet={brokenSet} />
      <IndexGroup title="Personal projects" projects={PERSONAL_PROJECTS} brokenSet={brokenSet} />
    </Box>
  );
};

export default WorkIndex;
