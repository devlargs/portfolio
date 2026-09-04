export const GISCUS = {
  repo: 'devlargs/portfolio',
  repoId: 'MDEwOlJlcG9zaXRvcnkyNzQyNzgyNDM=',
  category: 'General',
  categoryId: 'DIC_kwDOEFknY84DE49T',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'en',
} as const;

export const GISCUS_ORIGIN = 'https://giscus.app';

export const GISCUS_SRC = `${GISCUS_ORIGIN}/client.js`;

export const giscusTheme = (mode: 'light' | 'dark'): string => (mode === 'dark' ? 'transparent_dark' : 'light');
