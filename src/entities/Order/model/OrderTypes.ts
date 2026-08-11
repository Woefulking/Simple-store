import type { CartItemType } from 'Entities/Cart';

export interface Order {
  id: string;
  items: CartItemType[];
  createAt: number;
}
