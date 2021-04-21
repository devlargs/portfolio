import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box>
      <Box d="grid" placeItems="center" h="calc(100vh - 10rem)" px="10">
        <Box d="flex">
          <Box bg="red"></Box>
          <Box bg="yellow">RALPH LARGO</Box>
        </Box>
      </Box>
    </Box>
  );
}
