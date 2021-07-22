import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ProjectDataProps } from "interfaces/project.interfaces";
import { FC } from "react";
import { FillPictureAsset } from "sanity-lazy-load";

const ProjectCard: FC<{
  data: ProjectDataProps;
}> = ({ data }) => {
  const { colorMode } = useColorMode();
  return (
    <Box h="100%" key={data._id}>
      <Box
        border="5px dotted darkgray"
        mb="10"
        borderRadius="0.5rem"
        transition="0.5s ease-in"
        _hover={{
          border: "5px dashed black",
        }}
        color="#1A202C"
      >
        <Box
          h={{
            base: "250px",
            sm: "300px",
            md: "450px",
            xl: "330px",
          }}
        >
          <FillPictureAsset image={data.imageUrl} />
        </Box>

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
