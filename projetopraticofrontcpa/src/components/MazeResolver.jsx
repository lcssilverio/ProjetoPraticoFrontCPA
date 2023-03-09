import React, { useState } from 'react';

function MazeResolver() {
  const [maze, setMaze] = useState([
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 0]
  ]);
  const [solution, setSolution] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoading(true); // set loading state to true
    fetch('https://localhost:7296/api/v1/MazeController', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(maze),
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error('Solution not found');
        }
        return response.json();
      })
      .then((data) => setSolution(data.map(step => [step.item1, step.item2])))
      //.catch(() => setError("Não foi encontrada uma solução."));
      .catch((error) => setError([{ message: error.message }]))
      .finally(() => setLoading(false)); // set loading state to false after the request is finished
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <h3>Maze:</h3>
          <table>
            <tbody>
              {maze.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        value={maze[rowIndex][cellIndex]}
                        onChange={(event) => {
                          const newMaze = [...maze];
                          newMaze[rowIndex][cellIndex] = parseInt(
                            event.target.value
                          );
                          setMaze(newMaze);
                        }}
                        className='td-style'
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </label>
        <button className="buttonSubmit" type="submit">Enviar</button>
      </form>
      {/* Show loading animation when loading state is true */}
      {loading && <div className="loading"></div>}
      <table>
        <thead>
          <tr>
            <th>Resultado:</th>
          </tr>
        </thead>
        <tbody>
          {error && <p>Não foi encontrada uma solução.</p>}
          {!error && Array.isArray(solution) &&
            solution.map((step, index) => (
              <tr key={index}>
                <td>({step[0]}, {step[1]})</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MazeResolver;
