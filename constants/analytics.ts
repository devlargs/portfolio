export const ANALYTICS_OPT_OUT_COOKIE = 'rl-analytics-opt-out';

const LOCAL_HOSTNAME =
  /^(?:localhost|\[::1\]|127(?:\.\d{1,3}){3}|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})$/;

export const isLocalHostname = (hostname: string): boolean => LOCAL_HOSTNAME.test(hostname);

export const isExcludedIp = (ip: string, list: string): boolean =>
  list
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .some((entry) => (entry.endsWith('*') ? ip.startsWith(entry.slice(0, -1)) : ip === entry));
