import { Box, Heading, useColorMode } from "@chakra-ui/react";
import ProjectCard from "components/ProjectCard";
import { GetStaticProps } from "next";
import client from "helpers/sanityClient";
import { FC } from "react";
import { ProjectDataProps } from "interfaces/project.interfaces";
import { PROJECT_TYPES, PROJECTS_BY_TYPE } from "queries/project.query";
import { keyBy } from "helpers/objectManipulation";
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
  <>
    <ProjectCardWithHeading data={personal} title="Personal Projects" />
    <ProjectCardWithHeading
      data={contributions}
      title="Projects I contributed to my previous company"
    />
    <ProjectCardWithHeading data={clones} title="Clones / Mockups" />
  </>
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
    revalidate: 60,
  };
};

export default Projects;
