import type { Metadata } from 'next';
import { Fira_Sans, Montserrat } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';
import Providers from './providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const firaSans = Fira_Sans({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-fira',
});

const description =
  'Passionate developer experienced in building clean and intuitive web applications with ReactJS, NodeJS & Typescript, dedicated to constantly expanding skills and collaborating effectively with creative teams.';

export const metadata: Metadata = {
  title: 'Ralph Largo | Portfolio Website',
  description,
  openGraph: {
    title: description,
    description,
    url: 'https://ralphlargo.com/',
    type: 'website',
  },
  icons: { shortcut: '/favicon.ico' },
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className={`${montserrat.variable} ${firaSans.variable}`}>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
