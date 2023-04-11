import { Box, ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { FC } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import theme from 'theme';
import defaults from 'theme/defaults';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GoogleAnalytics trackPageViews strategy="lazyOnload" />
    <ChakraProvider theme={theme}>
      <Box bg="#212428" backgroundImage={defaults.backgroundPattern}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  </>
);

export default App;
