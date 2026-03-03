import { User } from 'entities/User';
import { getFromStorage, removeFromStorage, saveToStorage } from './storage';

export function checkUserExist(login: string): boolean {
  return !!getFromStorage<string>(login);
}

export function createUser(user: User) {
  saveToStorage(user.login, user);
}

export function updateUser(user: User) {
  saveToStorage(user.login, user);
}

export function getUser(login: string, password: string): User | null {
  const user = getFromStorage<User>(login);

  if (!user) return null;
  if (user.password !== password) return null;

  return user;
}

export function deleteUserFromLocalStorage(login: string) {
  removeFromStorage(login);
}
