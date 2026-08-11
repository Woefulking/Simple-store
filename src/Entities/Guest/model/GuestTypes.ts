import type { CartItemType } from 'Entities/Cart';
import type { Product } from 'Entities/Product';

export interface Guest {
  cart: CartItemType[];
  favorites: Product[];
}
