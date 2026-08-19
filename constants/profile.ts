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
  /* The <h1>. 6 words, 44 chars — inside the --text-display bracket. */
  statement: 'I build web software that feels obvious.',
  summary:
    'Passionate developer experienced in building clean and intuitive web applications with ReactJS, NodeJS and TypeScript, dedicated to constantly expanding skills and collaborating effectively with creative teams.',
} as const;

/**
 * TODO(ralph): fill these in. Anything left as an empty string is filtered out
 * of both the colophon and the `sameAs` array in the Person JSON-LD, so an
 * unfilled entry degrades quietly rather than shipping a dead link.
 */
export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: '', handle: '' },
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

/** The masthead carries destinations, not a table of contents. */
export const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;
