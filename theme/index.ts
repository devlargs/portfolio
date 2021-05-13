import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const customTheme: ThemeOverride = {
  colors: {
    black: "#1A202C",
    white: "#F8F8F8",
    brand: {
      dark: "#252732",
      light: "#0099ff",
      hover: {
        dark: "#0099ff",
        light: "#252732",
      },
    },
    typography: {
      light: "#1A202C",
      dark: "#F8F8F8",
    },
  },
  fonts: {
    heading: "Roboto Condensed, sans-serif",
  },
};

export const theme = extendTheme({
  ...customTheme,
});
