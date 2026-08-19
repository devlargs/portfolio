const styles = {
  global: {
    'html, body': {
      /* clip, never hidden — `hidden` breaks position: sticky in the rail */
      overflowX: 'clip',
      background: 'var(--color-paper)',
      color: 'var(--color-ink)',
    },
    html: {
      boxSizing: 'border-box',
      scrollBehavior: 'smooth',
      /* the sticky masthead must not cover an anchored section head */
      scrollPaddingTop: 'calc(var(--space-2xl) + 64px)',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
    body: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 1.65,
      transition: 'background var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out)',
    },
    '*, *::before, *::after': { boxSizing: 'inherit' },
    'h1, h2, h3, h4': {
      fontFamily: 'var(--font-display)',
      fontStyle: 'normal',
      fontWeight: 400,
      color: 'var(--color-ink)',
      overflowWrap: 'anywhere',
      minWidth: 0,
    },
    p: { fontFamily: 'var(--font-body)' },
    '::selection': {
      background: 'var(--color-accent-soft)',
      color: 'var(--color-ink)',
    },
    /* focus is never animated — it must appear the instant focus lands */
    ':focus-visible': {
      outline: '2px solid var(--color-focus)',
      outlineOffset: '3px',
      borderRadius: 'var(--radius-sm)',
      transition: 'none',
    },
    ':focus:not(:focus-visible)': { outline: 'none' },
    '*': {
      scrollbarWidth: 'thin',
      scrollbarColor: 'var(--color-rule-strong) transparent',
    },
    '*::-webkit-scrollbar': { width: '10px', height: '10px' },
    '*::-webkit-scrollbar-track': { background: 'transparent' },
    '*::-webkit-scrollbar-thumb': {
      background: 'var(--color-rule-strong)',
      borderRadius: 'var(--radius-pill)',
      border: '3px solid transparent',
      backgroundClip: 'padding-box',
    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: 'var(--color-accent)',
      backgroundClip: 'padding-box',
    },
    '@media (prefers-reduced-motion: reduce)': {
      html: { scrollBehavior: 'auto' },
      '*, *::before, *::after': {
        animationDuration: '0.01ms !important',
        animationIterationCount: '1 !important',
        transitionDuration: '150ms !important',
        scrollBehavior: 'auto !important',
      },
    },
  },
};

export default styles;
