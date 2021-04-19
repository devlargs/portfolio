import { FC } from "react";
import { Box, Stack, Switch } from "@chakra-ui/react";

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
      {title}
    </Box>
  );
};

const Navbar: FC = () => {
  return (
    <Box
      bg="primary.500"
      color="white"
      fontFamily="heading"
      width="100vw"
      h="80px"
      p="5"
      d="flex"
      alignItems="center"
    >
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
          <MenuLinks title="Blogs" />
          <Box fontSize="20px" width="6.25em">
            <Stack align="center" direction="row">
              <Switch size="lg" colorScheme="gray" />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
