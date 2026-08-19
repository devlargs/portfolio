/**
 * Semantic aliases over the token layer in `app/tokens.css`.
 * Every value here is a `var()` reference so light and warm-dark stay in sync.
 */
const defaults = {
  primary: 'var(--color-accent)',
  primaryHover: 'var(--color-accent-hover)',
  primarySoft: 'var(--color-accent-soft)',
  paper: 'var(--color-paper)',
  paperSunken: 'var(--color-paper-2)',
  paperRaised: 'var(--color-paper-3)',
  ink: 'var(--color-ink)',
  inkMuted: 'var(--color-ink-2)',
  inkMeta: 'var(--color-ink-3)',
  rule: 'var(--color-rule)',
  ruleStrong: 'var(--color-rule-strong)',
  focus: 'var(--color-focus)',
  danger: 'var(--color-danger)',
  dangerSoft: 'var(--color-danger-soft)',
  live: 'var(--color-live)',
  fontDisplay: 'var(--font-display)',
  fontBody: 'var(--font-body)',
  fontMeta: 'var(--font-meta)',
} as const;

export default defaults;
