export const keyBy = (array: any[], key: string) =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});
