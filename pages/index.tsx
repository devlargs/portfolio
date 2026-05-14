import { Box } from '@chakra-ui/react';
import AboutMe from '@components/AboutMe';
import Activity from '@components/Activity';
import ContactForm from '@components/ContactForm';
import ContentContainer from '@components/ContentContainer';
import HeroSection from '@components/HeroSection';
import Portfolio from '@components/Portfolio';
import Skills from '@components/Skills';
import Testimonials from '@components/Testimonials';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { checkLink } from '@lib/checkLink';
import { fetchGithubActivity, YearlyActivity } from '@lib/fetchGithubActivity';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from 'constants/skills';
import { toKebabCase } from 'largs-utils';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPlaiceholder } from 'plaiceholder';
import { FC } from 'react';
import layout from 'theme/layout';

const description =
  'Passionate developer experienced in building clean and intuitive web applications with ReactJS, NodeJS & Typescript, dedicated to constantly expanding skills and collaborating effectively with creative teams.';

const Home: FC<{
  imagePlaceholders: Record<string, string>;
  brokenLinks: string[];
  activity: YearlyActivity | null;
}> = ({ imagePlaceholders, brokenLinks, activity }) => {
  return (
    <>
      <Head>
        <title>Ralph Largo | Portfolio Website</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://ralphlargo.com/" />
        <meta property="og:type" content="website" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        flexDir={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Box flex="1" minW="0" color="white">
          <HeroSection logoPlaceholder={imagePlaceholders.ralph} />
        </Box>
        <Box flex="1" minW="0">
          <Box
            h={layout.right.height}
            overflow={{ base: 'auto', lg: 'scroll' }}
            overflowX={{ base: 'auto', lg: 'hidden' }}
            py={layout.right.paddingY}
            px={layout.right.paddingX}
          >
            <ContentContainer title="About Me">
              <AboutMe />
            </ContentContainer>

            <ContentContainer title="Skills">
              <Skills skills={PRIMARY_SKILLS} title="Primary Skills" imagePlaceholders={imagePlaceholders} />
              <Box h="16px" />
              <Skills skills={SECONDARY_SKILLS} title="Secondary Skills" imagePlaceholders={imagePlaceholders} />
            </ContentContainer>

            <ContentContainer title="Portfolio">
              <Portfolio brokenLinks={brokenLinks} />
            </ContentContainer>

            <ContentContainer title="Recommendations">
              <Testimonials imagePlaceholders={imagePlaceholders} />
            </ContentContainer>

            {/* Hide this for now  */}
            {/* eslint-disable-next-line */}
            {false && (
              <>
                {activity && activity!.years.length > 0 && (
                  <ContentContainer title="GitHub Activity">
                    <Activity data={activity} />
                  </ContentContainer>
                )}
              </>
            )}

            <ContentContainer title="Contact Me">
              <ContactForm />
            </ContentContainer>

            {/* <ContentContainer title="Social"></ContentContainer> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      imagePlaceholders,
      brokenLinks,
      activity,
    },
  };
};

export default Home;
