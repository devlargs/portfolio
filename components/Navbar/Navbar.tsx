import { Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <Box h="96px" bg="#1a222d">
      <Flex h="100%" alignItems="center" justifyContent="flex-end">
        <Text variant="navlink">About me</Text>
        <Text variant="navlink">Projects</Text>
        <Text variant="navlink">Learnings</Text>
        <Text>Let's talkh</Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
