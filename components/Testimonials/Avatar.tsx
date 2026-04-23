import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import defaults from 'theme/defaults';

interface Props {
  src: string;
  alt: string;
  blurDataURL?: string;
  size?: number;
}

const Avatar: FC<Props> = ({ src, alt, blurDataURL, size = 96 }) => {
  const ringSize = size + 8;

  return (
    <Box
      position="relative"
      w={`${ringSize}px`}
      h={`${ringSize}px`}
      flexShrink={0}
      sx={{
        '@keyframes testimonial-ring-spin': {
          to: { transform: 'rotate(360deg)' },
        },
      }}
    >
      <Box
        position="absolute"
        inset="0"
        borderRadius="50%"
        sx={{
          background: `conic-gradient(from 0deg, ${defaults.primary}, rgba(50,171,255,0) 55%, ${defaults.primary})`,
          animation: 'testimonial-ring-spin 5s linear infinite',
          filter: `drop-shadow(0 0 8px rgba(50,171,255,0.35))`,
        }}
      />
      <Box position="absolute" inset="3px" borderRadius="50%" bg="#212428" />
      <Box
        position="absolute"
        inset="6px"
        borderRadius="50%"
        overflow="hidden"
        boxShadow="0 6px 20px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)"
      >
        <Image
          src={src}
          width={200}
          height={200}
          alt={alt}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      </Box>
    </Box>
  );
};

export default Avatar;
