import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import defaults from 'theme/defaults';

interface Props {
  src: string;
  blurDataURL: string;
  size?: number;
}

const Avatar: FC<Props> = ({ src, blurDataURL, size = 180 }) => {
  const ringSize = size + 12;

  return (
    <Box
      position="relative"
      w={`${ringSize}px`}
      h={`${ringSize}px`}
      sx={{
        '@keyframes hero-ring-spin': { to: { transform: 'rotate(360deg)' } },
      }}
    >
      <Box
        position="absolute"
        inset="0"
        borderRadius="50%"
        sx={{
          background: `conic-gradient(from 0deg, ${defaults.primary}, rgba(50,171,255,0) 55%, ${defaults.primary})`,
          animation: 'hero-ring-spin 6s linear infinite',
          filter: 'drop-shadow(0 0 14px rgba(50,171,255,0.35))',
        }}
      />
      <Box position="absolute" inset="4px" borderRadius="50%" bg="#212428" />
      <Box
        position="absolute"
        inset="8px"
        borderRadius="50%"
        overflow="hidden"
        boxShadow="0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)"
      >
        <Image
          src={src}
          width={400}
          height={400}
          alt="Ralph Largo"
          placeholder="blur"
          blurDataURL={blurDataURL}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
};

export default Avatar;
