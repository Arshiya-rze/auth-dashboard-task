import { z } from 'zod';

export const loginSchema = z.object({
    phone: z
        .string()
        .regex(/^09\d{9}$/, 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد'),
});