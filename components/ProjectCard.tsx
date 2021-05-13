import {
  Box,
  Image,
  Flex,
  Button,
  Text,
  Link,
  Stack,
  Badge,
  useColorMode,
} from "@chakra-ui/react";
import { ProjectDataProps } from "interfaces/project.interfaces";
import { FC } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const ProjectCard: FC<{
  data: ProjectDataProps;
}> = ({ data }) => {
  const { colorMode } = useColorMode();

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
        <Image
          h={{
            base: "250px",
            sm: "300px",
            md: "450px",
            xl: "330px",
          }}
          src={data?.imageUrl}
          alt={data?.slug.current}
          w="100%"
        />
        <Box bg={`brand.${colorMode}`} color="white" p="1rem">
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="1.3rem">{data.name}</Text>
              {false && (
                <Stack direction="row" mt="2">
                  <Badge>Firebase</Badge>
                  <Badge>React</Badge>
                  <Badge>Tailwind CSS</Badge>
                </Stack>
              )}
            </Box>
            <Link
              href={data.websiteUrl}
              isExternal
              textDecor="none"
              _hover={{
                color: `brand.hover.${colorMode}`,
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
