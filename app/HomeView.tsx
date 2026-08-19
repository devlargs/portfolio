import { Box } from '@chakra-ui/react';
import AboutMe from '@components/AboutMe';
import Capabilities from '@components/Capabilities';
import Colophon from '@components/Colophon';
import Contact from '@components/Contact';
import Masthead from '@components/Masthead';
import Opening from '@components/Opening';
import Recommendations from '@components/Recommendations';
import Section, { SectionHead } from '@components/Section';
import SideRail from '@components/SideRail';
import WorkIndex from '@components/WorkIndex';
import { FC } from 'react';

interface Props {
  imagePlaceholders: Record<string, string>;
  brokenLinks: string[];
  year: number;
}

const HomeView: FC<Props> = ({ imagePlaceholders, brokenLinks, year }) => (
  <>
    <Box
      as="a"
      href="#about"
      position="absolute"
      left="-9999px"
      top="0"
      zIndex={50}
      bg="var(--color-accent)"
      color="var(--color-accent-ink)"
      fontFamily="var(--font-meta)"
      fontSize="var(--text-xs)"
      px="var(--space-sm)"
      py="var(--space-2xs)"
      _focus={{ left: 'var(--space-sm)', top: 'var(--space-sm)' }}
    >
      Skip to content
    </Box>

    <Masthead />
    <SideRail />

    <Box as="main">
      <Opening portraitPlaceholder={imagePlaceholders.ralph} />

      <Section id="about">
        <SectionHead
          id="about"
          title="About"
          lede="What I work on, how I work with people, and the tools I reach for first."
        />
        <AboutMe />
      </Section>

      <Section id="work" sunken>
        <SectionHead
          id="work"
          title="Selected work"
          lede="Products and sites I have contributed to, plus things I built for myself. Marked entries are the engagements I spent the most time inside."
        />
        <WorkIndex brokenLinks={brokenLinks} />
      </Section>

      <Section id="capabilities">
        <SectionHead
          id="capabilities"
          title="Capabilities"
          lede="Primary is what I use daily. Secondary is what I have shipped with and can pick straight back up."
        />
        <Capabilities imagePlaceholders={imagePlaceholders} />
      </Section>

      <Section id="recommendations" sunken>
        <SectionHead id="recommendations" title="Recommendations" lede="Written by people I have worked alongside." />
        <Recommendations imagePlaceholders={imagePlaceholders} />
      </Section>

      <Section id="contact">
        <SectionHead id="contact" title="Contact" />
        <Contact />
      </Section>
    </Box>

    <Colophon year={year} />
  </>
);

export default HomeView;
