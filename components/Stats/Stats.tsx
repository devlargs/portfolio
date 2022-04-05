import { Box, Flex, Text } from '@chakra-ui/react';
import STATS from '@constants/stats';
import { FC } from 'react';

const Stats: FC = () => {
  return (
    <Box mt="10rem">
      <Flex>
        {STATS.map((stat) => (
          <Box key={stat.name} mr="4rem">
            <Text fontWeight={600} fontSize="28px" lineHeight="36px" mb="18px">
              {stat.value}
            </Text>
            <Text color="rgba(255, 255, 255, 0.7)" lineHeight="19px" fontSize="16px" fontWeight={400}>
              {stat.name}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Stats;
