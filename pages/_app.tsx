import { ChakraProvider } from "@chakra-ui/react";
import { Fonts } from "styles/Fonts";
import Navbar from "components/Navbar";
import { theme } from "theme";
import Container from "components/Container";
import Footer from "components/Footer";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Navbar />
      <Container minH="calc(100vh - 160px)">
        <Component {...pageProps} />
      </Container>
      <Footer />
    </ChakraProvider>
  );
};

export default App;
