'use client';

import { Box } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

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
    <Box
      as="button"
      type="button"
      onClick={toggle}
      aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={mode === 'dark'}
      display="grid"
      placeContent="center"
      w="32px"
      h="32px"
      flexShrink={0}
      borderRadius="var(--radius-pill)"
      border="var(--rule-hair) solid var(--color-rule)"
      color="var(--color-ink-2)"
      bg="transparent"
      cursor="pointer"
      transition="color var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out)"
      _hover={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
      _active={{ background: 'var(--color-paper-3)' }}
    >
      {/* Sun and moon are the same 14px box; only the glyph swaps, so the
          button never resizes between states. Hidden until mounted to avoid
          rendering the wrong glyph during hydration. */}
      <Box
        as="span"
        fontSize="14px"
        lineHeight="1"
        opacity={mounted ? 1 : 0}
        transition="opacity var(--dur-1) var(--ease-out)"
        aria-hidden="true"
      >
        {mode === 'dark' ? '\u25CB' : '\u25CF'}
      </Box>
    </Box>
  );
};

export default ThemeToggle;
