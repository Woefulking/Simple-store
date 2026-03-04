export const categories = [
  { type: 'all', label: 'All' },
  { type: 'men', label: `Men's clothing` },
  { type: 'women', label: `Women's clothing` },
  { type: 'jewelery', label: 'Jewelery' },
  { type: 'electronics', label: 'Electronics' },
] as const;

export type CategoryItem = (typeof categories)[number];
export type CategoryType = (typeof categories)[number]['type'];
