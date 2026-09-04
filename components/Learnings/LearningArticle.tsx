import MoreLink from '@components/MoreLink';
import PageHead from '@components/PageHead';
import { Learning, readingMinutes } from '@constants/learnings';
import cx from '@utils/cx';
import { FC } from 'react';
import LearningBody from './LearningBody';
import styles from './LearningArticle.module.css';
import TagList from './TagList';

interface Props {
  learning: Learning;
}

const LearningArticle: FC<Props> = ({ learning }) => (
  <article>
    <PageHead
      backHref="/learnings"
      backLabel="Learnings"
      meta={`${readingMinutes(learning)} min read`}
      title={learning.title}
      lede={learning.summary}
    />

    <div className={cx('page-wrap', styles.body)}>
      <div className={styles.tags}>
        <TagList tags={learning.tags} />
      </div>

      <LearningBody body={learning.body} />

      <div className={styles.more}>
        <MoreLink href="/learnings" label="More things I learned" />
      </div>
    </div>
  </article>
);

export default LearningArticle;
