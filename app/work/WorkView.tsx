import MoreLink from '@components/MoreLink';
import PageHead from '@components/PageHead';
import PageShell from '@components/PageShell';
import WorkIndex from '@components/WorkIndex';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import cx from '@utils/cx';
import { FC } from 'react';
import styles from './WorkView.module.css';

interface Props {
  brokenLinks: string[];
  year: number;
}

const TOTAL = COMPANY_CONTRIBUTIONS.length + PERSONAL_PROJECTS.length;

const WorkView: FC<Props> = ({ brokenLinks, year }) => (
  <PageShell year={year}>
    <PageHead
      eyebrow="Work"
      title="Everything I have shipped"
      lede="Products and sites I have contributed to, plus things I built for myself. Marked entries are the engagements I spent the most time inside. Links are checked when this page is built, so a dead one is labelled rather than left to fail."
      meta={`${TOTAL} entries`}
    />

    <div className={cx('page-wrap', styles.body)}>
      <WorkIndex brokenLinks={brokenLinks} />

      <div className={styles.more}>
        <MoreLink href="/#contact" label="Start a conversation" />
      </div>
    </div>
  </PageShell>
);

export default WorkView;
