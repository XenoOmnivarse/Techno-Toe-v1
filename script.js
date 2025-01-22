const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const restartButton = document.getElementById('restart-button');
const messageDisplay = document.getElementById('message');
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const singlePlayerButton = document.getElementById('single-player-btn');
const twoPlayerButton = document.getElementById('two-player-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let isSinglePlayer = false;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const combination of winningCombination) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            setTimeout(() => {
                messageDisplay.textContent = `${currentPlayer} Wins!`;
            }, 100);
            return;
        }
    }
    if (board.every(cell => cell)) {
        gameOver = true;
        setTimeout(() => messageDisplay.textContent = "It's a Draw!", 100);
    }
}

function aiMove() {
    if (gameOver) return;
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[move] = 'O';
    cells[move].textContent = 'O';
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = 'X';
    checkWinner();
}

function handleCellClick(index) {
    if (gameOver || board[index]) return;
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWinner();
    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = currentPlayer;
        if (isSinglePlayer && currentPlayer === 'O') {
            aiMove();
        }
    }
}

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = currentPlayer;
    messageDisplay.textContent = '';
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
}

singlePlayerButton.addEventListener('click', () => {
    isSinglePlayer = true;
    startGame();
});

twoPlayerButton.addEventListener('click', () => {
    isSinglePlayer = false;
    startGame();
});

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

restartButton.addEventListener('click', startGame);