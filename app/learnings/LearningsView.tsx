import LearningsIndex from '@components/Learnings';
import PageHead from '@components/PageHead';
import PageShell from '@components/PageShell';
import { Learning } from '@constants/learnings';
import cx from '@utils/cx';
import { FC } from 'react';
import styles from './LearningsView.module.css';

interface Props {
  learnings: readonly Learning[];
  year: number;
}

const LearningsView: FC<Props> = ({ learnings, year }) => (
  <PageShell year={year}>
    <PageHead
      eyebrow="Learnings"
      title="Things I learned"
      lede="I keep this for myself, so the things that cost me an afternoon only ever cost one. Mostly configuration that is obvious in hindsight and documented nowhere in one piece. If you have wandered in and find something useful here, all the better."
      meta={`${learnings.length} ${learnings.length === 1 ? 'entry' : 'entries'}`}
    />

    <div className={cx('page-wrap', styles.body)}>
      <LearningsIndex learnings={learnings} />
    </div>
  </PageShell>
);

export default LearningsView;
