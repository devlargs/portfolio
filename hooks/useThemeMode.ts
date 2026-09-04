'use client';

import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

/* Dark is the site default, so an unset attribute means dark. The system
   preference is deliberately not consulted: only an explicit choice, stored by
   the header toggle and replayed by the inline script in app/layout.tsx, moves
   the reader off dark. */
export const readThemeMode = (): ThemeMode => {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
};

/**
 * The current theme, kept in step with the header toggle.
 *
 * Returns `dark` on the server and on the first client render so the markup
 * matches; the real value lands in the mount effect. Anything that paints from
 * CSS should read a token instead of calling this. It exists for the cases CSS
 * cannot reach, such as telling a cross-origin iframe which theme to draw.
 */
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
