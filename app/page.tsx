import { getBrokenLinks, getImagePlaceholders } from '@lib/homeData';
import { JSX } from 'react';
import HomeView from './HomeView';

export const dynamic = 'force-static';

const Page = async (): Promise<JSX.Element> => {
  const [imagePlaceholders, brokenLinks] = await Promise.all([getImagePlaceholders(), getBrokenLinks()]);

  return <HomeView imagePlaceholders={imagePlaceholders} brokenLinks={brokenLinks} year={new Date().getFullYear()} />;
};

export default Page;
