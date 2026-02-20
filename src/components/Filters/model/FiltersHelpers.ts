import { CategoryType } from 'constants/categories';
import { FilterType } from 'constants/filters';
import { Product } from 'entities/Product/ProductTypes';
import { FiltersState } from './FiltersType';

function applyCategory(products: Product[], category: CategoryType) {
  switch (category) {
    case 'all': {
      return products;
    }
    case 'men': {
      return products.filter((product) => product.category === "men's clothing");
    }
    case 'women': {
      return products.filter((product) => product.category === "women's clothing");
    }
    case 'electronics': {
      return products.filter((product) => product.category === 'electronics');
    }
    case 'jewelery': {
      return products.filter((product) => product.category === 'jewelery');
    }
    default: {
      return products;
    }
  }
}

function applySort(products: Product[], filter: FilterType) {
  switch (filter) {
    case 'low_price': {
      return [...products].sort((a, b) => a.price - b.price);
    }
    case 'high_price': {
      return [...products].sort((a, b) => b.price - a.price);
    }
    case 'count': {
      return [...products].sort((a, b) => b.rating.count - a.rating.count);
    }
    case 'rate': {
      return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
    }
    default: {
      return products;
    }
  }
}

function applySearch(products: Product[], searchValue: string) {
  if (!searchValue) return products;
  return products.filter((product) => product.title.toLowerCase().includes(searchValue));
}

export function applyFilters(state: FiltersState) {
  const categorized = applyCategory(state.all, state.currentCategory.type);
  const sorted = applySort(categorized, state.currentFilter.type);
  const searched = applySearch(sorted, state.search);

  return searched;
}
