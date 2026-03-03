import { CartItemType } from 'entities/Cart';

export interface Order {
  id: string;
  items: CartItemType[];
  createAt: number;
}
