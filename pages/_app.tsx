import { Box, ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Box bg="#212428">
      <Component {...pageProps} />
    </Box>
  </ChakraProvider>
);

export default App;
