import z from 'zod';

export const emailSchema = z.object({
  email: z.email('Некорректный email').min(1, 'Email обязателен'),
});
