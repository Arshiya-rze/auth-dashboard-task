'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.scss';

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/auth');
        }
    }, [user]);

    if (!user) return null;

    return (
        <div className={styles.dashboard}>
            <div className={styles.card}>
                <img src={user.picture} alt="User" className={styles.avatar} />
                <h2>{user.name}</h2>
                <p className={styles.email}>{user.email}</p>
                <div className={styles.info}>
                    <p><strong>📍 Location:</strong> {user.location}</p>
                    <p><strong>🎂 Age:</strong> {user.age}</p>
                    <p><strong>📱 Phone:</strong> {user.phone}</p>
                    <p><strong>🆔 Username:</strong> {user.username}</p>
                </div>
            </div>
        </div>
    );
}