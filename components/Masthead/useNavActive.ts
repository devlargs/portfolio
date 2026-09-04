'use client';

import { NavLinkItem, SECTIONS } from '@constants/profile';
import useActiveSection from 'hooks/useActiveSection';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const HOME = '/';

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
