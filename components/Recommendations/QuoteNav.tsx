import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  total: number;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}

const arrowSx = {
  display: 'grid',
  placeContent: 'center',
  width: '36px',
  height: '36px',
  flexShrink: 0,
  border: 'var(--rule-hair) solid var(--color-rule)',
  borderRadius: 'var(--radius-pill)',
  color: 'var(--color-ink-2)',
  background: 'transparent',
  cursor: 'pointer',
  fontFamily: 'var(--font-meta)',
  fontSize: 'var(--text-sm)',
  lineHeight: 1,
  transition: 'color var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out)',
} as const;

const QuoteNav: FC<Props> = ({ total, index, onPrev, onNext, onGoTo }) => (
  <Box display="flex" alignItems="center" gap="var(--space-md)" flexWrap="wrap">
    <Box display="flex" alignItems="center" gap="var(--space-2xs)">
      <Box
        as="button"
        type="button"
        onClick={onPrev}
        aria-label="Previous recommendation"
        sx={arrowSx}
        _hover={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
        _active={{ background: 'var(--color-paper-3)' }}
      >
        <Box as="span" aria-hidden="true">
          &#8592;
        </Box>
      </Box>
      <Box
        as="button"
        type="button"
        onClick={onNext}
        aria-label="Next recommendation"
        sx={arrowSx}
        _hover={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
        _active={{ background: 'var(--color-paper-3)' }}
      >
        <Box as="span" aria-hidden="true">
          &#8594;
        </Box>
      </Box>
    </Box>

    <Text
      as="span"
      fontFamily="var(--font-meta)"
      fontSize="var(--text-2xs)"
      letterSpacing="0.08em"
      color="var(--color-ink-3)"
      whiteSpace="nowrap"
      aria-live="polite"
    >
      {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </Text>

    <Box display="flex" alignItems="center" gap="4px" flexWrap="wrap" minW="0">
      {Array.from({ length: total }, (_, i) => (
        <Box
          as="button"
          key={i}
          type="button"
          onClick={(): void => onGoTo(i)}
          aria-label={`Go to recommendation ${i + 1}`}
          aria-current={i === index ? 'true' : undefined}
          display="block"
          w="18px"
          h="14px"
          p="0"
          border="none"
          background="transparent"
          cursor="pointer"
          sx={{
            '& span': {
              display: 'block',
              height: 'var(--rule-thick)',
              background: i === index ? 'var(--color-accent)' : 'var(--color-rule-strong)',
              transformOrigin: 'center',
              transform: i === index ? 'scaleY(1)' : 'scaleY(0.5)',
              transition: 'transform var(--dur-2) var(--ease-out), background var(--dur-2) var(--ease-out)',
            },
            '&:hover span': { background: 'var(--color-accent)', transform: 'scaleY(1)' },
          }}
        >
          <Box as="span" aria-hidden="true" />
        </Box>
      ))}
    </Box>
  </Box>
);

export default QuoteNav;
