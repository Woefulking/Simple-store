import { CartItemType } from 'entities/Cart';
import { Product } from 'entities/Product';

export interface Guest {
  cart: CartItemType[];
  favorites: Product[];
}
