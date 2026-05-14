'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import theme from 'theme';
import defaults from 'theme/defaults';

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CacheProvider>
    <ChakraProvider theme={theme}>
      <Box bg="#212428" backgroundImage={defaults.backgroundPattern}>
        {children}
      </Box>
    </ChakraProvider>
  </CacheProvider>
);

export default Providers;
