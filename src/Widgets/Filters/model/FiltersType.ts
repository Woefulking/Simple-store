import { Product } from 'entities/Product';
import { CategoryItem, CategoryType } from 'Shared/constants/categories';
import { FilterItem, FilterType } from 'Shared/constants/filters';

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
