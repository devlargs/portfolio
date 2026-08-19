import { Box, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

const FormField: FC<Props> = ({ label, htmlFor, error, children }) => (
  <Box mb="var(--space-md)">
    <Text
      as="label"
      htmlFor={htmlFor}
      display="block"
      fontFamily="var(--font-meta)"
      fontSize="var(--text-2xs)"
      fontWeight={500}
      letterSpacing="0.12em"
      textTransform="uppercase"
      color="var(--color-ink-3)"
      mb="var(--space-3xs)"
    >
      {label}
    </Text>

    {children}

    {error && (
      <Text
        id={`${htmlFor}-error`}
        role="alert"
        fontFamily="var(--font-meta)"
        fontSize="var(--text-2xs)"
        letterSpacing="0.04em"
        color="var(--color-danger)"
        mt="var(--space-3xs)"
      >
        {error}
      </Text>
    )}
  </Box>
);

export default FormField;
