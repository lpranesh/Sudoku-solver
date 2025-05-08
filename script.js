document.addEventListener('DOMContentLoaded', () => {
    generateSudokuGrid();
});

function generateSudokuGrid() {
    const gridContainer = document.getElementById('sudoku-grid');
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 9;
        cell.appendChild(input);
        gridContainer.appendChild(cell);
    }
}

function solveSudoku() {
    const sudokuGrid = getCurrentSudokuGrid();
    
    // Send the Sudoku grid to the backend for solving
    fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sudokuGrid }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            displaySolvedSudoku(data.solvedGrid);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getCurrentSudokuGrid() {
    const gridContainer = document.getElementById('sudoku-grid');
    const inputs = gridContainer.querySelectorAll('.cell input');
    const sudokuGrid = [];

    inputs.forEach(input => {
        sudokuGrid.push(parseInt(input.value) || 0);
    });

    return chunkArray(sudokuGrid, 9);
}

function displaySolvedSudoku(solvedGrid) {
    const gridContainer = document.getElementById('sudoku-grid');
    const inputs = gridContainer.querySelectorAll('.cell input');

    inputs.forEach((input, index) => {
        input.value = solvedGrid[Math.floor(index / 9)][index % 9];
    });
}

function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}


export { solveSudoku, getCurrentSudokuGrid, displaySolvedSudoku, chunkArray };
export { generateSudokuGrid };