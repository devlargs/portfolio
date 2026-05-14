'use client';

import { Box, chakra, Text } from '@chakra-ui/react';
import openNewTab from '@utils/openNewTab';
import { FC } from 'react';
import defaults from 'theme/defaults';
import Avatar from './Avatar';

interface Testimonial {
  name: string;
  position: string;
  company: string;
  avatar: string;
  url: string;
  testimonial: string;
}

interface Props {
  testimonial: Testimonial;
  blurDataURL?: string;
}

const Slide: FC<Props> = ({ testimonial, blurDataURL }) => (
  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" px={{ base: '8px', md: '16px' }}>
    <Avatar src={testimonial.avatar} alt={testimonial.name} blurDataURL={blurDataURL} />

    <Text mt="20px" fontSize="15px" lineHeight="1.3">
      <chakra.span
        fontWeight="bold"
        color={defaults.primary}
        cursor="pointer"
        position="relative"
        zIndex={2}
        onPointerDown={(e): void => e.stopPropagation()}
        onClick={(e): void => {
          e.stopPropagation();
          openNewTab(`https://linkedin.com/in/${testimonial.url}`);
        }}
        _hover={{ textDecoration: 'underline' }}
      >
        {testimonial.name}
      </chakra.span>
    </Text>
    <Box
      mt="8px"
      display="inline-flex"
      alignItems="center"
      gap="8px"
      px="10px"
      py="4px"
      borderRadius="999px"
      bg="rgba(255,255,255,0.04)"
      border="1px solid"
      borderColor="rgba(255,255,255,0.08)"
    >
      <Box w="6px" h="6px" borderRadius="999px" bg={defaults.primary} boxShadow={`0 0 8px ${defaults.primary}`} />
      <Text fontSize="11px" color="#c4cfde" letterSpacing="0.3px" fontStyle="italic">
        {testimonial.position}
      </Text>
      <Text fontSize="11px" color="#878e99">
        Â·
      </Text>
      <Text fontSize="11px" color="#878e99" letterSpacing="0.5px" textTransform="uppercase">
        {testimonial.company}
      </Text>
    </Box>

    <Box
      mt="20px"
      position="relative"
      maxW="680px"
      _before={{
        content: '"\\201C"',
        display: { base: 'none', md: 'block' },
        position: 'absolute',
        top: '-18px',
        left: '-12px',
        fontSize: '56px',
        lineHeight: '1',
        color: defaults.primary,
        opacity: 0.25,
        fontFamily: 'Georgia, serif',
        pointerEvents: 'none',
      }}
    >
      <Text
        fontSize="16px"
        lineHeight={{ base: '24px', lg: '28px' }}
        color="#c4cfde"
        textAlign={{ base: 'left', md: 'center' }}
      >
        {testimonial.testimonial}
      </Text>
    </Box>
  </Box>
);

export default Slide;
