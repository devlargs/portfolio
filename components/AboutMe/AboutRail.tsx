import { FC } from 'react';
import styles from './AboutRail.module.css';
import StackList from './StackList';

const CORE_STACK = ['ReactJS', 'Next.js', 'NodeJS', 'TypeScript', 'MongoDB'] as const;
const WAYS_OF_WORKING = ['Daily stand-ups', 'Code reviews', 'Shared project management'] as const;

const AboutRail: FC = () => (
  <div className={styles.rail}>
    <StackList label="Core stack" items={CORE_STACK} />
    <StackList label="Ways of working" items={WAYS_OF_WORKING} />
  </div>
);

export default AboutRail;
