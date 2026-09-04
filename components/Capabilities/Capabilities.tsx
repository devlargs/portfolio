import { PRIMARY_SKILLS, SECONDARY_SKILLS } from '@constants/skills';
import { FC } from 'react';
import styles from './Capabilities.module.css';
import CapabilityGroup from './CapabilityGroup';

interface Props {
  imagePlaceholders: Record<string, string>;
}

const Capabilities: FC<Props> = ({ imagePlaceholders }) => (
  <div className={styles.groups}>
    <CapabilityGroup title="Primary" skills={PRIMARY_SKILLS} imagePlaceholders={imagePlaceholders} />
    <CapabilityGroup title="Secondary" skills={SECONDARY_SKILLS} imagePlaceholders={imagePlaceholders} />
  </div>
);

export default Capabilities;
