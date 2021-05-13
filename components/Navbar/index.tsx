import { FC } from "react";
import {
  Box,
  Stack,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Container from "components/Container";
import Link from "next/link";

const MenuLinks: FC<{ title: string }> = ({ title }) => {
  return (
    <Box
      width="6.25em"
      fontSize={{
        base: "14px",
        lg: "18px",
        xl: "20px",
      }}
      _hover={{
        color: "secondary.500",
      }}
      cursor="pointer"
    >
      <Link
        href={title.toLowerCase() === "about" ? "/" : `/${title.toLowerCase()}`}
      >
        {title}
      </Link>
    </Box>
  );
};

const Navbar: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue("brand.light", "brand.dark")}
      color="white"
      fontFamily="heading"
      width="100vw"
      h="5rem"
      py="5"
      d="flex"
      alignItems="center"
      overflow="hidden"
    >
      <Container>
        <Box alignItems="center" d="flex">
          <Box flex="1" fontSize="20px">
            ralphlargo
          </Box>
          <Box flex="1">
            <Box
              d={{
                base: "none",
                xl: "flex",
              }}
              justifyContent="flex-end"
              textAlign="center"
            >
              <MenuLinks title="About" />
              <MenuLinks title="Skills" />
              <MenuLinks title="Projects" />
              <MenuLinks title="TIL" />
              <Box fontSize="20px" width="6.25em">
                <Stack align="center" direction="row">
                  <Switch
                    size="lg"
                    colorScheme="blue"
                    onChange={toggleColorMode}
                    outline="none"
                  />
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
