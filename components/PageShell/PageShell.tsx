import { Box } from '@chakra-ui/react';
import Colophon from '@components/Colophon';
import Masthead from '@components/Masthead';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
  /** Passed from the server so the footer year never hydrates differently. */
  year: number;
  /** Fixed-position document index. Only the home page long enough to need one. */
  rail?: ReactNode;
}

/** Masthead, main, colophon. Every document on the site wears it. */
const PageShell: FC<PropsWithChildren<Props>> = ({ year, rail, children }) => (
  <>
    <Masthead />
    {rail}

    <Box as="main" id="content">
      {children}
    </Box>

    <Colophon year={year} />
  </>
);

export default PageShell;
