/** Page-level measurements for the Broadsheet document. */
const layout = {
  page: {
    maxWidth: 'var(--page-max)',
    gutter: 'var(--page-gutter)',
  },
  rail: {
    width: 'var(--rail-width)',
  },
  section: {
    paddingY: { base: 'var(--space-2xl)', md: 'var(--space-3xl)' },
  },
  measure: {
    body: 'var(--measure)',
    narrow: 'var(--measure-narrow)',
  },
  masthead: {
    height: { base: '56px', md: '64px' },
  },
} as const;

export default layout;
