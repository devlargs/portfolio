'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Navigation progress for the App Router, which ships no router events.
 *
 * A start is inferred from a click on an internal anchor that changes the
 * pathname, and a finish from `usePathname` reporting the new one.
 */

/** Most routes here are prerendered and arrive inside this window. Showing a bar
 *  for them would be a flash, which reads as a glitch rather than as progress. */
const SHOW_AFTER = 120;
/** The bar creeps toward this and waits. Only the route change closes it out. */
const CEILING = 0.92;
const TICK = 180;
/** A navigation that never lands must not leave a bar stranded on screen. */
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

        /* Eases toward the ceiling rather than marching to it, so a slow route
           still looks like it is moving after several seconds. */
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

    /* Finished inside SHOW_AFTER: nothing was ever painted, so there is nothing
       to close. Resetting silently is the whole point of the delay. */
    setVisible((wasVisible) => {
      if (!wasVisible) {
        setProgress(0);
        return false;
      }

      setProgress(1);
      timers.current.push(
        setTimeout(() => {
          setVisible(false);
          /* After the fade, or the reset would rewind a bar still on screen. */
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
      /* A same-page hash jump is not a navigation, and would never resolve. */
      if (target.pathname === window.location.pathname) return;

      start();
    };

    /* Capture, so a handler that stops propagation cannot hide the click. */
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
