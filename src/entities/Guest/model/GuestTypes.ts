import type { CartItemType } from 'src/Entities/Cart';
import type { Product } from 'src/Entities/Product';

export interface Guest {
  cart: CartItemType[];
  favorites: Product[];
}
