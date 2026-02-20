import z from 'zod';

export const emailSchema = z.object({
  email: z.email('Некорректный email').min(1, 'Email обязателен'),
});

export const passwordSchema = z
  .object({
    password: z.string().min(3, 'Минимум 3 символа').max(10, 'Максимум 10 символов'),
    confirm: z.string().min(1, 'Подтвердите пароль'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'],
  });
