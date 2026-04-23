import { Box, Grid, Text } from '@chakra-ui/react';
import { Projects } from '@constants/portfolio';
import { FC } from 'react';
import ProjectCard from './ProjectCard';

interface Props {
  title: string;
  projects: Projects[];
}

const ProjectSection: FC<Props> = ({ title, projects }) => (
  <Box>
    <Box display="flex" alignItems="center" gap="10px" mb="14px">
      <Text fontSize="14px" fontWeight={300} color="#c4cfde" letterSpacing="3px" textTransform="uppercase">
        {title}
      </Text>
      <Text
        fontSize="11px"
        fontWeight={600}
        color="#878e99"
        bg="rgba(255,255,255,0.04)"
        px="8px"
        py="2px"
        borderRadius="999px"
      >
        {projects.length}
      </Text>
    </Box>

    <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="10px">
      {projects.map((p) => (
        <ProjectCard key={p.title} title={p.title} link={p.link} />
      ))}
    </Grid>
  </Box>
);

export default ProjectSection;
