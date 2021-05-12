import { Box, Center, Flex, SimpleGrid, Heading } from "@chakra-ui/react";
import ProjectCard from "components/ProjectCard";

export default function Projects() {
  return (
    <Box mt="2rem">
      <Heading as="h1" textAlign="center" mb="2.5rem" color="#1A202C">
        Projects I've worked on
      </Heading>

      <SimpleGrid
        gridTemplateColumns={{
          lg: "1fr 1fr 1fr",
        }}
        gridGap="1rem"
      >
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </SimpleGrid>
    </Box>
  );
}
