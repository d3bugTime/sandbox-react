"use client";

import { Board } from '@/tic-tac-toe/board';
import { useState } from "react";
import { RestartButton } from "@/tic-tac-toe/restart";
import { Status } from "@/tic-tac-toe/status";
import { CalculateWinner } from "@/tic-tac-toe/calculate";

type Squares = Array<'X' | 'O' | null>;

export function Game() {
    const [history, setHistory] = useState<Squares[]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    // const [xIsNext, setXIsNext] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    // const currentSquares = history[history.length - 1];
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: Squares) {
        const nextHistory = history.slice(0, currentMove + 1);
        // setHistory([...history, nextSquares]);
        setHistory([...nextHistory, nextSquares]);
        // setXIsNext(!xIsNext);
        setCurrentMove(nextHistory.length);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    // A similar code comes from `board.tsx` in line 39-41
    const winner = CalculateWinner(currentSquares);
    const isBoardFull = currentSquares.every(square => square !== null);
    const isGameOver = winner !== null || isBoardFull;

    // The restart function simply jumps to move 0
    const restartGame = () => jumpTo(0);

   // Map history to list items (move buttons)
   const moves = history.map((_, move) => {
       const description = move === 0 ? 'Ir al inicio del juego'
           : `Ir al movimiento #${move}`;
       return (
           <li key={move}>
               <button onClick={() => jumpTo(move)}>{description}</button>
           </li>
       );
   });

    return (
        <>
            <Status
                winner={winner}
                xIsNext={xIsNext}
                isGameOver={isGameOver}
            />
            <RestartButton
                onRestart={restartGame}
                isGameOver={isGameOver}
            />
            <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
            />

            <div className="game">
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    );
}
