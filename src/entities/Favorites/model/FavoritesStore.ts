import { create } from 'zustand';
import { FavoritesAction, FavoritesActions, FavoritesState } from './FavoritesTypes';
import { getFromStorage } from 'app/storage/storage';
import { User } from 'entities/User';
import { Guest } from 'entities/Guest';
import { useCartStore } from 'entities/Cart';
import { syncUserData } from 'Features/lib/syncUserData';

export function initFavorites(user: User | null) {
  if (user) {
    return user.favorites ?? [];
  }

  const guest = getFromStorage<Guest>('guest');
  return guest?.favorites ?? [];
}

function favoriteReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'add': {
      const product = action.payload;
      const existedItem = state.items.find((item) => item.id === product.id);

      if (!existedItem) {
        return {
          ...state,
          items: [...state.items, product],
        };
      }

      return state;
    }
    case 'remove': {
      const productId = action.payload;

      return {
        items: state.items.filter((item) => item.id !== productId),
      };
    }
    case 'clear': {
      return {
        items: [],
      };
    }
    default: {
      return state;
    }
  }
}

export const useFavoritesStore = create<FavoritesState & FavoritesActions>((set) => ({
  items: [],
  dispatch: (action: FavoritesAction) =>
    set((state) => {
      const newState = favoriteReducer(state, action);

      const cart = useCartStore.getState().items;
      syncUserData(cart, newState.items);
      return newState;
    }),
  init: (user: User | null) => set({ items: initFavorites(user) }),
}));
