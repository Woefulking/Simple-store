import { CartItemType } from 'entities/Cart/CartTypes';
import { Product } from 'entities/Product/ProductTypes';
import { useUserStore } from 'entities/User/UserStore';
import { saveToStorage } from 'storage/storage';

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
