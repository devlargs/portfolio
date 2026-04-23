import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import defaults from 'theme/defaults';

interface Props {
  total: number;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}

const Nav: FC<Props> = ({ total, index, onPrev, onNext, onGoTo }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" gap="12px">
    <IconButton
      aria-label="Previous testimonial"
      icon={<ChevronLeftIcon boxSize="28px" />}
      onClick={onPrev}
      size="md"
      variant="ghost"
      color={defaults.primary}
      _hover={{ bg: 'rgba(50,171,255,0.08)' }}
    />

    <Box display="flex" gap="8px" alignItems="center">
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          as="button"
          aria-label={`Go to testimonial ${i + 1}`}
          onClick={(): void => onGoTo(i)}
          w={i === index ? '22px' : '8px'}
          h="8px"
          borderRadius="4px"
          bg={i === index ? defaults.primary : 'rgba(196,207,222,0.25)'}
          transition="all 300ms ease"
          cursor="pointer"
          border="none"
          p="0"
          _hover={{ bg: i === index ? defaults.primary : 'rgba(196,207,222,0.45)' }}
        />
      ))}
    </Box>

    <IconButton
      aria-label="Next testimonial"
      icon={<ChevronRightIcon boxSize="28px" />}
      onClick={onNext}
      size="md"
      variant="ghost"
      color={defaults.primary}
      _hover={{ bg: 'rgba(50,171,255,0.08)' }}
    />
  </Box>
);

export default Nav;
