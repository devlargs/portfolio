'use client';

import useScrollPast from 'hooks/useScrollPast';
import useScrollProgress from 'hooks/useScrollProgress';
import { CSSProperties, FC } from 'react';
import styles from './ScrollTop.module.css';

/** A screen's worth of travel before the way back is worth offering. */
const THRESHOLD = 600;

/**
 * `rail-track` primitive in its closed form: the same accent, the same reading
 * of scroll position, drawn as a ring instead of a line. The ring is the
 * button's edge, so there is no border competing with it.
 */
const ScrollTop: FC = () => {
  const progress = useScrollProgress();
  const visible = useScrollPast(THRESHOLD);

  /* No `behavior`, which means `auto`, which defers to the computed
     `scroll-behavior`. app/globals.css already sets that to smooth and drops it
     back to auto under `prefers-reduced-motion`, so the preference is honoured
     without this component reading a media query. */
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
      {/* pathLength normalises the circumference to 1, so the offset is just
          the remaining fraction and no magic number has to be kept in sync. */}
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
