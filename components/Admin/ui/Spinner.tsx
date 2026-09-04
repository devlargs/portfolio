import cx from '@utils/cx';
import { FC } from 'react';
import styles from './Spinner.module.css';

interface Props {
  /** `inline` matches the button spinner: one em, inheriting the text colour. */
  inline?: boolean;
  className?: string;
}

const Spinner: FC<Props> = ({ inline = false, className }) => (
  <span className={cx(styles.spinner, inline && styles.inline, className)} aria-label="Loading" role="status" />
);

export default Spinner;
