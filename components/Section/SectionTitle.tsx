import Reveal from '@components/Reveal';
import { FC } from 'react';
import styles from './SectionTitle.module.css';

interface Props {
  id: string;
  children: string;
  delay?: number;
}

const SectionTitle: FC<Props> = ({ id, children, delay = 0 }) => (
  <Reveal delay={delay} distance={12}>
    <h2 id={`${id}-head`} className={styles.title}>
      {children}
    </h2>
  </Reveal>
);

export default SectionTitle;
