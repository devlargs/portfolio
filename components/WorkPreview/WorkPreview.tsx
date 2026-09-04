import MoreLink from '@components/MoreLink';
import { IndexGroup } from '@components/WorkIndex';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import { FC } from 'react';
import styles from './WorkPreview.module.css';

interface Props {
  brokenLinks?: string[];
}

const PREVIEW_ROWS = 6;

const TOTAL = COMPANY_CONTRIBUTIONS.length + PERSONAL_PROJECTS.length;

const FEATURED = COMPANY_CONTRIBUTIONS.filter((project) => project.highlight).slice(0, PREVIEW_ROWS);

const WorkPreview: FC<Props> = ({ brokenLinks = [] }) => (
  <div>
    <IndexGroup title="Longest engagements" projects={FEATURED} brokenSet={new Set(brokenLinks)} />

    <div className={styles.footer}>
      <MoreLink href="/work" label="Read the full index" />

      <span className={styles.count}>
        {TOTAL} entries, {COMPANY_CONTRIBUTIONS.length} client and {PERSONAL_PROJECTS.length} personal
      </span>
    </div>
  </div>
);

export default WorkPreview;
