import type { CartItemType } from 'src/Entities/Cart';
import type { Product } from 'src/Entities/Product';
import { useUserStore } from 'src/Entities/User';
import { saveToStorage } from 'src/App/storage/storage';

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
