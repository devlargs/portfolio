'use client';

import { NavLinkItem, SECTIONS } from '@constants/profile';
import useActiveSection from 'hooks/useActiveSection';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const HOME = '/';

/**
 * Which destination the reader is currently inside.
 *
 * Hash links only light up while the home document is on screen, and then only
 * for the band the reader is actually in. Route links light up for the whole
 * subtree, so an entry at /learnings/some-slug still marks Learnings.
 */
const useNavActive = (): ((link: NavLinkItem) => boolean) => {
  const pathname = usePathname();
  const onHome = pathname === HOME;

  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeSection = useActiveSection(ids);

  return (link: NavLinkItem): boolean => {
    const [route, hash] = link.href.split('#');

    if (hash) return onHome && activeSection === hash;

    return pathname === route || pathname.startsWith(`${route}/`);
  };
};

export default useNavActive;
