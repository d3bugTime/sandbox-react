"use client";

import { useState } from "react";
import { Square } from "@/tic-tac-toe/square";
import { Status } from "@/tic-tac-toe/status";
import { RestartButton } from "@/tic-tac-toe/restart";
import { CalculateWinner } from "@/tic-tac-toe/calculate";

type Squares = Array<'X' | 'O' | null>;

type BoardParams = {
    xIsNext: boolean;
    squares: Squares;
    onPlay: (nextSquares: Squares) => void;
}

export function Board({ xIsNext, squares, onPlay}: BoardParams) {
    // const [xIsNext, setXIsNext] = useState(true);
    // const [squares, setSquares] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));

    function handleClick(i: number) {
        if (squares[i] || CalculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice() as Squares;
        nextSquares[i] = xIsNext ? "X" : "O";

        onPlay(nextSquares);
        // setSquares(nextSquares);
        // setXIsNext(!xIsNext);
    }

    // function restartGame() {
    //     setSquares(Array(9).fill(null));
    //     setXIsNext(true);
    // }

    const winner = CalculateWinner(squares);
    const isBoardFull = squares.every(square => square !== null);
    const isGameOver = winner !== null || isBoardFull;

    return (
        <>
            {/*<Status*/}
            {/*    winner={winner}*/}
            {/*    xIsNext={xIsNext}*/}
            {/*    isGameOver={isGameOver}*/}
            {/*/>*/}

            {/*<RestartButton*/}
            {/*    onRestart={restartGame}*/}
            {/*    isGameOver={isGameOver}*/}
            {/*/>*/}

            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}