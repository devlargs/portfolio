import { extendTheme } from '@chakra-ui/react';
import components from './components';
import styles from './custom';

const theme = extendTheme({
  styles,
  components,
});

export default theme;
