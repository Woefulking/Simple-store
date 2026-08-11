import { getFromStorage, saveToStorage } from 'app/storage/storage';
import type { Guest } from './GuestTypes';

export function ensureGuestExsist(): Guest {
  const guest = getFromStorage<Guest>('guest');

  if (guest) return guest;

  const newGuest: Guest = {
    cart: [],
    favorites: [],
  };

  saveToStorage('guest', newGuest);
  return newGuest;
}
