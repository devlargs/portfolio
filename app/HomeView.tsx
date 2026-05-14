import { Box } from '@chakra-ui/react';
import AboutMe from '@components/AboutMe';
import Activity from '@components/Activity';
import ContactForm from '@components/ContactForm';
import ContentContainer from '@components/ContentContainer';
import HeroSection from '@components/HeroSection';
import Portfolio from '@components/Portfolio';
import Skills from '@components/Skills';
import Testimonials from '@components/Testimonials';
import { YearlyActivity } from '@lib/fetchGithubActivity';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from 'constants/skills';
import { FC } from 'react';
import layout from 'theme/layout';

interface Props {
  imagePlaceholders: Record<string, string>;
  brokenLinks: string[];
  activity: YearlyActivity | null;
}

const HomeView: FC<Props> = ({ imagePlaceholders, brokenLinks, activity }) => (
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
      </Box>
    </Box>
  </Box>
);

export default HomeView;
