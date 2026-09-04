import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { FC } from 'react';
import IndexGroup from './IndexGroup';
import styles from './WorkIndex.module.css';

interface Props {
  brokenLinks?: string[];
}

const WorkIndex: FC<Props> = ({ brokenLinks = [] }) => {
  const brokenSet = new Set(brokenLinks);

  return (
    <div className={styles.groups}>
      <IndexGroup title="Client work" projects={COMPANY_CONTRIBUTIONS} brokenSet={brokenSet} />
      <IndexGroup title="Personal projects" projects={PERSONAL_PROJECTS} brokenSet={brokenSet} />
    </div>
  );
};

export default WorkIndex;
