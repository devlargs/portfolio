'use client';

import { usePathname } from 'next/navigation';
import { RefObject, useCallback, useEffect, useState } from 'react';

const DESKTOP = '(min-width: 48em)';

interface Disclosure {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

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
