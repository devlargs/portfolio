import Colophon from '@components/Colophon';
import Masthead from '@components/Masthead';
import ScrollTop from '@components/ScrollTop';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
  year: number;
  rail?: ReactNode;
  readingProgress?: boolean;
}

const PageShell: FC<PropsWithChildren<Props>> = ({ year, rail, readingProgress, children }) => (
  <>
    <Masthead readingProgress={readingProgress} />
    {rail}

    <main id="content">{children}</main>

    <Colophon year={year} />
    <ScrollTop />
  </>
);

export default PageShell;
