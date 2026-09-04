'use client';

import useRouteProgress from 'hooks/useRouteProgress';
import { CSSProperties, FC } from 'react';
import styles from './RouteProgress.module.css';

/**
 * `rail-track` primitive again, pinned to the top of the viewport. Same accent,
 * same `scaleX` gesture as the masthead's scroll bar, 56px above it so the two
 * never sit on the same line.
 *
 * Hidden from assistive tech on purpose: the App Router already announces the
 * new page, and a live progressbar would talk over it.
 */
const RouteProgress: FC = () => {
  const { visible, progress } = useRouteProgress();

  return (
    <div className={styles.track} data-visible={visible} aria-hidden="true">
      <div className={styles.bar} style={{ '--progress': progress } as CSSProperties} />
    </div>
  );
};

export default RouteProgress;
