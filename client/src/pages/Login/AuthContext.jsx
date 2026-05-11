import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
    };

    const updateUser = (data) => setUser(prev => ({ ...prev, ...data }));

    const isAdmin = () => user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return { user: null, login: null, logout: null, updateUser: null, isAdmin: () => false };
    }
    return context;
};