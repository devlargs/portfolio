import cx from '@utils/cx';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './Button.module.css';
import Spinner from './Spinner';

type Variant = 'solidBlue' | 'solidRed' | 'ghost' | 'ghostRed';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: Variant;
  size?: 'md' | 'sm';
  /** Square, no horizontal padding. Pair with an `aria-label`. */
  iconOnly?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  /** Shown beside the spinner. Without it the spinner replaces the label. */
  loadingText?: string;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = 'ghost',
      size = 'md',
      iconOnly = false,
      fullWidth = false,
      isLoading = false,
      loadingText,
      disabled,
      children,
      type = 'button',
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cx(
        styles.button,
        styles[variant],
        size === 'sm' && styles.sm,
        iconOnly && styles.icon,
        fullWidth && styles.fullWidth
      )}
      {...rest}
    >
      {isLoading && !loadingText && (
        <span className={styles.centredSpinner}>
          <Spinner inline />
        </span>
      )}
      {isLoading && loadingText && <Spinner inline className={styles.labelledSpinner} />}
      <span className={cx(isLoading && !loadingText && styles.hiddenLabel)}>{loadingText ?? children}</span>
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
