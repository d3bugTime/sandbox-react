"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/bulletin/components/login.form";
import { useAuth } from "@/bulletin/context/auth.context";

export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/game');
        }
    }, [isAuthenticated, router]);

    const handleLoginSuccess = () => {
        router.replace('/game');
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Welcome to Bulletin-Web</h1>
            <p>Please log in to continue</p>
            {/* Do not render the form if authenticated,
             just wait for the useEffect redirect */}
            {!isAuthenticated && <LoginForm onSuccess={handleLoginSuccess} />}
        </div>
    );
}