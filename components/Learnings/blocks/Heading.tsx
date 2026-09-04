import { FC } from 'react';
import RichText from '../RichText';
import styles from './Heading.module.css';

interface Props {
  content: string;
  id: string;
}

const Heading: FC<Props> = ({ content, id }) => (
  <div className={styles.block}>
    <div className={styles.rule} />
    <h2 id={id} className={styles.heading}>
      <RichText content={content} />
    </h2>
  </div>
);

export default Heading;
