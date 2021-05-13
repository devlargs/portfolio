import { Box, Heading } from "@chakra-ui/react";
import ProjectCard from "components/ProjectCard";
import { GetStaticProps } from "next";
import client from "helpers/sanityClient";
import { FC } from "react";
import { ProjectDataProps } from "interfaces/project.interfaces";

const ProjectCardWithHeading: FC<{
  data: ProjectDataProps[];
  title: string;
}> = ({ data, title }) => (
  <Box mt="2rem" overflow="hidden">
    <Heading as="h1" textAlign="center" mb="2.5rem" color="#1A202C">
      {title}
    </Heading>

    <Box
      d="grid"
      gridTemplateColumns={{
        md: "1fr",
        lg: "1fr 1fr",
      }}
      gridGap="1rem"
    >
      {data.map((q) => {
        return <ProjectCard data={q} />;
      })}
    </Box>
  </Box>
);

const Projects: FC<{
  data: ProjectDataProps[];
}> = ({ data }) => {
  return (
    <>
      <ProjectCardWithHeading data={data} title="Personal Projects" />
      <ProjectCardWithHeading
        data={data}
        title="Projects I contributed to my previous company"
      />
      <ProjectCardWithHeading data={data} title="Clones" />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projectTypes = `
    *[_type == "projectType"] {
      name,
      _id
    }
  `;

  const query = `
    *[_type == "project"] {
      _id,
      name,
      slug,
      websiteUrl,
      image,
      "imageUrl": image.asset->url
    }
  `;
  const data = await client.fetch(query);

  return {
    props: {
      data,
    },
  };
};

export default Projects;
