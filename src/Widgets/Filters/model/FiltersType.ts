import type { Product } from 'entities/Product';
import type { CategoryItem, CategoryType } from 'shared/constants/categories';
import type { FilterItem, FilterType } from 'shared/constants/filters';

export type FiltersAction =
  | { type: 'init'; payload: Product[] }
  | { type: 'search'; payload: string }
  | { type: CategoryType }
  | { type: FilterType };

export type FiltersActions = {
  dispatch: (action: FiltersAction) => void;
};

export interface FiltersState {
  all: Product[];
  filtered: Product[];
  currentFilter: FilterItem;
  currentCategory: CategoryItem;
  search: string;
}
