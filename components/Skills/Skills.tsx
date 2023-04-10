import { Box, Grid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

const Skills: FC<{
  skills: string[];
  title: string;
}> = ({ skills, title }) => {
  return (
    <>
      <Text mb="16px" fontSize="14px" fontWeight={300} color="#c4cfde" letterSpacing="3px" textTransform="uppercase">
        {title}
      </Text>

      <Grid
        gridTemplateColumns={{
          base: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gridGap="16px"
      >
        {skills.map((item) => {
          return (
            <Box
              key={item}
              boxShadow="10px 10px 19px #1c1e22, -10px -10px 19px #262a2e"
              w="65px"
              h="65px"
              borderRadius="10px"
              display="grid"
              placeContent="center"
            >
              <Box w="40px" h="40px" display="grid" placeContent="center">
                <Image
                  src={`/images/${item.replace(/ /gi, '-').toLowerCase()}.png`}
                  alt="React"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  width={348}
                  height={348}
                />
              </Box>
            </Box>
          );
        })}
      </Grid>
    </>
  );
};

export default Skills;
