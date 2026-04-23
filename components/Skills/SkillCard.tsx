import { Box, Tooltip } from '@chakra-ui/react';
import { toKebabCase } from 'largs-utils';
import Image from 'next/image';
import { FC } from 'react';
import defaults from 'theme/defaults';

interface Props {
  name: string;
  blurDataURL?: string;
}

const SkillCard: FC<Props> = ({ name, blurDataURL }) => (
  <Tooltip
    label={name}
    placement="top"
    hasArrow
    bg="#2b2d31"
    color={defaults.primary}
    fontSize="12px"
    fontWeight={600}
    px="10px"
    py="6px"
    borderRadius="6px"
    openDelay={150}
  >
    <Box
      boxShadow="10px 10px 19px #1c1e22, -10px -10px 19px #262a2e"
      w="65px"
      h="65px"
      borderRadius="10px"
      display="grid"
      placeContent="center"
      border="1px solid transparent"
      transition="transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease"
      cursor="default"
      _hover={{
        transform: 'translateY(-3px)',
        borderColor: 'rgba(50,171,255,0.45)',
        boxShadow: '10px 10px 19px #1c1e22, -10px -10px 19px #262a2e, 0 0 18px rgba(50,171,255,0.25)',
      }}
    >
      <Box w="40px" h="40px" display="grid" placeContent="center">
        <Image
          src={`/images/${toKebabCase(name)}.png`}
          alt={name}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          width={348}
          height={348}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
        />
      </Box>
    </Box>
  </Tooltip>
);

export default SkillCard;
