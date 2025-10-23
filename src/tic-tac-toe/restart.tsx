"use client";

type RestartParams = {
    onRestart: () => void;
    isGameOver: boolean;
}

export function RestartButton({ onRestart, isGameOver }: RestartParams) {
    // Don't show the button until game is over
    if (!isGameOver) {
        return null;
    }

    return (
        <button className="bg-gray-500 hover:bg-blue-300 text-sm text-white font-bold py-1 px-2 mb-3 rounded" onClick={onRestart}>
            Reiniciar
        </button>
    );
}