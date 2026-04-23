import { Box } from '@chakra-ui/react';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { FC } from 'react';
import ProjectSection from './ProjectSection';

const Portfolio: FC = () => (
  <Box pt="8px" display="flex" flexDirection="column" gap="28px">
    <ProjectSection title="Company Contributions" projects={COMPANY_CONTRIBUTIONS} />
    <ProjectSection title="Personal Projects" projects={PERSONAL_PROJECTS} />
  </Box>
);

export default Portfolio;
