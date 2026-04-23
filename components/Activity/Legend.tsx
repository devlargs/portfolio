import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { LEVEL_COLORS } from './DayCell';

const Legend: FC = () => (
  <Box display="flex" alignItems="center" gap="5px">
    <Text fontSize="10px" color="#6b727c">
      Less
    </Text>
    {([0, 1, 2, 3, 4] as const).map((lvl) => (
      <Box key={lvl} w="9px" h="9px" borderRadius="2px" bg={LEVEL_COLORS[lvl]} />
    ))}
    <Text fontSize="10px" color="#6b727c">
      More
    </Text>
  </Box>
);

export default Legend;
