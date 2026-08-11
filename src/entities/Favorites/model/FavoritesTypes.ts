import type { Product } from 'src/Entities/Product';
import type { User } from 'src/Entities/User';

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
