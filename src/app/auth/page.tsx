'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
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
        <div className={styles.authPage}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2>Login to Your Account</h2>
                <Input
                    label="Phone Number"
                    placeholder="مثلاً 09123456789"
                    {...register('phone')}
                    error={errors.phone?.message}
                />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}