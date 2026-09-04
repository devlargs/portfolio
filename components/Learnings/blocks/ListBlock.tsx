import { FC } from 'react';
import RichText from '../RichText';
import styles from './ListBlock.module.css';

interface Props {
  items: readonly string[];
  ordered?: boolean;
}

/** Markers are drawn in the gutter so the copy keeps a flush left edge. */
const ListBlock: FC<Props> = ({ items, ordered = false }) => {
  const List = ordered ? 'ol' : 'ul';

  return (
    <List className={styles.list}>
      {items.map((item, i) => (
        <li key={item} className={styles.item}>
          <span className={styles.marker} aria-hidden="true">
            {ordered ? String(i + 1).padStart(2, '0') : '/'}
          </span>
          <span>
            <RichText content={item} />
          </span>
        </li>
      ))}
    </List>
  );
};

export default ListBlock;
