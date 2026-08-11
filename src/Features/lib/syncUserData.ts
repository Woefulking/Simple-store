import type { CartItemType } from 'Entities/Cart';
import type { Product } from 'Entities/Product';
import { useUserStore } from 'Entities/User';
import { saveToStorage } from 'App/storage/storage';

export function syncUserData(cart: CartItemType[], favorites: Product[]) {
  const user = useUserStore.getState().user;

  if (user) {
    useUserStore.getState().dispatch({
      type: 'update',
      payload: { cart, favorites },
    });
  } else {
    saveToStorage('guest', { cart, favorites });
  }
}
