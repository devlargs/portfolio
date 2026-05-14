import { Box } from '@chakra-ui/react';
import AboutMe from '@components/AboutMe';
import ContactForm from '@components/ContactForm';
import ContentContainer from '@components/ContentContainer';
import HeroSection from '@components/HeroSection';
import Portfolio from '@components/Portfolio';
import Skills from '@components/Skills';
import Testimonials from '@components/Testimonials';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from 'constants/skills';
import { FC } from 'react';
import layout from 'theme/layout';

interface Props {
  imagePlaceholders: Record<string, string>;
  brokenLinks: string[];
}

const HomeView: FC<Props> = ({ imagePlaceholders, brokenLinks }) => (
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

        <ContentContainer title="Contact Me">
          <ContactForm />
        </ContentContainer>
      </Box>
    </Box>
  </Box>
);

export default HomeView;
