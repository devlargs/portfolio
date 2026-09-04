import Reveal from '@components/Reveal';
import { FC } from 'react';
import styles from './SectionLede.module.css';

interface Props {
  children: string;
  delay?: number;
}

const SectionLede: FC<Props> = ({ children, delay = 80 }) => (
  <Reveal delay={delay} distance={12}>
    <p className={styles.lede}>{children}</p>
  </Reveal>
);

export default SectionLede;
