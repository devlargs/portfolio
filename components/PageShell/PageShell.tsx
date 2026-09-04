import Colophon from '@components/Colophon';
import Masthead from '@components/Masthead';
import ScrollTop from '@components/ScrollTop';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
  /** Passed from the server so the footer year never hydrates differently. */
  year: number;
  /** Fixed-position document index. Only the home page long enough to need one. */
  rail?: ReactNode;
  /** Reading bar on the masthead hairline. Long-form documents only. */
  readingProgress?: boolean;
}

/** Masthead, main, colophon. Every document on the site wears it. */
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
