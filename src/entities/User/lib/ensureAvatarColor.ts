import { getRandomColor } from 'Shared/lib/getRandomColor';
import { User } from '..';

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
