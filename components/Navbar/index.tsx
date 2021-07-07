import {
  Box,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Switch,
} from "@chakra-ui/react";
import Container from "components/Container";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import Logo from "./Logo";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const MenuLinks: FC<{ title: string; customUrl?: string }> = ({
  title,
  customUrl,
}) => {
  const [color, setColor] = useState("black");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname.split("/")[1];
      const temp =
        pathname === "" || pathname === title.toLowerCase()
          ? "#1A202C"
          : "white";
      setColor(temp);
    }
  }, []);

  return (
    <Box
      width="6.25em"
      fontSize={{
        base: "14px",
        sm: "16px",
        md: "18px",
        lg: "20px",
      }}
      transition="0.5s ease-in"
      _hover={{
        color: "#1A202C",
      }}
      _selected={{ bg: "#1A202C" }}
      cursor="pointer"
      color={color}
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
            d={{ base: "flex", sm: "flex", md: "none", xl: "none", lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Box>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bgGradient="linear(to-l, #e7ebef,#96a2ad)" />
        <ModalContent
          textAlign="center"
          alignItems="center"
          bg={useColorModeValue("brand.light", "brand.dark")}
        >
          <ModalHeader>
            <Link href="/">
              <Box flex="1" cursor="pointer">
                <Logo />
              </Box>
            </Link>
          </ModalHeader>
          <ModalBody onClick={onClose} mb={2}>
            <Stack spacing={3} color="#F8F8F8">
              <MenuLinks title="About" />
              <MenuLinks title="Skills" />
              <MenuLinks title="Projects" />
              <MenuLinks title="Learnings" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;
