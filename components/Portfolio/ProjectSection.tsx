import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { Projects } from '@constants/portfolio';
import { FC, useMemo, useRef, useState } from 'react';
import defaults from 'theme/defaults';
import ProjectCard from './ProjectCard';

interface Props {
  title: string;
  projects: Projects[];
  brokenSet?: Set<string>;
}

const INITIAL_VISIBLE = 8;
const LOAD_STEP = 4;

const sortProjects = (projects: Projects[]): Projects[] => {
  const highlighted = projects.filter((p) => p.highlight);
  const rest = projects.filter((p) => !p.highlight);
  return [...highlighted, ...rest];
};

const ProjectSection: FC<Props> = ({ title, projects, brokenSet }) => {
  const sorted = useMemo(() => sortProjects(projects), [projects]);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const prevVisibleRef = useRef(INITIAL_VISIBLE);

  const shown = sorted.slice(0, visible);
  const hasMore = visible < sorted.length;
  const animateFromIndex = prevVisibleRef.current;

  const handleShowMore = (): void => {
    prevVisibleRef.current = visible;
    setVisible((v) => v + LOAD_STEP);
  };

  return (
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
          {sorted.length}
        </Text>
      </Box>

      <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="10px">
        {shown.map((p, i) => (
          <ProjectCard
            key={p.title}
            title={p.title}
            link={p.link}
            isBroken={brokenSet?.has(p.link.trim())}
            animateIn={i >= animateFromIndex}
            animationDelay={(i - animateFromIndex) * 60}
          />
        ))}
      </Grid>

      {hasMore && (
        <Box display="flex" justifyContent="center" mt="18px">
          <Button
            onClick={handleShowMore}
            variant="ghost"
            size="sm"
            fontSize="12px"
            fontWeight={600}
            letterSpacing="1px"
            textTransform="uppercase"
            color={defaults.primary}
            border="1px solid rgba(50,171,255,0.3)"
            borderRadius="999px"
            px="20px"
            h="34px"
            transition="all 200ms ease"
            _hover={{
              bg: 'rgba(50,171,255,0.08)',
              borderColor: defaults.primary,
            }}
          >
            See more
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProjectSection;
