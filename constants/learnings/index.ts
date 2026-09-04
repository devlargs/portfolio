import largsHubArchitecture from './entries/largs-hub-architecture';
import resendSmtpOnSupabase from './entries/resend-smtp-on-supabase';
import { Learning } from './types';

export type { Learning, LearningBlock } from './types';

export const LEARNINGS: readonly Learning[] = [largsHubArchitecture, resendSmtpOnSupabase];

export const findLearning = (slug: string): Learning | undefined =>
  LEARNINGS.find((learning) => learning.slug === slug);

const WORDS_PER_MINUTE = 220;

export const wordCount = (learning: Learning): number =>
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
      case 'code':
        return total + 20;
    }
  }, 0);

export const readingMinutes = (learning: Learning): number =>
  Math.max(1, Math.round(wordCount(learning) / WORDS_PER_MINUTE));
