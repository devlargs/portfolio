import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

const StatusBadge: FC<{ label: string }> = ({ label }) => (
  <Box
    display="inline-flex"
    alignItems="center"
    gap="8px"
    px="12px"
    py="5px"
    bg="rgba(72,187,120,0.08)"
    border="1px solid rgba(72,187,120,0.35)"
    borderRadius="999px"
    sx={{
      '@keyframes hero-status-pulse': {
        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
        '50%': { opacity: 0.5, transform: 'scale(1.15)' },
      },
    }}
  >
    <Box
      w="7px"
      h="7px"
      borderRadius="50%"
      bg="#48bb78"
      boxShadow="0 0 8px rgba(72,187,120,0.8)"
      sx={{ animation: 'hero-status-pulse 2s ease-in-out infinite' }}
    />
    <Text fontSize="11px" fontWeight={600} color="#48bb78" letterSpacing="0.5px" textTransform="uppercase">
      {label}
    </Text>
  </Box>
);

export default StatusBadge;
