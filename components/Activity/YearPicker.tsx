import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import defaults from 'theme/defaults';

interface Props {
  years: number[];
  selected: number;
  onSelect: (year: number) => void;
}

const YearPicker: FC<Props> = ({ years, selected, onSelect }) => (
  <Box display="flex" flexDirection="row" flexWrap="wrap" gap="4px">
    {years.map((year) => {
      const isActive = year === selected;
      return (
        <Box
          key={year}
          as="button"
          type="button"
          onClick={(): void => onSelect(year)}
          px="10px"
          h="26px"
          fontSize="11px"
          fontWeight={600}
          borderRadius="6px"
          border="1px solid"
          borderColor={isActive ? defaults.primary : 'transparent'}
          bg={isActive ? 'rgba(50,171,255,0.12)' : 'transparent'}
          color={isActive ? defaults.primary : '#6b727c'}
          cursor="pointer"
          transition="all 160ms ease"
          _hover={{
            color: isActive ? defaults.primary : '#c4cfde',
            bg: isActive ? 'rgba(50,171,255,0.12)' : 'rgba(255,255,255,0.04)',
          }}
        >
          {year}
        </Box>
      );
    })}
  </Box>
);

export default YearPicker;
