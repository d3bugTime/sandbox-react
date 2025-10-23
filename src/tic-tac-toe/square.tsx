"use client";

type SquareParams = {
    value: string | null;
    onSquareClick: () => void;
}

export function Square({value, onSquareClick}: SquareParams) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}