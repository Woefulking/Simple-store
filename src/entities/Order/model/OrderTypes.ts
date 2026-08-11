import type { CartItemType } from 'src/Entities/Cart';

export interface Order {
  id: string;
  items: CartItemType[];
  createAt: number;
}
