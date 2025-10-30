"use client";

import React, { useState } from "react";
import { useAuth } from "@/bulletin/context/auth.context";

interface LoginFormProps {
    onSuccess: () => void; // Callback to handle post-login navigation
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!email || !password) {
            setError('Please fill in both fields.');
            setLoading(false);
            return;
        }

        try {
            await login(email, password);
            // If login successful, call the success callback
            onSuccess();
        } catch (err) {
            // Type guard to check if it's an Error object
            setError(
                err instanceof Error
                ? err.message
                    : 'Login failed. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}
              style={{
                  maxWidth: '400px',
                  margin: 'auto',
                  padding: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
              }}>
            <h2 style={{ textAlign: 'center' }}>User Login</h2>

            {error && <p style={{
                color: 'white',
                backgroundColor: '#f44336',
                padding: '10px',
                borderRadius: '4px'
            }}>{error}</p>}

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="email" style={{
                    display: 'block',
                    marginBottom: '5px'
                }}>Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="password" style={{
                    display: 'block',
                    marginBottom: '5px'
                }}>Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <button type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: "none",
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                {loading ? 'Logging in ...' : 'Log In'}
            </button>
        </form>
    );
};

export default LoginForm;