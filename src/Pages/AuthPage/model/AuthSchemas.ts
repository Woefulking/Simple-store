import z from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'Login is required').max(10, 'Maximum 10 characters'),
  password: z.string().min(3, 'Minimum 3 characters').max(10, 'Maximum 10 characters'),
});

export const registerSchema = z
  .object({
    login: z.string().min(1, 'Login is required').max(10, 'Maximum 10 characters'),
    password: z.string().min(3, 'Minimum 3 characters').max(10, 'Maximum 10 characters'),
    confirm: z.string().min(1, 'Confirm your password'),
    email: z.email('Invalid email').min(1, 'Email is required'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });
