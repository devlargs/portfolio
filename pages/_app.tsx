import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '@components/Navbar';
import theme from '@theme/index';
import { AppProps } from 'next/app';
import { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
