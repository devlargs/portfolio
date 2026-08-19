'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import theme from 'theme';

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <CacheProvider>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </CacheProvider>
);

export default Providers;
