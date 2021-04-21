import { useColorModeValue } from "@chakra-ui/color-mode";
import Container from "./Container";
import { Box, Grid } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box h="5rem">
      <Container>
        <Box
          color={useColorModeValue("black", "white")}
          h="5rem"
          d="grid"
          placeItems="center"
        >
          Made with 💖 by @devlargs.
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
