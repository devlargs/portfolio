import { Box, Image, Flex, Button, Text, Link } from "@chakra-ui/react";
import { ProjectDataProps } from "interfaces/project.interfaces";
import { FC } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const ProjectCard: FC<{
  data: ProjectDataProps;
}> = ({ data }) => {
  return (
    <Box h="100%" key={data._id}>
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
        <Image minH="500px" src={data?.imageUrl} alt={data.slug} w="100%" />
        <Box bg="#0099FF" color="white" p="1rem">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="1.3rem">{data.name}</Text>
            <Link
              href={data.websiteUrl}
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
};

export default ProjectCard;
