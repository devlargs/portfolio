import { FC } from 'react';
import SectionLede from './SectionLede';
import SectionRule from './SectionRule';
import styles from './SectionHead.module.css';
import SectionTitle from './SectionTitle';

interface Props {
  id: string;
  title: string;
  /** Short standfirst. Sits under the rule at narrow measure, never beside it. */
  lede?: string;
}

/**
 * Rule above, heading below, standfirst below that. One column, always.
 * The tag-left / heading-right hanging header is deliberately not used here.
 *
 * A section whose margin column must start level with the heading composes
 * SectionRule / SectionTitle / SectionLede directly instead, so the heading and
 * the margin share one grid. See components/AboutMe.
 */
const SectionHead: FC<Props> = ({ id, title, lede }) => (
  <div className={styles.head}>
    <SectionRule />
    <SectionTitle id={id}>{title}</SectionTitle>
    {lede && <SectionLede>{lede}</SectionLede>}
  </div>
);

export default SectionHead;
