import { Box, Divider, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

const ContentContainer: FC<{ title: string; children?: ReactNode }> = ({ title, children }) => {
  return (
    <Box p="35px 40px 40px" color="white" fontSize="30px" boxShadow="0px 5px 10px 0px rgba(0, 0, 0, 0.5)" mb="20px">
      <Text
        as="h1"
        fontWeight="bold"
        fontSize={{
          base: '24px',
          lg: '30px',
        }}
        lineHeight={{
          base: '39px',
          lg: '45px',
        }}
      >
        {title}
      </Text>
      <Divider my="16px" />
      <Box>{children}</Box>
    </Box>
  );
};

export default ContentContainer;
