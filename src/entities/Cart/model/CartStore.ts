import { create } from 'zustand/react';
import { CartAction, CartActions, CartItemType, CartState } from './CartTypes';
import { User } from 'entities/User';
import { ensureGuestExsist } from 'entities/Guest';
import { useFavoritesStore } from 'entities/Favorites';
import { syncUserData } from 'Features/lib/syncUserData';

export function updateItemCount(items: CartItemType[], id: number, value: number): CartItemType[] {
  const target = items.find((item) => item.id === id);
  if (!target) return items;

  if (target.count + value <= 0) {
    return items.filter((item) => item.id !== target.id);
  }

  return items.map((item) => {
    if (item.id === target.id) {
      return {
        ...item,
        count: item.count + value,
      };
    } else {
      return item;
    }
  });
}

export function initCart(user: User | null) {
  if (user) {
    return user.cart ?? [];
  }

  const guest = ensureGuestExsist();
  return guest.cart;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const product = action.payload;
      const existedItem = state.items.find((item) => item.id === product.id);

      if (existedItem) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                count: item.count + 1,
              };
            } else {
              return item;
            }
          }),
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            {
              ...product,
              count: 1,
            },
          ],
        };
      }
    }
    case 'remove': {
      const productId = action.payload;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId),
      };
    }
    case 'increase': {
      const id = action.payload;

      return {
        ...state,
        items: updateItemCount(state.items, id, 1),
      };
    }
    case 'decrease': {
      const id = action.payload;

      return {
        ...state,
        items: updateItemCount(state.items, id, -1),
      };
    }
    case 'clear': {
      return {
        ...state,
        items: [],
      };
    }
    default: {
      return state;
    }
  }
}

export const useCartStore = create<CartState & CartActions>((set) => ({
  items: [],
  dispatch: (action: CartAction) =>
    set((state) => {
      const newState = cartReducer(state, action);

      const favorites = useFavoritesStore.getState().items;
      syncUserData(newState.items, favorites);
      return newState;
    }),
  init: (user: User | null) => set({ items: initCart(user) }),
}));
