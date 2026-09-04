export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const SITE_URL = 'https://ralphlargo.com';

export const PROFILE = {
  name: 'Ralph Largo',
  wordmark: 'Ralph Largo',
  role: 'Full Stack Web Developer',
  location: 'Philippines, working remotely',
  available: true,
  availabilityLabel: 'Open to opportunities',
  statement: 'I build web software that feels obvious.',
  summary:
    'Passionate developer experienced in building clean and intuitive web applications with ReactJS, NodeJS and TypeScript, dedicated to constantly expanding skills and collaborating effectively with creative teams.',
} as const;

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/devlargs', handle: '@devlargs' },
  { label: 'LinkedIn', href: '', handle: '' },
];

export const ACTIVE_SOCIALS = SOCIALS.filter((s) => Boolean(s.href));

export const SECTIONS = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'work', label: 'Work', index: '02' },
  { id: 'capabilities', label: 'Capabilities', index: '03' },
  { id: 'recommendations', label: 'Recommendations', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
] as const;

export type NavLinkItem = {
  href: string;
  label: string;
};

export const NAV_LINKS: readonly NavLinkItem[] = [
  { href: '/work', label: 'Work' },
  { href: '/learnings', label: 'Learnings' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];
