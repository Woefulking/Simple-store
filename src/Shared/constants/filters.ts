export const filters = [
  { type: 'low_price', value: 'Price: Low to High' },
  { type: 'high_price', value: 'Price: High to Low' },
  { type: 'count', value: 'Most Reviews' },
  { type: 'rate', value: 'Top Rated' },
] as const;

export type FilterItem = (typeof filters)[number];
export type FilterType = (typeof filters)[number]['type'];
export type FilterValue = (typeof filters)[number]['value'];
