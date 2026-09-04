export type LearningBlock =
  | { kind: 'text'; content: string }
  | { kind: 'heading'; content: string }
  | { kind: 'code'; content: string; label?: string }
  | { kind: 'list'; items: readonly string[]; ordered?: boolean }
  | { kind: 'fields'; items: readonly { label: string; value: string }[] }
  | { kind: 'note'; content: string; tone?: 'info' | 'warn' };

export type Learning = {
  slug: string;
  title: string;
  summary: string;
  published: string;
  updated?: string;
  tags: readonly string[];
  body: readonly LearningBlock[];
};
