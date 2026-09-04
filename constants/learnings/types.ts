/**
 * Learnings are authored as typed blocks rather than markdown so the renderer
 * stays a closed set: every block below has one component, and an entry can
 * never introduce an element the design system has no styling for.
 */

export type LearningBlock =
  | { kind: 'text'; content: string }
  | { kind: 'heading'; content: string }
  | { kind: 'code'; content: string; label?: string }
  | { kind: 'list'; items: readonly string[]; ordered?: boolean }
  /** Label/value pairs. Used for settings panels, where prose reads worse. */
  | { kind: 'fields'; items: readonly { label: string; value: string }[] }
  | { kind: 'note'; content: string; tone?: 'info' | 'warn' };

export type Learning = {
  slug: string;
  title: string;
  /** Standfirst. Carries the index row and the page description. */
  summary: string;
  /** ISO date, YYYY-MM-DD. Drives the visible dateline, the article schema and
   *  the entry's `lastModified` in the sitemap, so it is not decoration. */
  published: string;
  /** ISO date. Set it only on a real revision; absent means never revised. */
  updated?: string;
  tags: readonly string[];
  body: readonly LearningBlock[];
};
