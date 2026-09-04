import { Box, Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { Learning } from '@constants/learnings';
import { FC } from 'react';
import LearningsIndexRow from './LearningsIndexRow';

interface Props {
  learnings: readonly Learning[];
}

const LearningsIndex: FC<Props> = ({ learnings }) => {
  if (learnings.length === 0) {
    return (
      <Text fontSize="var(--text-lg)" color="var(--color-ink-2)" maxW="var(--measure)">
        Nothing written up yet. The first entry is on its way.
      </Text>
    );
  }

  return (
    <Reveal distance={12}>
      <Box as="ul" listStyleType="none" m="0" p="0" borderTop="var(--rule-hair) solid var(--color-ink)">
        {learnings.map((learning, i) => (
          <LearningsIndexRow
            key={learning.slug}
            learning={learning}
            index={String(learnings.length - i).padStart(2, '0')}
          />
        ))}
      </Box>
    </Reveal>
  );
};

export default LearningsIndex;
