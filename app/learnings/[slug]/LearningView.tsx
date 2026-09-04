import PageShell from '@components/PageShell';
import { LearningArticle } from '@components/Learnings';
import { Learning } from '@constants/learnings';
import { FC } from 'react';

interface Props {
  learning: Learning;
  year: number;
}

const LearningView: FC<Props> = ({ learning, year }) => (
  <PageShell year={year} readingProgress>
    <LearningArticle learning={learning} />
  </PageShell>
);

export default LearningView;
