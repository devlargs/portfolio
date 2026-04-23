import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import defaults from 'theme/defaults';

interface Props {
  label: string;
}

const TechChip: FC<Props> = ({ label }) => (
  <Box
    as="span"
    display="inline-flex"
    alignItems="center"
    px="10px"
    py="4px"
    fontSize="12px"
    fontWeight="500"
    color="#c4cfde"
    bg="rgba(50,171,255,0.08)"
    border="1px solid rgba(50,171,255,0.25)"
    borderRadius="999px"
    letterSpacing="0.3px"
    transition="all 200ms ease"
    _hover={{
      bg: 'rgba(50,171,255,0.15)',
      borderColor: defaults.primary,
      color: 'white',
    }}
  >
    {label}
  </Box>
);

export default TechChip;
