import { CartItemType } from 'entities/Cart/CartTypes';

export interface Order {
  id: string;
  items: CartItemType[];
  createAt: string;
}
