const TIMEOUT_MS = 6000;

const fetchWithTimeout = async (url: string, method: 'HEAD' | 'GET'): Promise<Response> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (portfolio-link-check)' },
    });
  } finally {
    clearTimeout(timer);
  }
};

export const checkLink = async (rawUrl: string): Promise<boolean> => {
  const url = rawUrl.trim();
  try {
    const head = await fetchWithTimeout(url, 'HEAD');
    if (head.ok || (head.status >= 300 && head.status < 400)) return true;
    if (head.status === 405 || head.status === 403) {
      const get = await fetchWithTimeout(url, 'GET');
      return get.ok;
    }
    return false;
  } catch {
    try {
      const get = await fetchWithTimeout(url, 'GET');
      return get.ok;
    } catch {
      return false;
    }
  }
};
