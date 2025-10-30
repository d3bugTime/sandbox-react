"use client";

import React, {createContext, ReactNode, useContext, useState, useEffect } from "react";
import {AuthenticatedUser, AuthService, UserRole, UserStatus} from "@/bulletin/api/auth.service";

// Define the shape of the authenticated user
interface AuthContextType {
    user: AuthenticatedUser | null;
    isAuthenticated: boolean;

    // login function accepts the standard credentials
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;

    // Utility properties for common checks
    isAdmin: boolean;
    isBanned: boolean;
}

// Initialize Context with default (null) values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the shape of the Provider props
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [loading, setLoading] = useState(true); // Loading state

    const isAuthenticated = !!user;

    // Derived state based on the User entity data
    const isAdmin = user?.role === UserRole.ADMIN;
    const isBanned = user?.status === UserStatus.BANNED;

    // Check if user is already logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if there's a stored token and validate it
                const token = localStorage.getItem('authToken');

                if (token) {
                    // Method to verify/refresh the token
                    const userData = await AuthService.verifyToken();
                    setUser(userData);
                }

            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('authToken');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Function to handle login process
    const login = async (email: string, password: string) => {
        // authService.login returns { token, user }
        const { token, user: userData } = await AuthService.login({ email, password });

        // Store token for persistence
        localStorage.setItem('authToken', token);
        setUser(userData);
    };

    // Function to handle logout process
    const logout = () => {
        AuthService.logout();
        localStorage.removeItem('authToken');
        setUser(null);
    }

    // Show loading while checking authentication
    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            isAdmin,
            isBanned,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for easy consumption (useAuth)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}