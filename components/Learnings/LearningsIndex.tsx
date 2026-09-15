'use client';

import Reveal from '@components/Reveal';
import { Learning, LearningTag, learningTags } from '@constants/learnings';
import { FC, useMemo, useState } from 'react';
import styles from './LearningsIndex.module.css';
import LearningsIndexRow from './LearningsIndexRow';
import TagFilter from './TagFilter';

interface Props {
  learnings: readonly Learning[];
}

const LearningsIndex: FC<Props> = ({ learnings }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const tags = useMemo((): LearningTag[] => learningTags(learnings), [learnings]);

  if (learnings.length === 0) {
    return <p className={styles.empty}>Nothing written up yet. The first entry is on its way.</p>;
  }

  const numbered = learnings.map((learning, i) => ({
    learning,
    index: String(learnings.length - i).padStart(2, '0'),
  }));
  const visible = activeTag ? numbered.filter(({ learning }) => learning.tags.includes(activeTag)) : numbered;

  return (
    <>
      <TagFilter
        tags={tags}
        active={activeTag}
        shown={visible.length}
        total={learnings.length}
        onChange={setActiveTag}
      />

      <Reveal distance={12}>
        <ul className={styles.list}>
          {visible.map(({ learning, index }) => (
            <LearningsIndexRow key={learning.slug} learning={learning} index={index} />
          ))}
        </ul>
      </Reveal>
    </>
  );
};

export default LearningsIndex;
