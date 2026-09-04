'use client';

import cx from '@utils/cx';
import { readThemeMode, ThemeMode } from 'hooks/useThemeMode';
import { FC, useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './ThemeIcons';
import styles from './ThemeToggle.module.css';

const STORAGE_KEY = 'rl-theme';

const ThemeToggle: FC = () => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(readThemeMode());
    setMounted(true);
  }, []);

  const toggle = (): void => {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark';
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
