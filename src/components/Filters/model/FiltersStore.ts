import { categories } from 'constants/categories';
import { filters } from 'constants/filters';
import { create } from 'zustand/react';
import { FiltersAction, FiltersActions, FiltersState } from './FiltersType';
import { applyFilters } from './FiltersHelpers';

function filterReducer(state: FiltersState, action: FiltersAction): FiltersState {
  switch (action.type) {
    case 'init': {
      const nextState = {
        ...state,
        all: action.payload,
      };

      return {
        ...nextState,
        filtered: applyFilters(nextState),
      };
    }

    //Поиск по названию
    case 'search': {
      const search = action.payload.trim().toLowerCase();

      const nextState = {
        ...state,
        search,
      };

      return {
        ...nextState,
        filtered: applyFilters(nextState),
      };
    }

    //Категории
    case 'all':
    case 'men':
    case 'women':
    case 'jewelery':
    case 'electronics': {
      const currentCategory = categories.find((category) => category.type === action.type)!;
      const nextState = {
        ...state,
        currentCategory,
      };

      return {
        ...nextState,
        filtered: applyFilters(nextState),
      };
    }

    //Фильтры
    case 'low_price':
    case 'high_price':
    case 'count':
    case 'rate': {
      const currentFilter = filters.find((filter) => filter.type === action.type)!;

      const nextState = {
        ...state,
        currentFilter,
      };

      return {
        ...nextState,
        filtered: applyFilters(nextState),
      };
    }

    default: {
      return state;
    }
  }
}

const initialFilter = filters.find((filter) => filter.type === 'rate')!;
const initialCategory = categories.find((category) => category.type === 'all')!;

export const useFilterStore = create<FiltersState & FiltersActions>((set) => ({
  all: [],
  filtered: [],
  currentFilter: initialFilter,
  currentCategory: initialCategory,
  search: '',
  dispatch: (action: FiltersAction) => set((state) => filterReducer(state, action)),
}));
