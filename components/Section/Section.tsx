import cx from '@utils/cx';
import { FC, PropsWithChildren } from 'react';
import styles from './Section.module.css';

interface Props {
  id: string;
  sunken?: boolean;
}

const Section: FC<PropsWithChildren<Props>> = ({ id, sunken = false, children }) => (
  <section id={id} aria-labelledby={`${id}-head`} className={cx(styles.band, sunken && styles.sunken)}>
    <div className={cx('page-wrap', styles.inner)}>{children}</div>
  </section>
);

export default Section;
