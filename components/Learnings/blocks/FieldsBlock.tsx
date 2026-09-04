import { FC } from 'react';
import styles from './FieldsBlock.module.css';

interface Props {
  items: readonly { label: string; value: string }[];
}

/**
 * Settings, set as a definition list. Values are monospaced because every one
 * of them is a string the reader is going to retype into a form.
 */
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
