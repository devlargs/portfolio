import Reveal from '@components/Reveal';
import { Learning } from '@constants/learnings';
import { FC } from 'react';
import styles from './LearningsIndex.module.css';
import LearningsIndexRow from './LearningsIndexRow';

interface Props {
  learnings: readonly Learning[];
}

const LearningsIndex: FC<Props> = ({ learnings }) => {
  if (learnings.length === 0) {
    return <p className={styles.empty}>Nothing written up yet. The first entry is on its way.</p>;
  }

  return (
    <Reveal distance={12}>
      <ul className={styles.list}>
        {learnings.map((learning, i) => (
          <LearningsIndexRow
            key={learning.slug}
            learning={learning}
            index={String(learnings.length - i).padStart(2, '0')}
          />
        ))}
      </ul>
    </Reveal>
  );
};

export default LearningsIndex;
