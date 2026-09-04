'use client';

import useScrollProgress from 'hooks/useScrollProgress';
import { CSSProperties, FC } from 'react';
import styles from './ScrollProgress.module.css';

/**
 * `rail-track` primitive, horizontal form.
 * Sits on the masthead's bottom hairline and scales along it. Decorative only:
 * the side rail carries the accessible position information.
 */
const ScrollProgress: FC = () => {
  const progress = useScrollProgress();

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} style={{ '--progress': progress } as CSSProperties} />
    </div>
  );
};

export default ScrollProgress;
