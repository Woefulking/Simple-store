import z from 'zod';

export const passwordSchema = z
  .object({
    password: z.string().min(3, 'Minimum 3 characters').max(10, 'Maximum 10 characters'),
    confirm: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });
