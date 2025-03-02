import { Box, Grid, Text, Tooltip } from '@chakra-ui/react';
import { toKebabCase } from 'largs-utils';
import Image from 'next/image';
import { FC } from 'react';

const Skills: FC<{
  skills: string[];
  title: string;
  imagePlaceholders: Record<string, string>;
}> = ({ skills, title, imagePlaceholders }) => {
  return (
    <>
      <Text mb="16px" fontSize="14px" fontWeight={300} color="#c4cfde" letterSpacing="3px" textTransform="uppercase">
        {title}
      </Text>

      <Grid
        gridTemplateColumns={{
          base: 'repeat(4, 1fr)',
          md: 'repeat(6, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gridGap="16px"
      >
        {skills.map((item) => {
          return (
            <Tooltip key={item} label={item}>
              <Box
                boxShadow="10px 10px 19px #1c1e22, -10px -10px 19px #262a2e"
                w="65px"
                h="65px"
                borderRadius="10px"
                display="grid"
                placeContent="center"
              >
                <Box w="40px" h="40px" display="grid" placeContent="center">
                  <Image
                    src={`/images/${toKebabCase(item)}.png`}
                    alt={item}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    width={348}
                    height={348}
                    placeholder="blur"
                    blurDataURL={imagePlaceholders[`${toKebabCase(item)}`]}
                  />
                </Box>
              </Box>
            </Tooltip>
          );
        })}
      </Grid>
    </>
  );
};

export default Skills;
