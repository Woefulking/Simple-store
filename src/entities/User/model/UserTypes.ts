import { CartItemType } from 'entities/Cart';
import { Order } from 'entities/Order';
import { Product } from 'entities/Product';

export const userFields = [
  { name: 'name', label: 'Имя' },
  { name: 'secondName', label: 'Фамилия' },
  { name: 'email', label: 'Email' },
] as const;

export interface User {
  login: string;
  password: string;
  email: string;

  name: string;
  secondName: string;
  avatar?: string;
  avatarColor?: string;

  cart: CartItemType[];
  favorites: Product[];
  orders: Order[];
}

export type UserAction =
  | { type: 'login'; payload: User }
  | { type: 'logout' }
  | { type: 'create'; payload: User }
  | { type: 'update'; payload: Partial<User> }
  | { type: 'delete'; payload: { login: string } }
  | { type: 'createOrder'; payload: Order };

export type UserActions = {
  dispatch: (action: UserAction) => void;
};

export interface UserState {
  user: User | null;
  isAuth: boolean;
}
