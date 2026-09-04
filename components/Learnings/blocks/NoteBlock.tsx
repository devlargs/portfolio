import cx from '@utils/cx';
import { FC } from 'react';
import RichText from '../RichText';
import styles from './NoteBlock.module.css';

interface Props {
  content: string;
  tone?: 'info' | 'warn';
}

/** An aside, marked by a rule in the margin rather than a tinted card. */
const NoteBlock: FC<Props> = ({ content, tone = 'info' }) => (
  <aside className={cx(styles.note, tone === 'warn' && styles.warn)}>
    <p className={styles.text}>
      <RichText content={content} />
    </p>
  </aside>
);

export default NoteBlock;
