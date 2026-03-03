import { CartItemType } from 'entities/Cart';
import { Product } from 'entities/Product';
import { useUserStore } from 'entities/User';
import { saveToStorage } from 'app/storage/storage';

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
