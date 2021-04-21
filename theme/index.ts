import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const customTheme: ThemeOverride = {
  colors: {
    black: "#1A202C",
    white: "#F8F8F8",
    brand: {
      dark: "#252732",
      light: "#0099ff",
    },
  },
  fonts: {
    heading: "Roboto Condensed, sans-serif",
  },
};

export const theme = extendTheme({
  ...customTheme,
});
