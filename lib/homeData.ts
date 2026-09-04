import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from '@constants/skills';
import { toKebabCase } from 'largs-utils';
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
  /* Link health is a publish-time quality gate. Running 41 outbound HEAD
     requests on every dev render costs seconds per refresh and tells us nothing
     we did not already know, so dev renders every link as healthy. */
  if (process.env.NODE_ENV !== 'production') return [];

  const allLinks = [...COMPANY_CONTRIBUTIONS, ...PERSONAL_PROJECTS].map((p) => p.link.trim());
  const results = await Promise.all(allLinks.map((url) => checkLink(url).then((ok) => ({ url, ok }))));

  return results.filter((r) => !r.ok).map((r) => r.url);
};

/* Both inputs are identical for every render, and both are slow: ~50 sharp
   decodes and, in production, a network round trip per project link. Holding
   the promises at module scope means the work happens once per server process
   instead of once per request, which is what keeps `next dev` snappy after the
   first hit. Editing a file still invalidates the module and recomputes. */
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
