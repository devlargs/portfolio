import { Box, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  label: string;
  error?: string;
  children: ReactNode;
}

const FormField: FC<Props> = ({ label, error, children }) => (
  <Box mb="18px">
    <Text
      as="label"
      display="block"
      fontSize="11px"
      fontWeight={600}
      color="#878e99"
      letterSpacing="1.5px"
      textTransform="uppercase"
      mb="8px"
    >
      {label}
    </Text>
    {children}
    {error && (
      <Text fontSize="12px" mt="6px" color="#f56565">
        {error}
      </Text>
    )}
  </Box>
);

export default FormField;
