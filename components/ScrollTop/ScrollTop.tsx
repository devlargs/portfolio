'use client';

import useScrollPast from 'hooks/useScrollPast';
import useScrollProgress from 'hooks/useScrollProgress';
import { CSSProperties, FC } from 'react';
import styles from './ScrollTop.module.css';

const THRESHOLD = 600;

const ScrollTop: FC = () => {
  const progress = useScrollProgress();
  const visible = useScrollPast(THRESHOLD);

  const toTop = (): void => window.scrollTo({ top: 0 });

  return (
    <button
      type="button"
      className={styles.fab}
      data-visible={visible}
      inert={!visible}
      aria-label="Back to top"
      onClick={toTop}
    >
      <svg className={styles.ring} viewBox="0 0 48 48" aria-hidden="true">
        <circle className={styles.track} cx="24" cy="24" r="22" pathLength="1" />
        <circle
          className={styles.indicator}
          cx="24"
          cy="24"
          r="22"
          pathLength="1"
          style={{ '--progress': progress } as CSSProperties}
        />
      </svg>

      <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
      </svg>
    </button>
  );
};

export default ScrollTop;
