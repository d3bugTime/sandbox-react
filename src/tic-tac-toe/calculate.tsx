export function CalculateWinner(squares: Array<'X' | 'O' | null>): 'X' | 'O' | null {
    // Winning Combinations
    const lines = [
        [0, 1, 2], // rows
        [3, 4, 5], // rows
        [6, 7, 8], // rows
        [0, 3, 6], // columns
        [1, 4, 7], // columns
        [2, 5, 8], // columns
        [0, 4, 8], // diagonals
        [2, 4, 6] // diagonals
    ];

    // Loop through all Winning Combinations
    for (let i = 0; i < lines.length; i++) {
        // Destructure current combination
        const [a, b, c] = lines[i];
        // Check for winning condition
        /**
         * squares[a] -> checks if the 1st position is no empty
         * squares[a] === squares[b] -> checks if 1st and 2nd positions have the same value
         * squares[a] === squares[c] -> checks if 1st and 3rd positions have the same value
         * */
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // If the 3 conditions are true, returns
            // the winning player's mark ('X' or 'O')
            return squares[a];
        }
    }
    // No winner found
    return null;
}