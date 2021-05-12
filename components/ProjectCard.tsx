import { Box, Image, Flex, Icon, Text } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

const ProjectCard = () => {
  return (
    <Box>
      <Box
        bg="#FEFFFF"
        p="1rem"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        mb="4"
        borderRadius="0.5rem"
        transition="0.25s ease-in"
        _hover={{
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
        }}
      >
        <Image
          src="/assets/png/maximum-performance.png"
          alt="Segun Adebayo"
          height="250px"
          w="100%"
        />

        <Text mt="2.5">Maximum Performance</Text>
      </Box>
    </Box>
  );
};

export default ProjectCard;
