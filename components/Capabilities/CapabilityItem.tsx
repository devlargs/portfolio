import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  name: string;
  slug: string;
  blurDataURL?: string;
  /** Primary skills get the larger mark and full-strength ink. */
  emphasis?: boolean;
}

/**
 * A named capability, not a logo tile. The mark carries its own brand colour and
 * the name picks up the accent when the reader points at the row.
 */
const CapabilityItem: FC<Props> = ({ name, slug, blurDataURL, emphasis = false }) => {
  const markSize = emphasis ? 20 : 16;

  return (
    <Box
      as="li"
      display="flex"
      alignItems="center"
      gap="var(--space-2xs)"
      minW="0"
      py="var(--space-2xs)"
      borderBottom="var(--rule-hair) solid var(--color-rule)"
      sx={{
        '& .cap-mark': { transition: 'transform var(--dur-2) var(--ease-out)' },
        '&:hover .cap-mark': { transform: 'scale(1.12)' },
        '&:hover .cap-name': { color: 'var(--color-accent)' },
      }}
    >
      <Box
        className="cap-mark"
        position="relative"
        w={`${markSize}px`}
        h={`${markSize}px`}
        flexShrink={0}
        aria-hidden="true"
      >
        <Image
          src={`/images/${slug}.png`}
          alt=""
          fill
          sizes="20px"
          style={{ objectFit: 'contain' }}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
        />
      </Box>

      <Text
        as="span"
        className="cap-name"
        minW="0"
        overflowWrap="anywhere"
        fontSize={emphasis ? 'var(--text-sm)' : 'var(--text-xs)'}
        fontWeight={emphasis ? 500 : 400}
        lineHeight={1.35}
        color={emphasis ? 'var(--color-ink)' : 'var(--color-ink-2)'}
        transition="color var(--dur-2) var(--ease-out)"
      >
        {name}
      </Text>
    </Box>
  );
};

export default CapabilityItem;
