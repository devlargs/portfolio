import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { checkLink } from '@lib/checkLink';
import { fetchGithubActivity } from '@lib/fetchGithubActivity';
import { toKebabCase } from 'largs-utils';
import { getPlaiceholder } from 'plaiceholder';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from 'constants/skills';
import HomeView from './HomeView';

export const dynamic = 'force-static';

const Page = async (): Promise<JSX.Element> => {
  const pngs = [...PRIMARY_SKILLS, ...SECONDARY_SKILLS]
    .map((item) => toKebabCase(item))
    .filter((item): item is string => Boolean(item));
  const jpgs = [
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

  const imagePlaceholders: Record<string, string> = {};
  const dataPng = await Promise.all(pngs.map((item) => getPlaiceholder(`/images/${item}.png`)));
  pngs.forEach((name, i) => {
    imagePlaceholders[name] = dataPng[i].base64;
  });

  const dataJpg = await Promise.all(jpgs.map((item) => getPlaiceholder(`/images/linkedin/${item}.jpg`)));
  jpgs.forEach((name, i) => {
    imagePlaceholders[name] = dataJpg[i].base64;
  });

  const allLinks = [...COMPANY_CONTRIBUTIONS, ...PERSONAL_PROJECTS].map((p) => p.link.trim());
  const [linkResults, activity] = await Promise.all([
    Promise.all(allLinks.map((url) => checkLink(url).then((ok) => ({ url, ok })))),
    fetchGithubActivity('devlargs'),
  ]);
  const brokenLinks = linkResults.filter((r) => !r.ok).map((r) => r.url);

  return <HomeView imagePlaceholders={imagePlaceholders} brokenLinks={brokenLinks} activity={activity} />;
};

export default Page;
