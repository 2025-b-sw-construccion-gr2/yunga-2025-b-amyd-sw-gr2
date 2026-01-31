/**
 * Sudoku Core Module Tests
 * Tests for pure logic functions
 */

const {
    solveSudoku,
    findEmpty,
    isValid,
    shuffleArray,
    isPuzzleComplete,
    generateValidBoard,
    createPuzzle,
    validateBoard,
} = require('../src/sudokuCore');

describe('Sudoku Core Functions', () => {
    describe('findEmpty', () => {
        test('should find first empty cell', () => {
            const board = [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9],
            ];
            
            const result = findEmpty(board);
            expect(result).toEqual([0, 2]);
        });

        test('should return null when board is full', () => {
            const board = [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9],
            ];
            
            const result = findEmpty(board);
            expect(result).toBeNull();
        });
    });

    describe('isValid', () => {
        test('should return true for valid placement', () => {
            const board = Array(9).fill(null).map(() => Array(9).fill(0));
            expect(isValid(board, 5, 0, 0)).toBe(true);
        });

        test('should return false when number exists in row', () => {
            const board = Array(9).fill(null).map(() => Array(9).fill(0));
            board[0][5] = 7;
            expect(isValid(board, 7, 0, 0)).toBe(false);
        });

        test('should return false when number exists in column', () => {
            const board = Array(9).fill(null).map(() => Array(9).fill(0));
            board[5][0] = 7;
            expect(isValid(board, 7, 0, 0)).toBe(false);
        });

        test('should return false when number exists in 3x3 box', () => {
            const board = Array(9).fill(null).map(() => Array(9).fill(0));
            board[1][1] = 7;
            expect(isValid(board, 7, 0, 0)).toBe(false);
        });

        test('should handle edge cases with valid numbers', () => {
            const board = Array(9).fill(null).map(() => Array(9).fill(0));
            expect(isValid(board, 1, 8, 8)).toBe(true);
            expect(isValid(board, 9, 0, 8)).toBe(true);
        });
    });

    describe('shuffleArray', () => {
        test('should return array with same length', () => {
            const arr = [1, 2, 3, 4, 5];
            const shuffled = shuffleArray(arr);
            expect(shuffled.length).toBe(arr.length);
        });

        test('should contain all original elements', () => {
            const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const shuffled = shuffleArray(arr);
            
            expect(shuffled.sort()).toEqual(arr.sort());
        });

        test('should not modify original array', () => {
            const arr = [1, 2, 3, 4, 5];
            const original = [...arr];
            shuffleArray(arr);
            expect(arr).toEqual(original);
        });
    });

    describe('solveSudoku', () => {
        test('should solve a valid Sudoku puzzle', () => {
            const board = [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9],
            ];

            const result = solveSudoku(board);
            expect(result).toBe(true);
            expect(findEmpty(board)).toBeNull();
        });

        test('should return true for already solved puzzle', () => {
            const board = [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9],
            ];

            const result = solveSudoku(board);
            expect(result).toBe(true);
        });
    });

    describe('isPuzzleComplete', () => {
        test('should return true when board matches solution', () => {
            const board = [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9],
            ];
            
            const result = isPuzzleComplete(board, board);
            expect(result).toBe(true);
        });

        test('should return false when board does not match solution', () => {
            const board = [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 0], // Last cell is 0
            ];
            
            const solution = [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9],
            ];
            
            const result = isPuzzleComplete(board, solution);
            expect(result).toBe(false);
        });
    });

    describe('generateValidBoard', () => {
        test('should generate a valid filled 9x9 board', () => {
            const board = generateValidBoard();
            
            expect(board.length).toBe(9);
            expect(board[0].length).toBe(9);
            expect(findEmpty(board)).toBeNull();
        });

        test('should generate different boards on multiple calls', () => {
            const board1 = generateValidBoard();
            const board2 = generateValidBoard();
            
            // Boards should not be identical (very unlikely with randomization)
            const areIdentical = JSON.stringify(board1) === JSON.stringify(board2);
            expect(areIdentical).toBe(false);
        });
    });

    describe('createPuzzle', () => {
        test('should remove specified number of cells', () => {
            const solution = generateValidBoard();
            const cellsToRemove = 40;
            const puzzle = createPuzzle(solution, cellsToRemove);
            
            let emptyCells = 0;
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (puzzle[i][j] === 0) emptyCells++;
                }
            }
            
            expect(emptyCells).toBe(cellsToRemove);
        });

        test('should not modify original solution', () => {
            const solution = generateValidBoard();
            const original = solution.map(row => [...row]);
            createPuzzle(solution, 30);
            
            expect(solution).toEqual(original);
        });
    });

    describe('validateBoard', () => {
        test('should return true for valid board', () => {
            const board = [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9],
            ];
            
            expect(validateBoard(board)).toBe(true);
        });

        test('should return false for invalid board (duplicate in row)', () => {
            const board = [
                [5, 5, 4, 6, 7, 8, 9, 1, 2], // Two 5s in row
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9],
            ];
            
            expect(validateBoard(board)).toBe(false);
        });

        test('should return false for null or invalid dimensions', () => {
            expect(validateBoard(null)).toBe(false);
            expect(validateBoard([])).toBe(false);
            expect(validateBoard([[1, 2, 3]])).toBe(false);
        });
    });
});
