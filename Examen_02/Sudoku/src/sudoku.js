// Game state
let board = [];
let solution = [];
let selectedCell = null;
let mistakes = 0;
const maxMistakes = 3;
let timer = 0;
let timerInterval = null;
let currentDifficulty = 'easy';

// DOM elements
const sudokuBoard = document.getElementById('sudokuBoard');
const timerDisplay = document.getElementById('timer');
const mistakesDisplay = document.getElementById('mistakes');
const newGameBtn = document.getElementById('newGameBtn');
const eraseBtn = document.getElementById('eraseBtn');
const hintBtn = document.getElementById('hintBtn');
const checkBtn = document.getElementById('checkBtn');
const winModal = document.getElementById('winModal');
const playAgainBtn = document.getElementById('playAgainBtn');
const finalTime = document.getElementById('finalTime');
const difficultyBtns = document.querySelectorAll('.btn-difficulty');
const numberBtns = document.querySelectorAll('.number-btn');

// Initialize game
function initGame() {
    mistakes = 0;
    timer = 0;
    updateMistakes();
    stopTimer();
    generateSudoku();
    renderBoard();
    startTimer();
}

// Generate a valid Sudoku puzzle
function generateSudoku() {
    // Create empty board
    board = Array(9).fill(null).map(() => Array(9).fill(0));
    solution = Array(9).fill(null).map(() => Array(9).fill(0));
    
    // Fill the board with a valid solution
    solveSudoku(solution);
    
    // Copy solution to board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = solution[i][j];
        }
    }
    
    // Remove numbers based on difficulty
    const cellsToRemove = {
        'easy': 35,
        'medium': 45,
        'hard': 55
    };
    
    const toRemove = cellsToRemove[currentDifficulty];
    let removed = 0;
    
    while (removed < toRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            removed++;
        }
    }
}

// Solve Sudoku using backtracking
function solveSudoku(board) {
    const empty = findEmpty(board);
    if (!empty) return true;
    
    const [row, col] = empty;
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
    for (const num of numbers) {
        if (isValid(board, num, row, col)) {
            board[row][col] = num;
            
            if (solveSudoku(board)) {
                return true;
            }
            
            board[row][col] = 0;
        }
    }
    
    return false;
}

// Find empty cell
function findEmpty(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}

// Check if number is valid
function isValid(board, num, row, col) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] === num) {
                return false;
            }
        }
    }
    
    return true;
}

// Shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Render the board
function renderBoard() {
    sudokuBoard.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            
            const value = board[i][j];
            
            if (value !== 0) {
                cell.textContent = value;
                if (solution[i][j] === value && !isCellEditable(i, j)) {
                    cell.classList.add('cell-fixed');
                } else if (value === solution[i][j]) {
                    cell.classList.add('cell-correct');
                }
            }
            
            cell.addEventListener('click', () => selectCell(i, j));
            sudokuBoard.appendChild(cell);
        }
    }
}

// Check if cell is editable (was originally empty)
function isCellEditable(row, col) {
    // A cell is editable if it was 0 in the original puzzle
    // We need to track original state
    return !document.querySelector(`[data-row="${row}"][data-col="${col}"]`)?.classList.contains('cell-fixed');
}

// Select a cell
function selectCell(row, col) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    if (cell.classList.contains('cell-fixed')) return;
    
    // Remove previous selection
    document.querySelectorAll('.cell').forEach(c => {
        c.classList.remove('cell-selected', 'cell-highlight');
    });
    
    // Highlight selected cell
    cell.classList.add('cell-selected');
    selectedCell = { row, col };
    
    // Highlight same numbers
    const value = board[row][col];
    if (value !== 0) {
        document.querySelectorAll('.cell').forEach(c => {
            if (c.textContent === value && c !== cell) {
                c.classList.add('cell-highlight');
            }
        });
    }
}

// Place number in selected cell
function placeNumber(num) {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    if (cell.classList.contains('cell-fixed')) return;
    
    // Place the number
    board[row][col] = num;
    cell.textContent = num;
    cell.classList.remove('cell-error', 'cell-correct');
    
    // Check if correct
    if (num === solution[row][col]) {
        cell.classList.add('cell-correct');
        
        // Check if puzzle is complete
        if (isPuzzleComplete()) {
            setTimeout(() => showWinModal(), 300);
        }
    } else {
        cell.classList.add('cell-error');
        mistakes++;
        updateMistakes();
        
        if (mistakes >= maxMistakes) {
            setTimeout(() => {
                alert('¡Has cometido muchos errores! Intenta de nuevo.');
                initGame();
            }, 500);
        }
    }
    
    // Highlight same numbers
    document.querySelectorAll('.cell').forEach(c => {
        c.classList.remove('cell-highlight');
        if (c.textContent === num && !c.classList.contains('cell-selected')) {
            c.classList.add('cell-highlight');
        }
    });
}

// Erase number from selected cell
function eraseNumber() {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    if (cell.classList.contains('cell-fixed')) return;
    
    board[row][col] = 0;
    cell.textContent = '';
    cell.classList.remove('cell-error', 'cell-correct');
    
    document.querySelectorAll('.cell').forEach(c => {
        c.classList.remove('cell-highlight');
    });
}

// Give a hint
function giveHint() {
    if (!selectedCell) {
        alert('Selecciona una celda primero');
        return;
    }
    
    const { row, col } = selectedCell;
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    if (cell.classList.contains('cell-fixed')) {
        alert('Esta celda ya tiene el número correcto');
        return;
    }
    
    const correctNumber = solution[row][col];
    board[row][col] = correctNumber;
    cell.textContent = correctNumber;
    cell.classList.remove('cell-error');
    cell.classList.add('cell-correct', 'cell-fixed');
    
    if (isPuzzleComplete()) {
        setTimeout(() => showWinModal(), 300);
    }
}

// Check the entire board
function checkBoard() {
    let hasErrors = false;
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
            
            if (!cell.classList.contains('cell-fixed') && board[i][j] !== 0) {
                if (board[i][j] !== solution[i][j]) {
                    cell.classList.add('cell-error');
                    hasErrors = true;
                } else {
                    cell.classList.remove('cell-error');
                    cell.classList.add('cell-correct');
                }
            }
        }
    }
    
    if (!hasErrors && isPuzzleComplete()) {
        setTimeout(() => showWinModal(), 300);
    } else if (hasErrors) {
        alert('Hay algunos errores en el tablero. Revisa las celdas marcadas.');
    } else {
        alert('¡Hasta ahora todo está correcto! Sigue jugando.');
    }
}

// Check if puzzle is complete
function isPuzzleComplete() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== solution[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Timer functions
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateMistakes() {
    mistakesDisplay.textContent = `${mistakes} / ${maxMistakes}`;
}

// Show win modal
function showWinModal() {
    stopTimer();
    finalTime.textContent = timerDisplay.textContent;
    winModal.classList.add('show');
}

// Event listeners
newGameBtn.addEventListener('click', initGame);
eraseBtn.addEventListener('click', eraseNumber);
hintBtn.addEventListener('click', giveHint);
checkBtn.addEventListener('click', checkBoard);

playAgainBtn.addEventListener('click', () => {
    winModal.classList.remove('show');
    initGame();
});

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const number = parseInt(btn.dataset.number);
        placeNumber(number);
    });
});

difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDifficulty = btn.dataset.difficulty;
        initGame();
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9') {
        placeNumber(parseInt(e.key));
    } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        eraseNumber();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
               e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (selectedCell) {
            let { row, col } = selectedCell;
            
            switch(e.key) {
            case 'ArrowUp': row = Math.max(0, row - 1); break;
            case 'ArrowDown': row = Math.min(8, row + 1); break;
            case 'ArrowLeft': col = Math.max(0, col - 1); break;
            case 'ArrowRight': col = Math.min(8, col + 1); break;
            }
            
            selectCell(row, col);
        } else {
            selectCell(0, 0);
        }
    }
});

// Initialize game on load
initGame();

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveSudoku,
        findEmpty,
        isValid,
        shuffleArray,
        isPuzzleComplete
    };
}
