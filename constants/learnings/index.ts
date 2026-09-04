import resendSmtpOnSupabase from './entries/resend-smtp-on-supabase';
import { Learning } from './types';

export type { Learning, LearningBlock } from './types';

/** Newest first. Add an entry file, import it, drop it at the top of the array. */
export const LEARNINGS: readonly Learning[] = [resendSmtpOnSupabase];

export const findLearning = (slug: string): Learning | undefined =>
  LEARNINGS.find((learning) => learning.slug === slug);

const WORDS_PER_MINUTE = 220;

const blockWords = (learning: Learning): number =>
  learning.body.reduce((total, block) => {
    switch (block.kind) {
      case 'text':
      case 'heading':
      case 'note':
        return total + block.content.split(/\s+/).length;
      case 'list':
        return total + block.items.join(' ').split(/\s+/).length;
      case 'fields':
        return total + block.items.length * 4;
      /* Code is scanned, not read. A flat estimate beats counting tokens. */
      case 'code':
        return total + 20;
    }
  }, 0);

export const readingMinutes = (learning: Learning): number =>
  Math.max(1, Math.round(blockWords(learning) / WORDS_PER_MINUTE));
