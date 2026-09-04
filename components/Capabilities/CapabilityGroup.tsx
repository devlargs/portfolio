import Reveal from '@components/Reveal';
import { toKebabCase } from 'largs-utils';
import { FC } from 'react';
import CapabilityItem from './CapabilityItem';
import styles from './CapabilityGroup.module.css';

interface Props {
  title: string;
  skills: readonly string[];
  imagePlaceholders: Record<string, string>;
}

const CapabilityGroup: FC<Props> = ({ title, skills, imagePlaceholders }) => (
  <div>
    <div className={styles.head}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.count}>{String(skills.length).padStart(2, '0')}</span>
    </div>

    <Reveal distance={12}>
      <ul className={styles.list}>
        {skills.map((skill) => {
          const slug = toKebabCase(skill);
          return (
            <CapabilityItem
              key={skill}
              name={skill}
              slug={slug ?? ''}
              blurDataURL={slug ? imagePlaceholders[slug] : undefined}
            />
          );
        })}
      </ul>
    </Reveal>
  </div>
);

export default CapabilityGroup;
