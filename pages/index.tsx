import { Box, Text } from '@chakra-ui/react';
import ContactForm from '@components/ContactForm';
import ContentContainer from '@components/ContentContainer';
import HeroSection from '@components/HeroSection';
import Portfolio from '@components/Portfolio';
import Skills from '@components/Skills';
import Testimonials from '@components/Testimonials';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from 'constants/skills';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import { FC } from 'react';

const description =
  'Passionate developer experienced in building clean and intuitive web applications with ReactJS, dedicated to constantly expanding skills and collaborating effectively with creative teams.';

const Home: FC<{ imagePlaceholders: Record<string, string> }> = ({ imagePlaceholders }) => {
  const router = useRouter();
  const isPortfolio = Boolean(router.query.portfolio);

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
        <Box flex="1" color="white">
          <HeroSection logoPlaceholder={imagePlaceholders.ralph} />
        </Box>
        <Box flex="1">
          <Box
            h={{
              base: 'initial',
              lg: '100vh',
            }}
            overflow={{
              base: 'auto',
              lg: 'scroll',
            }}
            overflowX={{
              base: 'auto',
              lg: 'hidden',
            }}
            py="60px"
            px={{
              base: '16px',
              lg: '100px',
            }}
          >
            <ContentContainer title="About Me">
              <Text fontSize="18px" color="#878e99" mb="25px">
                I’m a developer who has passion for building clean web applications with intuitive functionality. I
                enjoy the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m
                always curious about learning new skills, tools, and concepts.
              </Text>
              <Text fontSize="18px" color="#878e99">
                In addition to working on various solo hobby projects, I have worked with creative teams, which involves
                daily stand-ups and communications, source control, and project management.
              </Text>
            </ContentContainer>

            <ContentContainer title="Skills">
              <Skills skills={PRIMARY_SKILLS} title="Primary Skills" imagePlaceholders={imagePlaceholders} />
              <Box h="16px" />
              <Skills skills={SECONDARY_SKILLS} title="Secondary Skills" imagePlaceholders={imagePlaceholders} />
            </ContentContainer>

            {isPortfolio && (
              <ContentContainer title="Portfolio">
                <Portfolio />
              </ContentContainer>
            )}

            <ContentContainer title="Recommendations">
              <Testimonials imagePlaceholders={imagePlaceholders} />
            </ContentContainer>

            <ContentContainer title="Contact With Me">
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
  const pngs = [
    'angular',
    'antd',
    'apollo',
    'chakra-ui',
    'electron',
    'ethers',
    'express',
    'firebase',
    'git',
    'graphql',
    'heroku',
    'javascript',
    'jest',
    'mongodb',
    'next-js',
    'node',
    'nx',
    'react-js',
    'react-testing-library',
    'redux',
    'sanity-io',
    'sass',
    'tailwind',
    'typescript',
    'vue',
    'zustand',
  ];
  const jpgs = ['gabriel', 'josua', 'marc', 'nemuel', 'ralph', 'zadkiel'];

  const imagePlaceholders: Record<string, string> = {};
  const dataPng = await Promise.all(pngs.map((item) => getPlaiceholder(`/images/${item}.png`)));
  dataPng.map((q, i) => {
    imagePlaceholders[pngs[i]] = q.base64;
  });

  const dataJpg = await Promise.all(jpgs.map((item) => getPlaiceholder(`/images/linkedin/${item}.jpg`)));
  dataJpg.map((q, i) => {
    imagePlaceholders[jpgs[i]] = q.base64;
  });

  return {
    props: {
      imagePlaceholders,
    },
  };
};

export default Home;
