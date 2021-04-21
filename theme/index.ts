import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const customTheme: ThemeOverride = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",
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
