import { ActivityData, Contribution } from '@components/Activity/types';

const TIMEOUT_MS = 6000;

interface ApiResponse {
  total?: Record<string, number>;
  contributions?: Contribution[];
}

const fetchYear = async (username: string, year: number | 'last'): Promise<ActivityData | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (portfolio-build)' },
    });
    if (!res.ok) return null;

    const data: ApiResponse = await res.json();
    const contributions = data.contributions ?? [];
    if (contributions.length === 0) return null;

    const total = Object.values(data.total ?? {}).reduce((sum, n) => sum + n, 0);
    return { total, contributions };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

export interface YearlyActivity {
  years: number[];
  byYear: Record<number, ActivityData>;
}

export const fetchGithubActivity = async (username: string): Promise<YearlyActivity | null> => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

  const results = await Promise.all(years.map((y) => fetchYear(username, y).then((data) => ({ y, data }))));
  const byYear: Record<number, ActivityData> = {};
  const availableYears: number[] = [];

  results.forEach(({ y, data }) => {
    if (data && data.contributions.length > 0) {
      byYear[y] = data;
      availableYears.push(y);
    }
  });

  if (availableYears.length === 0) return null;
  return { years: availableYears, byYear };
};
