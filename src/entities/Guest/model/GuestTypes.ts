import type { CartItemType } from 'entities/Cart';
import type { Product } from 'entities/Product';

export interface Guest {
  cart: CartItemType[];
  favorites: Product[];
}
