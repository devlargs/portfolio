'use client';

import useRouteProgress from 'hooks/useRouteProgress';
import { CSSProperties, FC } from 'react';
import styles from './RouteProgress.module.css';

const RouteProgress: FC = () => {
  const { visible, progress } = useRouteProgress();

  return (
    <div className={styles.track} data-visible={visible} aria-hidden="true">
      <div className={styles.bar} style={{ '--progress': progress } as CSSProperties} />
    </div>
  );
};

export default RouteProgress;
