import cx from '@utils/cx';
import { FC } from 'react';
import styles from './Spinner.module.css';

interface Props {
  inline?: boolean;
  className?: string;
}

const Spinner: FC<Props> = ({ inline = false, className }) => (
  <span className={cx(styles.spinner, inline && styles.inline, className)} aria-label="Loading" role="status" />
);

export default Spinner;
