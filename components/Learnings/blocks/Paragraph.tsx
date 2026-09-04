import { FC } from 'react';
import RichText from '../RichText';
import styles from './Paragraph.module.css';

interface Props {
  content: string;
}

const Paragraph: FC<Props> = ({ content }) => (
  <p className={styles.paragraph}>
    <RichText content={content} />
  </p>
);

export default Paragraph;
