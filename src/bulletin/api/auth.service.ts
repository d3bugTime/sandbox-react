import axios from 'axios';

// Type Definitions
// Enums from the backend
export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export enum UserStatus {
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    BANNED = 'banned',
}

// 1. Define the shape of the data for the Login call
interface LoginCredentials {
    email: string;
    password: string;
}

// 2. Define the shape of User object
export interface AuthenticatedUser {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: UserStatus;
}

// 3. Define the shape of the successful response
interface AuthResponse {
    token: string;
    user: AuthenticatedUser;
}

// !IMPORTANT: Review the login path, it must match Backend/Frontend
const API_URL = 'http://localhost:3000/api/users';

export const AuthService = {
    login: async ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
        try {
            // POST request to the backend's login endpoint
            const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
                email,
                password,
            });

            // On successful login, save the JWT token
            localStorage.setItem('authToken', response.data.token);

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Assume that the backend sends a 'message' property on error
                throw new Error(error.response.data.message || 'Login failed. Check credentials.');
            }
            throw new Error('An unexpected network error occurred.');
        }
    },

    logout: () => {
        // Clear token and signal logout
        localStorage.removeItem('authToken');
    },

    getToken: (): string | null => {
       return localStorage.getItem('authToken');
    },

    verifyToken: async (): Promise<AuthenticatedUser> => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get<AuthenticatedUser>(`${API_URL}/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            localStorage.removeItem('authToken');
            throw new Error('Token validation failed');
        }
    }
};