import { FC } from 'react';
import SectionLede from './SectionLede';
import SectionRule from './SectionRule';
import styles from './SectionHead.module.css';
import SectionTitle from './SectionTitle';

interface Props {
  id: string;
  title: string;
  lede?: string;
}

const SectionHead: FC<Props> = ({ id, title, lede }) => (
  <div className={styles.head}>
    <SectionRule />
    <SectionTitle id={id}>{title}</SectionTitle>
    {lede && <SectionLede>{lede}</SectionLede>}
  </div>
);

export default SectionHead;
