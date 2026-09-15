import awsForgottenPhoneNumber from './entries/aws-forgotten-phone-number';
import expoFirebasePushNotifications from './entries/expo-firebase-push-notifications';
import googlePlayClosedTesting from './entries/google-play-closed-testing';
import ispBlackholedFastly from './entries/isp-blackholed-fastly';
import largsHubArchitecture from './entries/largs-hub-architecture';
import resendSmtpOnSupabase from './entries/resend-smtp-on-supabase';
import reviewingMyOwnRepoScope from './entries/reviewing-my-own-repo-scope';
import s3CloudfrontImages from './entries/s3-cloudfront-images';
import twitterOauth2 from './entries/twitter-oauth-2';
import uploadImagesToS3FromNextjs from './entries/upload-images-to-s3-from-nextjs';
import whisperCppVsWhisperApi from './entries/whisper-cpp-vs-whisper-api';
import { Learning } from './types';

export type { Learning, LearningBlock } from './types';

export const LEARNINGS: readonly Learning[] = [
  ispBlackholedFastly,
  googlePlayClosedTesting,
  reviewingMyOwnRepoScope,
  whisperCppVsWhisperApi,
  awsForgottenPhoneNumber,
  expoFirebasePushNotifications,
  s3CloudfrontImages,
  largsHubArchitecture,
  resendSmtpOnSupabase,
  uploadImagesToS3FromNextjs,
  twitterOauth2,
];

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

export type LearningTag = { tag: string; count: number };

export const learningTags = (learnings: readonly Learning[]): LearningTag[] => {
  const counts = new Map<string, number>();
  learnings.forEach((learning) => learning.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)));
  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag)
  );
};
