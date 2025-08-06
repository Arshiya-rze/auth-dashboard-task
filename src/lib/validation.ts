import { z } from 'zod';

export const loginSchema = z.object({
    phone: z
        .string()
        .min(11, 'شماره باید دقیقاً ۱۱ رقم باشد')
        .max(11, 'شماره نباید بیشتر از ۱۱ رقم باشد')
        .regex(/^09\d{9}$/, 'شماره باید با ۰۹ شروع شود و فقط شامل ارقام باشد (مثلاً 09123456789)'),
});