import Reveal from '@components/Reveal';
import { FC, PropsWithChildren } from 'react';
import styles from './AboutProse.module.css';

const Lead: FC<PropsWithChildren> = ({ children }) => <span className={styles.lead}>{children}</span>;

const AboutProse: FC = () => (
  <>
    <Reveal>
      <p className={styles.opening}>
        I am a developer with a passion for building <Lead>clean web applications</Lead> that feel intuitive to use. I
        enjoy turning ideas into reality through thoughtful, creative solutions, and I am always curious to explore new
        tools and ideas along the way.
      </p>
    </Reveal>

    <Reveal delay={100}>
      <p className={styles.support}>
        Beyond solo hobby projects, I have collaborated with creative teams through daily stand-ups, code reviews and
        shared project management, shipping work that balances craft with pragmatism.
      </p>
    </Reveal>
  </>
);

export default AboutProse;
