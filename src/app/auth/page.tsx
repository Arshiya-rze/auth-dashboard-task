'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

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
        console.log(data);
        const user = {
            name: data.results[0].name.first,
            email: data.results[0].email,
        };
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        router.push('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input label="Phone Number" {...register('phone')} error={errors.phone?.message} />
            <Button type="submit">Login</Button>
        </form>
    );
}