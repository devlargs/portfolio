import {
  Box,
  Heading,
  Image,
  Flex,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import ProjectCard from "components/ProjectCard";
import { GetStaticProps } from "next";
import client from "helpers/sanityClient";
import { FC } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface ProjectDataProps {
  image: any;
  name: string;
  slug: string;
  websiteUrl: string;
  imageUrl?: string;
  _id: string;
}

const Projects: FC<{
  data: ProjectDataProps[];
}> = ({ data }) => {
  console.log(data);

  return (
    <Box mt="2rem" overflow="hidden">
      <Heading as="h1" textAlign="center" mb="2.5rem" color="#1A202C">
        Projects I've worked on
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
          return (
            <Box h="100%" key={q._id}>
              <Box
                bg="#fefefe"
                boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                mb="4"
                borderRadius="0.5rem"
                transition="0.5s ease-in"
                _hover={{
                  boxShadow: "lightgray 0px 5px 10px",
                }}
                color="#1A202C"
              >
                <Image minH="500px" src={q?.imageUrl} alt={q.slug} w="100%" />
                <Box bg="#0099FF" color="white" p="1rem">
                  <Flex justifyContent="space-between">
                    <Text fontSize="1.3rem">{q.name}</Text>
                    <Link
                      href={q.websiteUrl}
                      isExternal
                      textDecor="none"
                      _hover={{
                        color: "#1A202C",
                      }}
                    >
                      <Button
                        transition="0.25s ease-out"
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme="white"
                        variant="link"
                        _hover={{
                          textDecor: "none",
                        }}
                      >
                        Go to link
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
