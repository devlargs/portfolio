import { ChakraProvider } from "@chakra-ui/react";
import { FC, PropsWithChildren, ReactNode } from "react";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
