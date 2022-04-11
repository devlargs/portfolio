import { Box, Button, Flex, Grid, Img, Text } from '@chakra-ui/react';
import PROJECTS from '@constants/projects';
import { FC, useState } from 'react';

type Project = {
  heading: string;
  variant: 'short' | 'long';
  type: 'personal' | 'contribution' | 'clones';
};

const Projects: FC<Project> = ({ heading, variant, type }) => {
  const [active, setActive] = useState<number | null>(null);

  const tempProjects = [...PROJECTS].filter((project) => project.type === type);
  const projectArray = variant === 'short' ? [...tempProjects].splice(0, 4) : [...tempProjects];

  return (
    <Box>
      <Flex mb="60px" justifyContent="space-between" alignItems="center">
        <Text fontWeight={600} lineHeight="42px" fontSize="32px">
          {heading}
        </Text>
        {variant === 'short' && <Button variant="link">See all →</Button>}
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {projectArray.map((item, i) => {
          return (
            <Box key={i} bg="#E2E8F6" h="350px">
              <Img src={`/images/projects/${item.name.split(' ').join('-').toLowerCase()}.png`} h="250px" w="100%" />
              <Box
                h="100px"
                d="flex"
                flexDirection="column-reverse"
                _hover={{
                  bg: '#405ED7',
                  color: 'white',
                }}
                transition="0.5s ease-in"
                onMouseLeave={(): void => setActive(null)}
                onMouseOver={(): void => setActive(i)}
              >
                <Text mb="21px" ml="1rem" fontSize="18px" cursor="pointer" d={active === i ? 'initial' : 'none'}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    Visit Website →
                  </a>
                </Text>
                <Text ml="1rem" fontSize="18px" fontWeight="600" mb={active === i ? '0' : '32px'}>
                  {item.name}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Projects;
