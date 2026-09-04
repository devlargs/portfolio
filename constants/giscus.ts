/* giscus configuration. Every value here is public by design: giscus resolves
   the discussion from the browser, so the repo and category ids ship in the
   client bundle exactly as they do in the snippet giscus generates. They are
   identifiers, not credentials. */
export const GISCUS = {
  repo: 'devlargs/portfolio',
  repoId: 'MDEwOlJlcG9zaXRvcnkyNzQyNzgyNDM=',
  category: 'General',
  categoryId: 'DIC_kwDOEFknY84DE49T',
  /* `pathname` keys the thread to `/learnings/<slug>`, so a renamed slug starts
     a new thread and the old one is orphaned. Renaming a published learning
     means moving the discussion title in GitHub to match. */
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'en',
} as const;

export const GISCUS_ORIGIN = 'https://giscus.app';

export const GISCUS_SRC = `${GISCUS_ORIGIN}/client.js`;

/* The site is dark by default and never consults the system setting, so
   giscus is told the theme outright rather than being left on
   `preferred_color_scheme`, which would light up the widget under a dark page
   for anyone whose OS is set to light. `transparent_dark` lets the page paper
   show through instead of stacking a second near-black panel on it. */
export const giscusTheme = (mode: 'light' | 'dark'): string => (mode === 'dark' ? 'transparent_dark' : 'light');
