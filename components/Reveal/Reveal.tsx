'use client';

import cx from '@utils/cx';
import useReveal from 'hooks/useReveal';
import { CSSProperties, FC, PropsWithChildren } from 'react';
import styles from './Reveal.module.css';

interface Props {
  /** Stagger offset in ms. Keep siblings under ~240ms total. */
  delay?: number;
  /** Vertical travel. 0 gives a pure fade for content that must not shift. */
  distance?: number;
  className?: string;
}

/**
 * `line-reveal` primitive, single-element form.
 * Animates transform + opacity only; collapses to a 150ms fade under
 * prefers-reduced-motion via the global override in app/globals.css.
 */
const Reveal: FC<PropsWithChildren<Props>> = ({ delay = 0, distance = 16, className, children }) => {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cx(styles.reveal, className)}
      data-revealed={revealed || undefined}
      style={{ '--reveal-delay': `${delay}ms`, '--reveal-distance': `${distance}px` } as CSSProperties}
    >
      {children}
    </div>
  );
};

export default Reveal;
