import { Guest } from 'entities/Guest/GuestTypes';
import { User } from 'entities/User/UserTypes';
import { getFromStorage } from 'storage/storage';
import { updateUser } from 'storage/userStorage';

export function mergeGuestWithUser(user: User): User {
  const guest = getFromStorage<Guest>('guest');

  if (!guest) return user;

  const mergedCart = mergeDataById(guest.cart, user.cart, (target, source) => {
    target.count += source.count;
  });
  const mergedFavorites = mergeDataById(guest.favorites, user.favorites);

  const mergedUser = { ...user, cart: mergedCart, favorites: mergedFavorites };

  updateUser(mergedUser);

  localStorage.removeItem('guest');

  return mergedUser;
}

function mergeDataById<T extends { id: number }>(
  guestData: T[],
  userData: T[],
  mergeStrategy?: (target: T, source: T) => void
): T[] {
  const result = [...userData];

  for (const guestItem of guestData) {
    const existed = result.find((item) => item.id === guestItem.id);

    if (existed) {
      if (mergeStrategy) {
        mergeStrategy(existed, guestItem);
      }
    } else {
      result.push({ ...guestItem });
    }
  }

  return result;
}
