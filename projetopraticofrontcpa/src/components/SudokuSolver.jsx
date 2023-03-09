import React, { useState } from "react";

function SudokuSolver() {
  const [sudoku, setSudoku] = useState([
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 3],
    [0, 7, 4, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 2],
    [0, 8, 0, 0, 4, 0, 0, 1, 0],
    [6, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 7, 8, 0],
    [5, 0, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0],
  ]);
  const [solution, setSolution] = useState([]);
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    setError('');
    setSolution([]);
    event.preventDefault();
    fetch(`https://localhost:7296/api/v1/sudoku`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sudoku),
    })
      .then((response) => response.json())
      .then((data) => setSolution(data))
      .catch(() => setError("Não foi encontrada uma solução."));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            {sudoku.map((sudokuRow, rowIndex) => (
              <tr key={rowIndex}>
                {sudokuRow.map((sudokuValue, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      min="0"
                      max="9"
                      value={sudokuValue}
                      onChange={(e) => {
                        const updatedSudoku = [...sudoku];
                        updatedSudoku[rowIndex][colIndex] = parseInt(
                          e.target.value
                        );
                        setSudoku(updatedSudoku);
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Solution: </th>
          </tr>
        </thead>
        <tbody>
          {!error &&
            solution.map((solutionRow, index) => (
              <tr key={index}>
                {solutionRow.map((solutionValue) => (
                  <td>{solutionValue}</td>
                ))}
              </tr>
            ))}
          {error && <p>Não foi encontrada uma solução.</p>}
        </tbody>
      </table>
    </div>
  );
}

export default SudokuSolver;
