import { Box, Text, useColorMode } from "@chakra-ui/react";
import { FillPictureAsset } from "sanity-lazy-load";
import { globalStyles } from "styles/global";

const Featured = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      mr={{
        base: 0,
        sm: "5",
      }}
      position="relative"
      h={400}
    >
      <Box boxShadow={globalStyles.misc.boxShadow} zIndex={1} h="100%">
        <FillPictureAsset image="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
      </Box>
      <Box
        d={{
          // base: "none",
          sm: "static",
        }}
        position="absolute"
        bg={`brand.${colorMode}`}
        top={10}
        left={0}
        zIndex={2}
        padding={{
          base: 4,
          sm: 6,
          md: 8,
          lg: 10,
        }}
        color="white"
        maxW={200}
      >
        <Text>TBD TBD TBD TBD TBD </Text>
      </Box>
    </Box>
  );
};

export default Featured;
