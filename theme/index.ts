import { extendTheme } from '@chakra-ui/react';
import components from './components';
import styles from './custom';

const semanticTokens = {
  colors: {
    brand: '#1a222d',
    white: '#EFF1F6',
    primary: '#405ED7',
    link: '#0F4797',
  },
};

const theme = extendTheme({
  styles,
  components,
  semanticTokens,
});

export default theme;
