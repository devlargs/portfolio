'use client';

import { usePathname } from 'next/navigation';
import { RefObject, useCallback, useEffect, useState } from 'react';

const DESKTOP = '(min-width: 48em)';

interface Disclosure {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

/**
 * Open state for the mobile sheet, plus the four things that have to happen
 * around it: Escape returns focus to the trigger, the page behind stops
 * scrolling, a route change dismisses the sheet, and crossing into the desktop
 * layout dismisses it too. The last one matters because the sheet is hidden by
 * a media query rather than unmounted, so a rotation with it open would
 * otherwise leave the scroll lock on with nothing on screen to explain it.
 */
const useMenuDisclosure = (triggerRef: RefObject<HTMLButtonElement | null>): Disclosure => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback((): void => setOpen(false), []);
  const toggle = useCallback((): void => setOpen((prev) => !prev), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = (): void => setOpen(false);

    /* The lock goes on <html>, not <body>. app/globals.css gives <html> an
       `overflow-x: clip`, which makes it the scroll container, and a body
       overflow only propagates to the viewport while <html> is `visible` — so
       locking the body here would clip its content and freeze nothing.
       Restored rather than cleared, and the cleanup runs during the commit that
       closes the sheet, so the lock is gone before the router scrolls to a
       hash target. */
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);

    return (): void => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open, triggerRef]);

  return { open, toggle, close };
};

export default useMenuDisclosure;
