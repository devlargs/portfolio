import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer>
      <Box h="96px" d="grid" bg="brand" placeContent="center">
        <Text color="white" lineHeight="21px" fontWeight={500}>
          Ralph Largo ⸺ Frontend Developer
        </Text>
      </Box>
    </footer>
  );
};

export default Footer;
