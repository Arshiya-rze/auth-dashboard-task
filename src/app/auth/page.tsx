'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './AuthPage.module.scss';

type LoginForm = z.infer<typeof loginSchema>;

export default function AuthPage() {
    const { setUser } = useAuth();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

    const onSubmit = async () => {
        const res = await fetch('https://randomuser.me/api/?results=1&nat=us');
        const data = await res.json();

        const result = data.results[0];
        const user = {
            name: `${result.name.first} ${result.name.last}`,
            email: result.email,
            picture: result.picture.large,
            location: `${result.location.city}, ${result.location.state}, ${result.location.country}`,
            age: result.dob.age,
            phone: result.cell,
            username: result.login.username,
        };

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        router.push('/dashboard');
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.subscribe}>
                <p>Login To Your Account</p>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        inputMode="numeric"
                        className={styles.input}
                        maxLength={11}
                        {...register('phone')}
                        onKeyDown={(e) => {
                            const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
                            if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />

                    <label className={styles.label}>Phone Number (e.g. 09123456789)</label>
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>

                <button type="submit" className={styles.submitBtn}>
                    LOGIN
                </button>
            </form>
        </div>
    );
}