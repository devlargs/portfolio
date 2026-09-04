'use client';

import cx from '@utils/cx';
import useReveal from 'hooks/useReveal';
import { CSSProperties, FC, PropsWithChildren } from 'react';
import styles from './Reveal.module.css';

interface Props {
  delay?: number;
  distance?: number;
  className?: string;
}

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
