'use client';

import Reveal, { RevealLines } from '@components/Reveal';
import { PROFILE } from '@constants/profile';
import cx from '@utils/cx';
import { FC } from 'react';
import AvailabilityLine from './AvailabilityLine';
import styles from './Opening.module.css';
import Portrait from './Portrait';

interface Props {
  portraitPlaceholder?: string;
}

const Opening: FC<Props> = ({ portraitPlaceholder }) => (
  <section id="top" className={styles.section}>
    <div className={cx('page-wrap', styles.inner)}>
      {/* standing head: role and place, the way a masthead dateline reads */}
      <Reveal distance={8}>
        <div className={styles.dateline}>
          <span className={styles.role}>{PROFILE.role}</span>
          <span aria-hidden="true">/</span>
          <span>{PROFILE.location}</span>
        </div>
      </Reveal>

      {/* the one h1 on the page */}
      <div className={styles.headline}>
        <RevealLines
          as="h1"
          fontSize="var(--text-display)"
          lineHeight={1.02}
          letterSpacing="-0.035em"
          lines={[
            'I build web software',
            <>
              that feels <span className={styles.marked}>obvious</span>.
            </>,
          ]}
        />
      </div>

      {/* asymmetric band: reading column left, identity block right */}
      <div className={styles.band}>
        <Reveal delay={120}>
          <p className={styles.summary}>
            React, Next.js, Node and TypeScript, shipped with teams across Europe, Asia and the US. I care about the
            parts nobody is meant to notice: the state that stays in sync, the form that does not lose your work, the
            page that is already there when you arrive.
          </p>

          <div className={styles.cta}>
            <a href="#work" className={styles.ctaLink}>
              See selected work
              <span aria-hidden="true">&#8595;</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className={styles.identity}>
            <Portrait
              src="/images/linkedin/ralph.jpg"
              alt={`${PROFILE.name}, ${PROFILE.role}`}
              blurDataURL={portraitPlaceholder}
            />
            <div className={styles.identityText}>
              <p className={styles.identityName}>{PROFILE.name}</p>
              <div className={styles.availability}>
                <AvailabilityLine label={PROFILE.availabilityLabel} live={PROFILE.available} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Opening;
