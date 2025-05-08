from flask import Flask, render_template, request, jsonify
from .sudoku_solver import solve_sudoku  # Import the Sudoku solver function

app = Flask(_name_)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    data = request.get_json()
    sudoku_grid = data.get('sudokuGrid')
    
    # Validate the Sudoku grid (You can add more validation if needed)
    if not is_valid_sudoku(sudoku_grid):
        return jsonify({'error': 'Invalid Sudoku grid'})

    # Solve Sudoku using the backtracking algorithm
    solved_grid = solve_sudoku(sudoku_grid)

    return jsonify({'solvedGrid': solved_grid})

def is_valid_sudoku(grid):
    # Implement Sudoku grid validation logic
    # Check rows, columns, and 3x3 subgrids for duplicates
    return True  # Placeholder, replace with actual validation logic

if _name_ == '_main_':
    app.run(debug=True)