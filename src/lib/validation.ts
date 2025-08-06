import { z } from 'zod';

export const loginSchema = z.object({
    phone: z
        .string()
        .min(11, 'Phone number must be exactly 11 digits')
        .max(11, 'Phone number cannot exceed 11 digits')
        .regex(/^09\d{9}$/, 'Phone number must start with 09 and contain only digits (e.g., 09123456789)'),
});