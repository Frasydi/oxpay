import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import authService from '~/services/AuthService';

interface User {
    id: number;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    socialLogin: (loginMethod: () => Promise<any>) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Public routes that don't require authentication
    const publicRoutes = ['/login', '/signup'];

    // Routes that require authentication
    const protectedRoutes = ['/dashboard', '/verify-email', '/activate-2fa', '/activate-mfa', '/otp-mfa'];

    const checkAuth = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('authToken');
            const userData = localStorage.getItem('user');

            if (token && userData) {
                // Validate token
                const isValid = await authService.validateToken(token);
                if (isValid) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    setIsAuthenticated(true);
                    return true; // Return auth status
                } else {
                    // Token is invalid, clear storage
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    setUser(null);
                    setIsAuthenticated(false);
                    return false;
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
                return false;
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            // Clear invalid auth data
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login(email, password);
            
            if (response.success && response.user && response.token) {
                setUser(response.user);
                setIsAuthenticated(true);
                // Redirect to dashboard after successful login
                navigate('/dashboard');
            }
        } catch (error: any) {
            throw new Error(error.message || 'Login failed');
        }
    };

    const socialLogin = async (loginMethod: () => Promise<any>) => {
        try {
            const response = await loginMethod();
            if (response.success && response.user && response.token) {
                setUser(response.user);
                setIsAuthenticated(true);
                // Redirect to dashboard after successful social login
                navigate('/dashboard');
            }
        } catch (error: any) {
            throw new Error(error.message || 'Social login failed');
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    // Initial auth check and redirect only on app start
    useEffect(() => {
        const performInitialCheck = async () => {
            const authStatus = await checkAuth();
            
            // Only redirect on initial load, not on page changes
            const currentPath = location.pathname;
            
            if (authStatus) {
                // User is authenticated
                if (publicRoutes.includes(currentPath)) {
                    // Redirect authenticated users away from auth pages
                    navigate('/dashboard');
                } else if (currentPath === '/') {
                    // Redirect authenticated users from home to dashboard
                    navigate('/dashboard');
                }
            } else {
                // User is not authenticated
                if (protectedRoutes.includes(currentPath)) {
                    // Redirect unauthenticated users to login
                    navigate('/login');
                } else if( currentPath === '/') {
                    // Redirect unauthenticated users from home to login
                    navigate('/login');
                }
            }
        };
        
        performInitialCheck();
    }, []); // Only run once on mount

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        socialLogin,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
