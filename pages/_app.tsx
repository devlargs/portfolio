import { Box, ChakraProvider } from "@chakra-ui/react";
import { theme } from "theme";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box
        // bg="red.500"
        width="100vw"
        h="80px"
        p="5"
        d="flex"
        alignItems="center"
      >
        <Box
          flex="1"
          // bg="green"
        >
          Logo
        </Box>
        <Box
          flex="1"
          // bg="blue"
        >
          <Box d="flex" justifyContent="flex-end">
            <Box width="6.25em">About</Box>
            <Box width="6.25em">Skills</Box>
            <Box width="6.25em">Projects</Box>
            <Box width="6.25em">TIL</Box>
          </Box>
        </Box>
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
