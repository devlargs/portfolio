import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  src: string;
  alt: string;
  blurDataURL?: string;
}

/**
 * Plate-style portrait: hairline frame, full colour, lifting slightly on hover.
 * Sized in absolute units so it never drives the text measure.
 */
const Portrait: FC<Props> = ({ src, alt, blurDataURL }) => (
  <Box
    position="relative"
    w={{ base: '84px', md: '104px' }}
    h={{ base: '84px', md: '104px' }}
    flexShrink={0}
    overflow="hidden"
    border="var(--rule-hair) solid var(--color-rule-strong)"
    bg="var(--color-paper-2)"
    sx={{
      '& img': { transition: 'transform var(--dur-3) var(--ease-out)' },
      '&:hover img': { transform: 'scale(1.03)' },
    }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes="104px"
      style={{ objectFit: 'cover', objectPosition: 'center top' }}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      priority
    />
  </Box>
);

export default Portrait;
