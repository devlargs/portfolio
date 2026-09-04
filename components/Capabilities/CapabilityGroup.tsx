import Reveal from '@components/Reveal';
import { toKebabCase } from 'largs-utils';
import { CSSProperties, FC } from 'react';
import CapabilityItem from './CapabilityItem';
import styles from './CapabilityGroup.module.css';

interface Props {
  title: string;
  skills: readonly string[];
  imagePlaceholders: Record<string, string>;
  emphasis?: boolean;
}

const CapabilityGroup: FC<Props> = ({ title, skills, imagePlaceholders, emphasis = false }) => (
  <div>
    <div className={styles.head}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.count}>{String(skills.length).padStart(2, '0')}</span>
    </div>

    <Reveal distance={12}>
      <ul className={styles.list} style={{ '--cap-columns': emphasis ? 4 : 5 } as CSSProperties}>
        {skills.map((skill) => {
          const slug = toKebabCase(skill);
          return (
            <CapabilityItem
              key={skill}
              name={skill}
              slug={slug ?? ''}
              blurDataURL={slug ? imagePlaceholders[slug] : undefined}
              emphasis={emphasis}
            />
          );
        })}
      </ul>
    </Reveal>
  </div>
);

export default CapabilityGroup;
