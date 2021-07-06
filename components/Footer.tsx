import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import Container from "./Container";

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
          <Box d="flex">
            Made with 💖 by&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/devlargs"
            >
              <Text
                _hover={{
                  color: "blue.300",
                }}
                transition="0.5s ease-in"
                cursor="pointer"
              >
                largs
              </Text>
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
