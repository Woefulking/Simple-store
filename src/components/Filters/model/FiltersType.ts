import { CategoryItem, CategoryType } from 'constants/categories';
import { FilterItem, FilterType } from 'constants/filters';
import { Product } from 'entities/Product/ProductTypes';

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
