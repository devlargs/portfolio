'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const SHOW_AFTER = 120;
const CEILING = 0.92;
const TICK = 180;
const BAIL_OUT = 10000;

interface RouteProgress {
  visible: boolean;
  progress: number;
}

const useRouteProgress = (): RouteProgress => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const running = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ticker = useRef<ReturnType<typeof setInterval>>(undefined);

  const clear = useCallback((): void => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    clearInterval(ticker.current);
  }, []);

  const start = useCallback((): void => {
    if (running.current) return;
    running.current = true;

    timers.current.push(
      setTimeout(() => {
        setVisible(true);
        setProgress(0.08);

        ticker.current = setInterval(() => {
          setProgress((current) => current + (CEILING - current) * 0.12);
        }, TICK);
      }, SHOW_AFTER)
    );

    timers.current.push(setTimeout(() => setVisible(false), BAIL_OUT));
  }, []);

  const done = useCallback((): void => {
    if (!running.current) return;
    running.current = false;
    clear();

    setVisible((wasVisible) => {
      if (!wasVisible) {
        setProgress(0);
        return false;
      }

      setProgress(1);
      timers.current.push(
        setTimeout(() => {
          setVisible(false);
          timers.current.push(setTimeout(() => setProgress(0), 200));
        }, 180)
      );
      return true;
    });
  }, [clear]);

  useEffect(() => {
    const onClick = (event: MouseEvent): void => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      if (!anchor.getAttribute('href')) return;

      const target = new URL(anchor.href, window.location.href);
      if (target.origin !== window.location.origin) return;
      if (target.pathname === window.location.pathname) return;

      start();
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', start);

    return (): void => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', start);
    };
  }, [start]);

  useEffect(() => {
    done();
  }, [pathname, done]);

  useEffect(() => clear, [clear]);

  return { visible, progress };
};

export default useRouteProgress;
