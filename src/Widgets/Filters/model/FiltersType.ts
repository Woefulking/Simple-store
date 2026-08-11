import type { Product } from 'src/Entities/Product';
import type { CategoryItem, CategoryType } from 'src/Shared/constants/categories';
import type { FilterItem, FilterType } from 'src/Shared/constants/filters';

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
