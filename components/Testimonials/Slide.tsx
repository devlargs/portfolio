import { Box, chakra, Text } from '@chakra-ui/react';
import openNewTab from '@utils/openNewTab';
import { FC } from 'react';
import defaults from 'theme/defaults';
import Avatar from './Avatar';

interface Testimonial {
  name: string;
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
        onClick={(): void => openNewTab(`https://linkedin.com/in/${testimonial.url}`)}
        _hover={{ textDecoration: 'underline' }}
      >
        {testimonial.name}
      </chakra.span>
    </Text>
    <Text fontSize="11px" color="#878e99" mt="4px" letterSpacing="0.5px" textTransform="uppercase">
      {testimonial.company}
    </Text>

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
