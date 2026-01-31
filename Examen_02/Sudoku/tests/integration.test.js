/**
 * Integration Tests
 * Tests for the overall game workflow
 */

const {
    generateValidBoard,
    createPuzzle,
    validateBoard,
    solveSudoku,
} = require('../src/sudokuCore');

describe('Sudoku Game Integration Tests', () => {
    test('should generate valid puzzle that can be solved', () => {
        // Generate a solution
        const solution = generateValidBoard();
        expect(validateBoard(solution)).toBe(true);
        
        // Create puzzle from solution
        const puzzle = createPuzzle(solution, 40);
        
        // Verify puzzle is solvable
        const puzzleCopy = puzzle.map(row => [...row]);
        const solved = solveSudoku(puzzleCopy);
        
        expect(solved).toBe(true);
        expect(validateBoard(puzzleCopy)).toBe(true);
    });

    test('should handle different difficulty levels', () => {
        const difficulties = {
            easy: 35,
            medium: 45,
            hard: 55,
        };

        Object.entries(difficulties).forEach(([level, cellsToRemove]) => {
            const solution = generateValidBoard();
            const puzzle = createPuzzle(solution, cellsToRemove);
            
            // Count empty cells
            let emptyCells = 0;
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (puzzle[i][j] === 0) emptyCells++;
                }
            }
            
            expect(emptyCells).toBe(cellsToRemove);
        });
    });

    test('complete game workflow', () => {
        // 1. Generate solution
        const solution = generateValidBoard();
        expect(validateBoard(solution)).toBe(true);
        
        // 2. Create puzzle
        const puzzle = createPuzzle(solution, 40);
        
        // 3. Simulate solving by copying solution
        const playerBoard = puzzle.map(row => [...row]);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (playerBoard[i][j] === 0) {
                    playerBoard[i][j] = solution[i][j];
                }
            }
        }
        
        // 4. Verify completion
        expect(validateBoard(playerBoard)).toBe(true);
        expect(JSON.stringify(playerBoard)).toBe(JSON.stringify(solution));
    });
});
