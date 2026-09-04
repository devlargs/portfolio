import { GoogleAnalytics } from '@next/third-parties/google';
import { ACTIVE_SOCIALS, PROFILE, SITE_URL } from '@constants/profile';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from '@constants/skills';
import type { Metadata, Viewport } from 'next';
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import './tokens.css';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const title = `${PROFILE.name} · ${PROFILE.role}`;
const description = PROFILE.summary;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${PROFILE.name}`,
  },
  description,
  applicationName: `${PROFILE.name} Portfolio`,
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'profile',
    siteName: `${PROFILE.name} Portfolio`,
    title,
    description,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  icons: { shortcut: '/favicon.ico' },
  /* Server-read, so the token never reaches the client bundle. Absent in dev
     and in any deploy that has not set it, which Next renders as no tag. */
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

/* Dark is the default and the system preference is not consulted, so the
   browser chrome is a single literal rather than a media-keyed pair. Satori
   and this entry both duplicate the palette by hand: see app/tokens.css. */
export const viewport: Viewport = {
  themeColor: '#0d1013',
  colorScheme: 'dark light',
};

/* Person + WebSite graph. `sameAs` only carries links that are actually filled
   in, so an unset social never ships as an empty string. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: PROFILE.name,
      url: SITE_URL,
      jobTitle: PROFILE.role,
      description,
      image: `${SITE_URL}/images/linkedin/ralph.jpg`,
      knowsAbout: [...PRIMARY_SKILLS, ...SECONDARY_SKILLS],
      ...(ACTIVE_SOCIALS.length > 0 ? { sameAs: ACTIVE_SOCIALS.map((s) => s.href) } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${PROFILE.name} Portfolio`,
      description,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: title,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

/* Runs before first paint so a reader who chose light never sees a dark flash. */
const THEME_INIT = `(function(){try{var m=localStorage.getItem('rl-theme');if(m==='dark'||m==='light'){document.documentElement.setAttribute('data-theme',m);}}catch(e){}})();`;

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </head>
    <body>{children}</body>
    {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
  </html>
);

export default RootLayout;
