import { extendTheme } from '@chakra-ui/react';
import styles from './styles';

const theme = extendTheme({
  styles,
  fonts: {
    heading: 'var(--font-display)',
    body: 'var(--font-body)',
    mono: 'var(--font-meta)',
  },
  /* Chakra's own colour-mode machinery is unused — the token layer in
   * app/tokens.css owns light/dark, so components stay colour-mode agnostic. */
  config: { initialColorMode: 'light', useSystemColorMode: false },
});

export default theme;
