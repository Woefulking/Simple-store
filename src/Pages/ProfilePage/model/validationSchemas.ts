import z from 'zod';

export const emailSchema = z.object({
  email: z.email('Invalid email').min(1, 'Email is required'),
});
