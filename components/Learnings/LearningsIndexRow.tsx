import { Learning, readingMinutes } from '@constants/learnings';
import formatDate from '@utils/formatDate';
import NextLink from 'next/link';
import { FC } from 'react';
import styles from './LearningsIndexRow.module.css';
import TagList from './TagList';

interface Props {
  learning: Learning;
  index: string;
}

const LearningsIndexRow: FC<Props> = ({ learning, index }) => (
  <li className={styles.row}>
    <NextLink href={`/learnings/${learning.slug}`} className={styles.link}>
      <span className={styles.edge} aria-hidden="true" />

      <div className={styles.grid}>
        <span className={styles.index}>{index}</span>

        <div className={styles.main}>
          <div className={styles.meta}>
            <time dateTime={learning.published}>{formatDate(learning.published)}</time>
            <span aria-hidden="true"> · </span>
            {readingMinutes(learning)} min read
          </div>

          <h2 className={styles.title}>{learning.title}</h2>

          <p className={styles.summary}>{learning.summary}</p>

          <div className={styles.tags}>
            <TagList tags={learning.tags} />
          </div>
        </div>

        <span className={styles.arrow} aria-hidden="true">
          &#8594;
        </span>
      </div>
    </NextLink>
  </li>
);

export default LearningsIndexRow;
