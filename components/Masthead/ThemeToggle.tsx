'use client';

import cx from '@utils/cx';
import { FC, useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Mode = 'light' | 'dark';

const STORAGE_KEY = 'rl-theme';

const readInitialMode = (): Mode => {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const ThemeToggle: FC = () => {
  const [mode, setMode] = useState<Mode>('light');
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
      className={styles.toggle}
    >
      <span className={cx(styles.glyph, mounted && styles.mounted)} aria-hidden="true">
        {mode === 'dark' ? '○' : '●'}
      </span>
    </button>
  );
};

export default ThemeToggle;
