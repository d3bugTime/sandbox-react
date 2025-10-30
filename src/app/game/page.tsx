"use client";

import { Game } from "@/tic-tac-toe/game";
import ProtectedRoute from "@/bulletin/components/protected.route";

export default function GamePage() {
    return (
        <ProtectedRoute>
            <Game />
        </ProtectedRoute>
    );
}