export function getFromStorage<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  return JSON.parse(raw) as T;
}

export function saveToStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeFromStorage(key: string) {
  localStorage.removeItem(key);
}
