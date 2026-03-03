import { User } from '..';

export function getInitials(user: User | null) {
  if (!user) return '';
  return (user.name[0] || '') + (user.secondName[0] || '');
}
