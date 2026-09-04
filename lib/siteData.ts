import type { Testimonial } from '@components/Recommendations/Quote';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from '@constants/skills';
import testimonials from '@constants/testimonials';
import { shuffleArray, toKebabCase } from 'largs-utils';
import { getPlaiceholder } from 'plaiceholder';
import { checkLink } from './checkLink';

const LINKEDIN_PORTRAITS = [
  'gabriel',
  'josua',
  'marc',
  'nemuel',
  'ralph',
  'zadkiel',
  'arriele',
  'andrien',
  'johngo',
  'cj',
  'maria',
];

const buildImagePlaceholders = async (): Promise<Record<string, string>> => {
  const pngs = [...PRIMARY_SKILLS, ...SECONDARY_SKILLS]
    .map((item) => toKebabCase(item))
    .filter((item): item is string => Boolean(item));

  const [dataPng, dataJpg] = await Promise.all([
    Promise.all(pngs.map((item) => getPlaiceholder(`/images/${item}.png`))),
    Promise.all(LINKEDIN_PORTRAITS.map((item) => getPlaiceholder(`/images/linkedin/${item}.jpg`))),
  ]);

  const placeholders: Record<string, string> = {};
  pngs.forEach((name, i) => {
    placeholders[name] = dataPng[i].base64;
  });
  LINKEDIN_PORTRAITS.forEach((name, i) => {
    placeholders[name] = dataJpg[i].base64;
  });

  return placeholders;
};

const buildBrokenLinks = async (): Promise<string[]> => {
  if (process.env.NODE_ENV !== 'production') return [];

  const allLinks = [...COMPANY_CONTRIBUTIONS, ...PERSONAL_PROJECTS].map((p) => p.link.trim());
  const results = await Promise.all(allLinks.map((url) => checkLink(url).then((ok) => ({ url, ok }))));

  return results.filter((r) => !r.ok).map((r) => r.url);
};

let placeholdersPromise: Promise<Record<string, string>> | undefined;
let brokenLinksPromise: Promise<string[]> | undefined;

export const getImagePlaceholders = (): Promise<Record<string, string>> => {
  placeholdersPromise ??= buildImagePlaceholders();
  return placeholdersPromise;
};

export const getBrokenLinks = (): Promise<string[]> => {
  brokenLinksPromise ??= buildBrokenLinks();
  return brokenLinksPromise;
};

const shuffledTestimonials: Testimonial[] = shuffleArray(testimonials) ?? testimonials;

export const getTestimonials = (): Testimonial[] => shuffledTestimonials;
