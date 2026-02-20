import { User } from 'entities/User/UserTypes';
import { getRandomColor } from './getRandomColor';

export function ensureAvatarColor(user: User): User {
  const hasInitials = user?.name || user?.secondName;

  if (!hasInitials) {
    return { ...user, avatarColor: undefined };
  }

  if (!user.avatarColor) {
    return { ...user, avatarColor: getRandomColor() };
  }

  return user;
}
