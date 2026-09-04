import cx from '@utils/cx';
import { FC } from 'react';
import styles from './IndexRow.module.css';

interface Props {
  index: string;
  title: string;
  href: string;
  domain: string;
  /** Notable engagement — carries the accent tick and full-strength ink. */
  highlight?: boolean;
  /** Server-side link check failed, so no anchor is rendered. */
  unavailable?: boolean;
}

const IndexRow: FC<Props> = ({ index, title, href, domain, highlight = false, unavailable = false }) => {
  const content = (
    <>
      {!unavailable && <span className={styles.edge} aria-hidden="true" />}

      <div className={styles.grid}>
        <span className={styles.index}>{index}</span>

        <div className={styles.body}>
          <span className={cx(styles.title, unavailable ? styles.unavailable : highlight && styles.highlight)}>
            {title}
            {highlight && !unavailable && (
              <span className={styles.tick} aria-hidden="true">
                &#9679;
              </span>
            )}
          </span>

          <span className={styles.domain}>{unavailable ? 'link unavailable' : domain}</span>
        </div>

        <span className={cx(styles.arrow, unavailable && styles.arrowHidden)} aria-hidden="true">
          {unavailable ? '' : '→'}
        </span>
      </div>
    </>
  );

  if (unavailable) {
    return (
      <li className={styles.row}>
        <div className={styles.dead} title="This site did not respond when the page was built">
          {content}
        </div>
      </li>
    );
  }

  return (
    <li className={styles.row}>
      <a href={href} target="_blank" rel="noreferrer noopener" className={styles.link}>
        {content}
      </a>
    </li>
  );
};

export default IndexRow;
