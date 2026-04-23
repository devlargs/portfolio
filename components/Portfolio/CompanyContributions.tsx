import { Box } from '@chakra-ui/react';
import { COMPANY_CONTRIBUTIONS } from '@constants/portfolio';
import { FC } from 'react';
import ProjectSection from './ProjectSection';

interface Props {
  brokenSet: Set<string>;
}

const CompanyContributions: FC<Props> = ({ brokenSet }) => (
  <Box data-nosnippet>
    <ProjectSection title="Company Contributions" projects={COMPANY_CONTRIBUTIONS} brokenSet={brokenSet} />
  </Box>
);

export default CompanyContributions;
