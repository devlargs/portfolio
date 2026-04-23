import { Box, Text } from '@chakra-ui/react';
import { FC, useLayoutEffect, useMemo, useRef, useState } from 'react';
import DayCell from './DayCell';
import { Contribution } from './types';

const DAY_LABEL_COL = 28;
const GAP = 2;
const MIN_CELL = 7;
const MAX_CELL = 14;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface Props {
  contributions: Contribution[];
}

interface MonthLabel {
  label: string;
  weekIndex: number;
}

const Calendar: FC<Props> = ({ contributions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(10);

  const { weeks, monthLabels } = useMemo(() => {
    if (contributions.length === 0) return { weeks: [] as (Contribution | null)[][], monthLabels: [] as MonthLabel[] };

    const first = new Date(contributions[0].date + 'T00:00:00');
    const firstDow = first.getDay();
    const padded: (Contribution | null)[] = [...Array(firstDow).fill(null), ...contributions];
    while (padded.length % 7 !== 0) padded.push(null);

    const weeksArr: (Contribution | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weeksArr.push(padded.slice(i, i + 7));
    }

    const labels: MonthLabel[] = [];
    let lastMonth = -1;
    weeksArr.forEach((week, wIdx) => {
      const firstReal = week.find((d): d is Contribution => d !== null);
      if (!firstReal) return;
      const month = new Date(firstReal.date + 'T00:00:00').getMonth();
      if (month !== lastMonth) {
        labels.push({ label: MONTHS[month], weekIndex: wIdx });
        lastMonth = month;
      }
    });

    return { weeks: weeksArr, monthLabels: labels };
  }, [contributions]);

  const weekCount = weeks.length;

  useLayoutEffect(() => {
    const measure = (): void => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const available = width - DAY_LABEL_COL - GAP * (weekCount - 1);
      const raw = Math.floor(available / weekCount);
      setCellSize(Math.max(MIN_CELL, Math.min(MAX_CELL, raw)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return (): void => ro.disconnect();
  }, [weekCount]);

  const gridWidth = weekCount * cellSize + (weekCount - 1) * GAP;

  return (
    <Box ref={containerRef} w="100%" minW="0">
      <Box position="relative" h="14px" mb="6px" ml={`${DAY_LABEL_COL}px`} w={`${gridWidth}px`}>
        {monthLabels.map((m) => (
          <Text
            key={`${m.label}-${m.weekIndex}`}
            position="absolute"
            left={`${m.weekIndex * (cellSize + GAP)}px`}
            fontSize="10px"
            color="#6b727c"
            lineHeight="1"
            whiteSpace="nowrap"
          >
            {m.label}
          </Text>
        ))}
      </Box>

      <Box display="flex" gap={`${GAP}px`}>
        <Box
          display="grid"
          gridTemplateRows={`repeat(7, ${cellSize}px)`}
          rowGap={`${GAP}px`}
          w={`${DAY_LABEL_COL - GAP}px`}
          flexShrink={0}
          fontSize="10px"
          color="#6b727c"
          alignItems="center"
        >
          <Box />
          <Box>Mon</Box>
          <Box />
          <Box>Wed</Box>
          <Box />
          <Box>Fri</Box>
          <Box />
        </Box>

        <Box display="grid" gridTemplateColumns={`repeat(${weekCount}, ${cellSize}px)`} gap={`${GAP}px`}>
          {weeks.map((week, wIdx) => (
            <Box key={wIdx} display="grid" gridTemplateRows={`repeat(7, ${cellSize}px)`} rowGap={`${GAP}px`}>
              {week.map((day, dIdx) =>
                day ? <DayCell key={day.date} contribution={day} /> : <Box key={`empty-${wIdx}-${dIdx}`} />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
