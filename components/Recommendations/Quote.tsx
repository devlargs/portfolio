import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

export interface Testimonial {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  avatar: string;
  url: string;
}

interface Props {
  testimonial: Testimonial;
  blurDataURL?: string;
}

const Quote: FC<Props> = ({ testimonial, blurDataURL }) => (
  <Box as="figure" m="0">
    <Box
      as="blockquote"
      m="0"
      position="relative"
      pl={{ base: '0', md: 'var(--space-xl)' }}
      sx={{
        '&::before': {
          content: '"\\201C"',
          display: { base: 'none', md: 'block' },
          position: 'absolute',
          left: 0,
          top: '-0.18em',
          fontFamily: 'var(--font-display)',
          fontSize: '3.2em',
          lineHeight: 1,
          color: 'var(--color-accent)',
          opacity: 0.5,
          pointerEvents: 'none',
        },
      }}
    >
      <Text
        fontFamily="var(--font-display)"
        fontSize={{ base: 'var(--text-xl)', md: 'var(--text-3xl)' }}
        lineHeight={1.32}
        letterSpacing="-0.012em"
        color="var(--color-ink)"
        maxW="34ch"
        m="0"
      >
        {testimonial.testimonial}
      </Text>
    </Box>

    <Box
      as="figcaption"
      mt={{ base: 'var(--space-md)', md: 'var(--space-lg)' }}
      ml={{ base: '0', md: 'var(--space-xl)' }}
      display="flex"
      alignItems="center"
      gap="var(--space-xs)"
    >
      <Box
        position="relative"
        w="40px"
        h="40px"
        flexShrink={0}
        overflow="hidden"
        border="var(--rule-hair) solid var(--color-rule-strong)"
        bg="var(--color-paper-2)"
      >
        <Image
          src={testimonial.avatar}
          alt=""
          fill
          sizes="40px"
          style={{ objectFit: 'cover' }}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
        />
      </Box>

      <Box minW="0">
        <Box
          as="a"
          href={`https://linkedin.com/in/${testimonial.url}`}
          target="_blank"
          rel="noreferrer noopener"
          onPointerDown={(e): void => e.stopPropagation()}
          display="inline-block"
          fontSize="var(--text-sm)"
          fontWeight={600}
          color="var(--color-ink)"
          transition="color var(--dur-1) var(--ease-out)"
          _hover={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
        >
          {testimonial.name}
        </Box>
        <Text
          fontFamily="var(--font-meta)"
          fontSize="var(--text-2xs)"
          letterSpacing="0.04em"
          color="var(--color-ink-3)"
          m="0"
        >
          {testimonial.position}, {testimonial.company}
        </Text>
      </Box>
    </Box>
  </Box>
);

export default Quote;
