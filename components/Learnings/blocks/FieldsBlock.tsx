import { FC } from 'react';
import styles from './FieldsBlock.module.css';

interface Props {
  items: readonly { label: string; value: string }[];
}

const FieldsBlock: FC<Props> = ({ items }) => (
  <dl className={styles.list}>
    {items.map((item) => (
      <div key={item.label} className={styles.row}>
        <dt className={styles.label}>{item.label}</dt>
        <dd className={styles.value}>{item.value}</dd>
      </div>
    ))}
  </dl>
);

export default FieldsBlock;
