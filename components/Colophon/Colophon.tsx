import { ACTIVE_SOCIALS, PROFILE } from '@constants/profile';
import cx from '@utils/cx';
import { FC } from 'react';
import styles from './Colophon.module.css';

interface Props {
  year: number;
}

const Colophon: FC<Props> = ({ year }) => (
  <footer className={styles.footer}>
    <div className={cx('page-wrap', styles.inner)}>
      <p className={styles.name}>
        {PROFILE.name}
        <span className={styles.stop} aria-hidden="true">
          .
        </span>
      </p>

      <div className={styles.meta}>
        <span>&copy; {year} &middot; Built with Next.js, typeset in Fraunces and IBM Plex</span>

        {ACTIVE_SOCIALS.length > 0 && (
          <div className={styles.socials}>
            {ACTIVE_SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener me"
                className={styles.social}
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </footer>
);

export default Colophon;
