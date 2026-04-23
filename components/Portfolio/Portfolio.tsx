import { Box } from '@chakra-ui/react';
import { PERSONAL_PROJECTS } from '@constants/portfolio';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import ProjectSection from './ProjectSection';

const CompanyContributions = dynamic(() => import('./CompanyContributions'), { ssr: false });

interface Props {
  brokenLinks?: string[];
}

const Portfolio: FC<Props> = ({ brokenLinks = [] }) => {
  const brokenSet = new Set(brokenLinks);

  return (
    <Box pt="8px" display="flex" flexDirection="column" gap="28px">
      <CompanyContributions brokenSet={brokenSet} />
      <ProjectSection title="Personal Projects" projects={PERSONAL_PROJECTS} brokenSet={brokenSet} />
    </Box>
  );
};

export default Portfolio;
