import { Box, Button, Flex, Text } from '@chakra-ui/react';
import COMMONS from '@theme/commons';
import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <Box px={COMMONS.px} h="96px" bg="brand">
      <Flex h="100%" alignItems="center" justifyContent="flex-end">
        <Text variant="navlink">About me</Text>
        <Text variant="navlink">Projects</Text>
        <Text variant="navlink">Learnings</Text>
        <Button variant="primary">Let’s talk →</Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
