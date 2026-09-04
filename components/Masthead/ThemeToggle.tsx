'use client';

import cx from '@utils/cx';
import { FC, useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './ThemeIcons';
import styles from './ThemeToggle.module.css';

type Mode = 'light' | 'dark';

const STORAGE_KEY = 'rl-theme';

/* Dark is the site default, so an unset attribute means dark. The system
   preference is deliberately not consulted: only an explicit choice, stored
   under STORAGE_KEY and replayed by the inline script in app/layout.tsx,
   moves the reader off dark. */
const readInitialMode = (): Mode => {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
};

const ThemeToggle: FC = () => {
  const [mode, setMode] = useState<Mode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(readInitialMode());
    setMounted(true);
  }, []);

  const toggle = (): void => {
    const next: Mode = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the choice just does not persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={mode === 'dark'}
      data-mode={mode}
      className={styles.toggle}
    >
      <span className={cx(styles.glyph, mounted && styles.mounted)}>
        <SunIcon className={cx(styles.icon, styles.sun)} />
        <MoonIcon className={cx(styles.icon, styles.moon)} />
      </span>
    </button>
  );
};

export default ThemeToggle;
