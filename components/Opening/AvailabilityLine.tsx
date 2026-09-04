import cx from '@utils/cx';
import { FC } from 'react';
import styles from './AvailabilityLine.module.css';

interface Props {
  label: string;
  live?: boolean;
}

const AvailabilityLine: FC<Props> = ({ label, live = true }) => (
  <div className={styles.line}>
    <span className={cx(styles.dot, live && styles.live)} aria-hidden="true" />
    <span className={styles.label}>{label}</span>
  </div>
);

export default AvailabilityLine;
