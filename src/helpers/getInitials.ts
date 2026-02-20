import { User } from 'entities/User/UserTypes';

export function getInitials(user: User | null) {
  if (!user) return '';
  return (user.name[0] || '') + (user.secondName[0] || '');
}
