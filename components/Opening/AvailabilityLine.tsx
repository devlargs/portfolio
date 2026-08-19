import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  label: string;
  live?: boolean;
}

const AvailabilityLine: FC<Props> = ({ label, live = true }) => (
  <Box display="inline-flex" alignItems="center" gap="var(--space-2xs)">
    <Box
      as="span"
      w="7px"
      h="7px"
      flexShrink={0}
      borderRadius="var(--radius-pill)"
      bg={live ? 'var(--color-live)' : 'var(--color-ink-3)'}
      aria-hidden="true"
      sx={
        live
          ? {
              '@keyframes availability-pulse': {
                '0%, 70%, 100%': { opacity: 1, transform: 'scale(1)' },
                '35%': { opacity: 0.45, transform: 'scale(0.82)' },
              },
              animation: 'availability-pulse 3.2s var(--ease-in-out) infinite',
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }
          : undefined
      }
    />
    <Text
      as="span"
      fontFamily="var(--font-meta)"
      fontSize="var(--text-xs)"
      letterSpacing="0.06em"
      color="var(--color-ink-2)"
      whiteSpace="nowrap"
    >
      {label}
    </Text>
  </Box>
);

export default AvailabilityLine;
