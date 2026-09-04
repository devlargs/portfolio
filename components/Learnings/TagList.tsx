import { FC } from 'react';
import styles from './TagList.module.css';

interface Props {
  tags: readonly string[];
}

const TagList: FC<Props> = ({ tags }) => (
  <ul className={styles.list}>
    {tags.map((tag) => (
      <li key={tag} className={styles.tag}>
        {tag}
      </li>
    ))}
  </ul>
);

export default TagList;
