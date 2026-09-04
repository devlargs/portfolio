'use client';

import Reveal from '@components/Reveal';
import { SectionLede, SectionRule, SectionTitle } from '@components/Section';
import { FC } from 'react';
import AboutProse from './AboutProse';
import AboutRail from './AboutRail';
import styles from './AboutMe.module.css';

interface Props {
  id: string;
  title: string;
  lede?: string;
}

const AboutMe: FC<Props> = ({ id, title, lede }) => (
  <div>
    <SectionRule />

    <div className={styles.grid}>
      <div className={styles.column}>
        <SectionTitle id={id}>{title}</SectionTitle>
        {lede && <SectionLede>{lede}</SectionLede>}

        <div className={styles.prose}>
          <AboutProse />
        </div>
      </div>

      <Reveal delay={160}>
        <AboutRail />
      </Reveal>
    </div>
  </div>
);

export default AboutMe;
