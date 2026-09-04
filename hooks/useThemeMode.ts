'use client';

import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export const readThemeMode = (): ThemeMode => {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
};

const useThemeMode = (): ThemeMode => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    setMode(readThemeMode());

    const observer = new MutationObserver(() => setMode(readThemeMode()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return mode;
};

export default useThemeMode;
