import cx from '@utils/cx';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './IconButton.module.css';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  /** Becomes the accessible name. An icon button has no visible label. */
  label: string;
  icon: ReactNode;
  size?: 'md' | 'sm';
  /** Red ink and a red hover wash, for a destructive action. */
  danger?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, Props>(
  ({ label, icon, size = 'md', danger = false, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cx(styles.button, size === 'sm' && styles.sm, danger && styles.danger)}
      {...rest}
    >
      {icon}
    </button>
  )
);

IconButton.displayName = 'IconButton';

export default IconButton;
