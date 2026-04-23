export interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ActivityData {
  total: number;
  contributions: Contribution[];
}
