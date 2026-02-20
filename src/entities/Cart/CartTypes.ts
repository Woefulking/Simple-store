import { Product } from 'entities/Product/ProductTypes';
import { User } from 'entities/User/UserTypes';

export interface CartItemType extends Product {
  count: number;
}

export type CartAction =
  | { type: 'add'; payload: Product }
  | { type: 'remove'; payload: number }
  | { type: 'increase'; payload: number }
  | { type: 'decrease'; payload: number }
  | { type: 'clear' };

export type CartActions = {
  dispatch: (action: CartAction) => void;
  init: (user: User | null) => void;
};

export interface CartState {
  items: CartItemType[] | [];
}
