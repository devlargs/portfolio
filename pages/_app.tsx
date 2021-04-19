import { Box, ChakraProvider } from "@chakra-ui/react";
import { Fonts } from "styles/Fonts";
import Navbar from "components/Navbar";
import { theme } from "theme";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
