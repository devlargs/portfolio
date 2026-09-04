import NextLink from 'next/link';
import { FC } from 'react';
import styles from './MoreLink.module.css';

interface Props {
  href: string;
  label: string;
}

/** Underlined-in-accent continuation link. The arrow steps out on hover. */
const MoreLink: FC<Props> = ({ href, label }) => (
  <NextLink href={href} className={styles.link}>
    {label}
    <span aria-hidden="true">&#8594;</span>
  </NextLink>
);

export default MoreLink;
