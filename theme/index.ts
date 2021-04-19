import { extendTheme } from "@chakra-ui/react";

const customTheme = {
  colors: {
    black: "#000000",
    primary: {
      500: "#6F1A07",
    },
    secondary: {
      500: "#A8763E",
    },
  },
  content: {
    maxWidth: 1600,
  },
  fonts: {
    heading: "Roboto Condensed, sans-serif",
  },
};

export const theme = extendTheme({
  ...customTheme,
});
