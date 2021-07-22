import { Box, Heading, useColorMode } from "@chakra-ui/react";
import Container from "components/Container";
import ProjectCard from "components/ProjectCard";
import { keyBy } from "helpers/objectManipulation";
import client from "helpers/sanityClient";
import { ProjectDataProps } from "interfaces/project.interfaces";
import { GetStaticProps } from "next";
import { PROJECTS_BY_TYPE, PROJECT_TYPES } from "queries/project.query";
import { FC } from "react";
import { globalStyles } from "styles/global";

const ProjectCardWithHeading: FC<{
  data: ProjectDataProps[];
  title: string;
}> = ({ data, title }) => {
  const { colorMode } = useColorMode();

  return (
    <Box mt={globalStyles.container.marginTop} overflow="hidden">
      <Heading
        as="h1"
        textAlign="center"
        mb="2.5rem"
        color={`typography.${colorMode}`}
      >
        {title}
      </Heading>

      <Box
        d="grid"
        gridTemplateColumns={{
          md: "1fr",
          lg: "1fr 1fr",
          xl: "1fr 1fr 1fr",
        }}
        gridGap="1rem"
      >
        {data.map((q) => {
          return <ProjectCard data={q} key={q?.slug?.current} />;
        })}
      </Box>
    </Box>
  );
};

const Projects: FC<{
  contributions: ProjectDataProps[];
  personal: ProjectDataProps[];
  clones: ProjectDataProps[];
}> = ({ personal, contributions, clones }) => (
  <Container minH="calc(100vh - 160px)">
    <ProjectCardWithHeading data={personal} title="Personal Projects" />
    <ProjectCardWithHeading
      data={contributions}
      title="Projects I contributed to my previous company"
    />
    <ProjectCardWithHeading data={clones} title="Clones / Mockups" />
  </Container>
);

interface IProjectTypes {
  _id: string;
  name: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const types = await client.fetch(PROJECT_TYPES);
  const projectTypes: {
    Contribution: IProjectTypes;
    Clones: IProjectTypes;
    Personal: IProjectTypes;
  } = keyBy(types, "name");

  const contributions = await client.fetch(PROJECTS_BY_TYPE, {
    projectTypeId: projectTypes.Contribution._id,
  });

  const clones = await client.fetch(PROJECTS_BY_TYPE, {
    projectTypeId: projectTypes.Clones._id,
  });

  const personal = await client.fetch(PROJECTS_BY_TYPE, {
    projectTypeId: projectTypes.Personal._id,
  });

  return {
    props: {
      clones,
      contributions,
      personal,
    },
    revalidate: 30,
  };
};

export default Projects;
