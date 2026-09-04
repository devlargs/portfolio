import { FC } from 'react';
import styles from './StackList.module.css';

interface Props {
  label: string;
  items: readonly string[];
}

const StackList: FC<Props> = ({ label, items }) => (
  <div>
    <h3 className={styles.label}>{label}</h3>

    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <span className={styles.marker} aria-hidden="true">
            &#9642;
          </span>
          <span className={styles.name}>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default StackList;
