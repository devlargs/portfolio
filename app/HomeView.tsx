import AboutMe from '@components/AboutMe';
import Capabilities from '@components/Capabilities';
import Contact from '@components/Contact';
import Opening from '@components/Opening';
import PageShell from '@components/PageShell';
import Recommendations from '@components/Recommendations';
import type { Testimonial } from '@components/Recommendations/Quote';
import Section, { SectionHead } from '@components/Section';
import SideRail from '@components/SideRail';
import WorkPreview from '@components/WorkPreview';
import { FC } from 'react';

interface Props {
  imagePlaceholders: Record<string, string>;
  testimonials: Testimonial[];
  brokenLinks: string[];
  year: number;
}

const HomeView: FC<Props> = ({ imagePlaceholders, testimonials, brokenLinks, year }) => (
  <PageShell year={year} rail={<SideRail />}>
    <Opening portraitPlaceholder={imagePlaceholders.ralph} />

    <Section id="about">
      {/* AboutMe owns its own head so the stack rail can start level with the heading */}
      <AboutMe
        id="about"
        title="About"
        lede="What I work on, how I work with people, and the tools I reach for first."
      />
    </Section>

    <Section id="work" sunken>
      <SectionHead
        id="work"
        title="Selected work"
        lede="The engagements I spent the most time inside. The rest of the index, client and personal, has a page of its own."
      />
      <WorkPreview brokenLinks={brokenLinks} />
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
      <Recommendations items={testimonials} imagePlaceholders={imagePlaceholders} />
    </Section>

    <Section id="contact">
      <SectionHead id="contact" title="Contact" />
      <Contact />
    </Section>
  </PageShell>
);

export default HomeView;
