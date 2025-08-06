'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export interface User {
    name: string;
    email: string;
}

const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
}>({ user: null, setUser: () => { } });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);