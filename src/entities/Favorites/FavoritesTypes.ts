import { Product } from 'entities/Product/ProductTypes';
import { User } from 'entities/User/UserTypes';

export type FavoritesAction =
  | { type: 'add'; payload: Product }
  | { type: 'remove'; payload: number }
  | { type: 'clear' };

export type FavoritesActions = {
  dispatch: (action: FavoritesAction) => void;
  init: (user: User | null) => void;
};

export interface FavoritesState {
  items: Product[];
}
