import NextLink from 'next/link';
import { FC } from 'react';
import styles from './NavLink.module.css';

interface Props {
  href: string;
  label: string;
  active?: boolean;
}

const NavLink: FC<Props> = ({ href, label, active = false }) => (
  <NextLink href={href} aria-current={active ? 'page' : undefined} className={styles.link}>
    {label}
  </NextLink>
);

export default NavLink;
