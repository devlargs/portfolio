'use client';

import { Box, chakra, Text } from '@chakra-ui/react';
import { FC } from 'react';
import defaults from 'theme/defaults';
import layout from 'theme/layout';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

const HeroSection: FC<{
  logoPlaceholder: string;
}> = ({ logoPlaceholder }) => (
  <Box
    position="relative"
    display="grid"
    placeContent="center"
    h={layout.left.height}
    p={layout.left.padding}
    overflow="hidden"
    sx={{
      '@keyframes hero-fade-in': {
        from: { opacity: 0, transform: 'translateY(12px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
    }}
    _before={{
      content: '""',
      position: 'absolute',
      top: '20%',
      left: { base: '50%', lg: '20%' },
      transform: 'translate(-50%, -50%)',
      w: { base: '320px', lg: '440px' },
      h: { base: '320px', lg: '440px' },
      bg: 'rgba(50,171,255,0.08)',
      borderRadius: '50%',
      filter: 'blur(90px)',
      pointerEvents: 'none',
    }}
  >
    <Box
      position="relative"
      sx={{
        animation: 'hero-fade-in 600ms ease both',
      }}
    >
      <Box mb="28px" display="flex" justifyContent={{ base: 'center', lg: 'flex-start' }}>
        <Avatar src="/images/linkedin/ralph.jpg" blurDataURL={logoPlaceholder} />
      </Box>

      <Box mb="14px" display="flex" justifyContent={{ base: 'center', lg: 'flex-start' }}>
        <StatusBadge label="Open to opportunities" />
      </Box>

      <Text
        fontSize={{ base: '26px', lg: '60px' }}
        lineHeight={{ base: '34px', lg: '68px' }}
        mb="4px"
        fontWeight="bold"
        as="h1"
        letterSpacing={{ base: '-0.5px', lg: '-1.5px' }}
        textAlign={{ base: 'center', lg: 'left' }}
      >
        Hi, I&apos;m{' '}
        <chakra.span
          color={defaults.primary}
          sx={{
            background: `linear-gradient(135deg, ${defaults.primary} 0%, #7ec7ff 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Ralph Largo
        </chakra.span>
      </Text>

      <Text
        fontSize={{ base: '20px', lg: '40px' }}
        lineHeight={{ base: '28px', lg: '48px' }}
        as="h2"
        fontWeight={600}
        color="#c4cfde"
        letterSpacing={{ base: '-0.3px', lg: '-1px' }}
        textAlign={{ base: 'center', lg: 'left' }}
        mb="20px"
      >
        Full Stack Web Developer
      </Text>

      <Box
        h="2px"
        w={{ base: '60px', lg: '80px' }}
        bg={defaults.primary}
        opacity={0.6}
        mb="20px"
        mx={{ base: 'auto', lg: '0' }}
      />

      <Text
        fontSize={{ base: '15px', lg: '17px' }}
        color="#878e99"
        lineHeight="1.7"
        maxW="540px"
        textAlign={{ base: 'center', lg: 'left' }}
      >
        Passionate developer experienced in building clean and intuitive web applications, dedicated to constantly
        expanding skills and collaborating effectively with creative teams.
      </Text>
    </Box>
  </Box>
);

export default HeroSection;
