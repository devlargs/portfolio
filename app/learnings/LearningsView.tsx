import { Box } from '@chakra-ui/react';
import LearningsIndex from '@components/Learnings';
import PageHead from '@components/PageHead';
import PageShell from '@components/PageShell';
import { Learning } from '@constants/learnings';
import { FC } from 'react';

interface Props {
  learnings: readonly Learning[];
  year: number;
}

const LearningsView: FC<Props> = ({ learnings, year }) => (
  <PageShell year={year}>
    <PageHead
      eyebrow="Learnings"
      title="Things I learned"
      lede="Short write-ups of things that cost me an afternoon, kept so they only ever cost one. Mostly configuration that is obvious in hindsight and documented nowhere in one piece."
      meta={`${learnings.length} ${learnings.length === 1 ? 'entry' : 'entries'}`}
    />

    <Box
      maxW="var(--page-max)"
      mx="auto"
      px="var(--page-gutter)"
      pb={{ base: 'var(--space-2xl)', md: 'var(--space-3xl)' }}
    >
      <LearningsIndex learnings={learnings} />
    </Box>
  </PageShell>
);

export default LearningsView;
