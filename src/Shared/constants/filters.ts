export const filters = [
  { type: 'low_price', value: 'Сначала недорогие' },
  { type: 'high_price', value: 'Сначала дорогие' },
  { type: 'count', value: 'По количеству отзывов' },
  { type: 'rate', value: 'Сначала с лучшей оценкой' },
] as const;

export type FilterItem = (typeof filters)[number];
export type FilterType = (typeof filters)[number]['type'];
export type FilterValue = (typeof filters)[number]['value'];
