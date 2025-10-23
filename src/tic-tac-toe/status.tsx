"use client";

type StatusParams = {
    winner: 'X' | 'O' | null;
    xIsNext: boolean;
    isGameOver: boolean;
}

export function Status({ winner, xIsNext, isGameOver }: StatusParams) {
    return (
        <>
            <div className="status">
                {winner ? (
                    <>
                        <div className="font-black">GAME OVER</div>
                        <div>Ganador: {winner}</div>
                    </>
                ) : isGameOver ? (
                    <div className="font-black">GAME OVER</div>
                ) : (
                    <div>Siguiente jugador: {xIsNext ? "X" : "O"}</div>
                )}
            </div>
        </>
    );
}