import { Box, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import defaults from 'theme/defaults';
import Calendar from './Calendar';
import Legend from './Legend';
import { ActivityData } from './types';
import YearPicker from './YearPicker';

interface Props {
  data: {
    years: number[];
    byYear: Record<number, ActivityData>;
  } | null;
}

const Activity: FC<Props> = ({ data }) => {
  const initialYear = data?.years[0] ?? 0;
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  if (!data || data.years.length === 0) return null;
  const yearKey = selectedYear in data.byYear ? selectedYear : data.years[0];
  const activeData = data.byYear[yearKey];
  if (activeData.contributions.length === 0) return null;

  return (
    <Box pt="8px" w="100%" minW="0">
      <Text fontSize="14px" color="#c4cfde" mb="18px">
        <Text as="span" fontWeight={700} color={defaults.primary}>
          {activeData.total.toLocaleString()}
        </Text>{' '}
        contributions in {yearKey}
      </Text>

      <Calendar contributions={activeData.contributions} />

      <Box mt="18px" display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap="12px">
        <YearPicker years={data.years} selected={yearKey} onSelect={setSelectedYear} />
        <Legend />
      </Box>
    </Box>
  );
};

export default Activity;
