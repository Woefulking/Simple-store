import { User } from 'entities/User';
import { getFromStorage, removeFromStorage, saveToStorage } from './storage';

export function setCurrentUser(login: string) {
  saveToStorage('currentUser', login);
}

export function removeCurrentUser() {
  removeFromStorage('currentUser');
}

export function getCurrentUser(): User | null {
  const login = getFromStorage<string>('currentUser');
  if (!login) return null;

  const user = getFromStorage<User>(login);
  return user;
}
