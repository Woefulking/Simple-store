export const categories = [
  { type: 'all', label: 'Все товары' },
  { type: 'men', label: 'Мужская одежда' },
  { type: 'women', label: 'Женская одежда' },
  { type: 'jewelery', label: 'Украшения' },
  { type: 'electronics', label: 'Электроника' },
] as const;

export type CategoryItem = (typeof categories)[number];
export type CategoryType = (typeof categories)[number]['type'];
