// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('#board');
    const cells = document.querySelectorAll('.cell');
    const greeting = document.getElementById('greeting');
    const resetButton = document.getElementById('reset');

    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');

    let currentPlayer = 'X'; // Player1 starts with 'X'
    let boardState = Array(9).fill(null);
    let gameActive = true;

    greeting.innerText = `${player1} (X) vs ${player2} (O)`;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const checkWinner = () => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return null;
    };

    const checkDraw = () => {
        return boardState.every(cell => cell !== null);
    };

    const handleClick = (e) => {
        const index = e.target.getAttribute('data-index');
        
        if (boardState[index] !== null || !gameActive) return;

        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            const winningPlayer = winner === 'X' ? player1 : player2;
            greeting.innerText = `🎉 ${winningPlayer} Wins! 🎉`;
            gameActive = false;
        } else if (checkDraw()) {
            greeting.innerText = "It's a Draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            greeting.innerText = `${currentPlayer === 'X' ? player1 : player2}'s Turn (${currentPlayer})`;
        }
    };

    const resetGame = () => {
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        greeting.innerText = `${player1} (X) vs ${player2} (O)`;
        gameActive = true;
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
});
