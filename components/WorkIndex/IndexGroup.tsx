import Reveal from '@components/Reveal';
import { Projects } from '@constants/portfolio';
import { FC } from 'react';
import styles from './IndexGroup.module.css';
import IndexRow from './IndexRow';

interface Props {
  title: string;
  projects: Projects[];
  brokenSet: Set<string>;
}

/** Strips protocol, `www.` and any trailing path so the column stays scannable. */
const toDomain = (rawUrl: string): string => {
  try {
    return new URL(rawUrl.trim()).hostname.replace(/^www\./, '');
  } catch {
    return rawUrl.trim();
  }
};

const IndexGroup: FC<Props> = ({ title, projects, brokenSet }) => (
  <div>
    <div className={styles.head}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.count}>{String(projects.length).padStart(2, '0')}</span>
    </div>

    {/* One reveal for the whole run. Staggering thirty rows individually reads
        as decoration rather than intent, and delays the last row too long. */}
    <Reveal distance={12}>
      <ul className={styles.list}>
        {projects.map((project, i) => (
          <IndexRow
            key={project.link}
            index={String(i + 1).padStart(2, '0')}
            title={project.title}
            href={project.link.trim()}
            domain={toDomain(project.link)}
            highlight={project.highlight}
            unavailable={brokenSet.has(project.link.trim())}
          />
        ))}
      </ul>
    </Reveal>
  </div>
);

export default IndexGroup;
