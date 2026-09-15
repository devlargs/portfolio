import { LearningTag } from '@constants/learnings';
import { FC } from 'react';
import styles from './TagFilter.module.css';

interface Props {
  tags: readonly LearningTag[];
  active: string | null;
  shown: number;
  total: number;
  onChange: (tag: string | null) => void;
}

const entries = (count: number): string => `${count} ${count === 1 ? 'entry' : 'entries'}`;

const TagFilter: FC<Props> = ({ tags, active, shown, total, onChange }) => (
  <div className={styles.bar}>
    <div role="group" aria-label="Filter by tag" className={styles.chips}>
      <button
        type="button"
        className={styles.chip}
        aria-pressed={active === null}
        aria-label={`All tags, ${entries(total)}`}
        onClick={(): void => onChange(null)}
      >
        all
        <span className={styles.count}>{total}</span>
      </button>

      {tags.map(({ tag, count }) => (
        <button
          key={tag}
          type="button"
          className={styles.chip}
          aria-pressed={active === tag}
          aria-label={`${tag}, ${entries(count)}`}
          onClick={(): void => onChange(active === tag ? null : tag)}
        >
          {tag}
          <span className={styles.count}>{count}</span>
        </button>
      ))}
    </div>

    <p className={styles.status} aria-live="polite">
      Showing {shown} of {total}
    </p>
  </div>
);

export default TagFilter;
