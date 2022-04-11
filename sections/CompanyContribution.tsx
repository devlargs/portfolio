import { Box } from '@chakra-ui/react';
import Projects from '@components/Projects';
import { FC } from 'react';

const CompanyContribution: FC = () => {
  return (
    <Box bg="#eff1f6" pt="99px" pb="112px" px="64px" zIndex={3} pos="relative">
      <Projects heading="Company Contribution" type="contribution" variant="short" />
      <Box h="134px" />
      <Projects heading="Personal Projects" type="personal" variant="short" />
    </Box>
  );
};

export default CompanyContribution;
