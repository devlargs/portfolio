'use client';

import { ANALYTICS_OPT_OUT_COOKIE, isLocalHostname } from '@constants/analytics';
import { GoogleAnalytics } from '@next/third-parties/google';
import { FC, useEffect, useState } from 'react';

interface Props {
  gaId: string;
}

const Analytics: FC<Props> = ({ gaId }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const optedOut = document.cookie.split('; ').some((pair) => pair.startsWith(`${ANALYTICS_OPT_OUT_COOKIE}=`));
    setEnabled(!optedOut && !isLocalHostname(window.location.hostname));
  }, []);

  return enabled ? <GoogleAnalytics gaId={gaId} /> : null;
};

export default Analytics;
