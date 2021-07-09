import {
  Box,
  useColorMode,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  Stack,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Container from "components/Container";
import Link from "next/link";
import { FC } from "react";
import Logo from "./Logo";

const MenuLinks: FC<{ title: string; customUrl?: string }> = ({
  title,
  customUrl,
}) => {
  return (
    <Box
      width="6.25em"
      fontSize={{
        base: "20px",
        lg: "18px",
        xl: "20px",
      }}
      transition="0.5s ease-in"
      _hover={{
        color: "#1A202C",
      }}
      cursor="pointer"
    >
      <Link
        href={
          customUrl ||
          (title.toLowerCase() === "about" ? "/" : `/${title.toLowerCase()}`)
        }
      >
        {title}
      </Link>
    </Box>
  );
};

const Navbar: FC = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Link href="/">
            <Box flex="1" cursor="pointer">
              <Logo />
            </Box>
          </Link>

          <Box flex="1">
            <Box
              d={{
                base: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              justifyContent="flex-end"
              textAlign="center"
            >
              <MenuLinks title="About" />
              <MenuLinks title="Skills" />
              <MenuLinks title="Projects" />
              <MenuLinks title="Learnings" />
              {/* <Box fontSize="20px" width="6.25em">
                <Stack align="center" direction="row">
                  <Switch
                    size="lg"
                    colorScheme="blue"
                    onChange={toggleColorMode}
                    outline="none"
                  />
                </Stack>
              </Box> */}
            </Box>
          </Box>
          <IconButton
            bg="#0099FF"
            _hover={{
              bg: "#0099FF",
            }}
            aria-label="Open Menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            d={{
              base: "flex",
              sm: "flex",
              md: "none",
              xl: "none",
              lg: "none",
            }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Box>
      </Container>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#0099FF" alignItems="center">
          <DrawerHeader>
            <Link href="/">
              <Box flex="1" cursor="pointer">
                <Logo />
              </Box>
            </Link>
          </DrawerHeader>
          <DrawerBody onClick={onClose}>
            <Stack spacing={4} color="#F8F8F8">
              <MenuLinks title="About" />
              <MenuLinks title="Skills" />
              <MenuLinks title="Projects" />
              <MenuLinks title="Learnings" />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
