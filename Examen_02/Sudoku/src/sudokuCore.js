/**
 * Sudoku Core Module
 * Contains pure logic functions without DOM manipulation for easy testing
 */

/**
 * Solve Sudoku using backtracking algorithm
 * @param {Array<Array<number>>} board - 9x9 Sudoku board
 * @returns {boolean} - True if solved, false otherwise
 */
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

/**
 * Find first empty cell in the board
 * @param {Array<Array<number>>} board - 9x9 Sudoku board
 * @returns {Array<number>|null} - [row, col] or null if no empty cell
 */
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

/**
 * Check if a number is valid at a given position
 * @param {Array<Array<number>>} board - 9x9 Sudoku board
 * @param {number} num - Number to check (1-9)
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 * @returns {boolean} - True if valid, false otherwise
 */
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

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Check if puzzle is complete and correct
 * @param {Array<Array<number>>} board - Current board state
 * @param {Array<Array<number>>} solution - Correct solution
 * @returns {boolean} - True if complete and correct
 */
function isPuzzleComplete(board, solution) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== solution[i][j]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Generate a valid Sudoku board
 * @returns {Array<Array<number>>} - Valid 9x9 Sudoku board
 */
function generateValidBoard() {
    const board = Array(9).fill(null).map(() => Array(9).fill(0));
    solveSudoku(board);
    return board;
}

/**
 * Create a puzzle from a solved board by removing cells
 * @param {Array<Array<number>>} solution - Solved board
 * @param {number} cellsToRemove - Number of cells to remove
 * @returns {Array<Array<number>>} - Puzzle board
 */
function createPuzzle(solution, cellsToRemove = 40) {
    const board = solution.map(row => [...row]);
    let removed = 0;
    
    while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            removed++;
        }
    }
    
    return board;
}

/**
 * Validate if a board follows Sudoku rules
 * @param {Array<Array<number>>} board - 9x9 Sudoku board
 * @returns {boolean} - True if valid, false otherwise
 */
function validateBoard(board) {
    if (!board || board.length !== 9) return false;
    
    for (let i = 0; i < 9; i++) {
        if (!board[i] || board[i].length !== 9) return false;
        
        for (let j = 0; j < 9; j++) {
            const num = board[i][j];
            if (num !== 0) {
                // Temporarily remove number to check validity
                board[i][j] = 0;
                if (!isValid(board, num, i, j)) {
                    board[i][j] = num;
                    return false;
                }
                board[i][j] = num;
            }
        }
    }
    
    return true;
}

// Export functions for testing and module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        solveSudoku,
        findEmpty,
        isValid,
        shuffleArray,
        isPuzzleComplete,
        generateValidBoard,
        createPuzzle,
        validateBoard
    };
}
