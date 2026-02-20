import z from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'Логин обязателен').max(10, 'Максимум 10 символов'),
  password: z.string().min(3, 'Минимум 3 символа').max(10, 'Максимум 10 символов'),
});

export const registerSchema = z
  .object({
    login: z.string().min(1, 'Логин обязателен').max(10, 'Максимум 10 символов'),
    password: z.string().min(3, 'Минимум 3 символа').max(10, 'Максимум 10 символов'),
    confirm: z.string().min(1, 'Подтвердите пароль'),
    email: z.email('Некорректный email').min(1, 'Email обязателен'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Пароли не совпадают',
    path: ['confirm'],
  });
