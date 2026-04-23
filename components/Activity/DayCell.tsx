import { Box, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';
import defaults from 'theme/defaults';
import { Contribution } from './types';

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: '#161b22',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
};

const formatDate = (iso: string): string => {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

interface Props {
  contribution: Contribution;
}

const DayCell: FC<Props> = ({ contribution }) => {
  const { count, level, date } = contribution;
  const label = `${count} contribution${count === 1 ? '' : 's'} on ${formatDate(date)}`;

  return (
    <Tooltip
      label={label}
      placement="top"
      hasArrow
      bg="#2b2d31"
      color={defaults.primary}
      fontSize="11px"
      fontWeight={600}
      px="8px"
      py="5px"
      borderRadius="6px"
      openDelay={100}
    >
      <Box
        w="100%"
        h="100%"
        bg={LEVEL_COLORS[level]}
        borderRadius="2px"
        border="1px solid rgba(255,255,255,0.03)"
        transition="transform 150ms ease"
        _hover={{ transform: 'scale(1.25)' }}
      />
    </Tooltip>
  );
};

export { LEVEL_COLORS };
export default DayCell;
