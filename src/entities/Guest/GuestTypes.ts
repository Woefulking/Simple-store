import { CartItemType } from 'entities/Cart/CartTypes';
import { Product } from 'entities/Product/ProductTypes';

export interface Guest {
  cart: CartItemType[];
  favorites: Product[];
}
