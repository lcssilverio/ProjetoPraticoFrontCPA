import React, { useState } from 'react';

function MazeResolver() {
  const [maze, setMaze] = useState([
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ]);
  const [solution, setSolution] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://localhost:7296/api/v1/MazeController', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(maze),
    })
      .then((response) => response.json())
      .then((data) => setSolution(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Maze:
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
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </label>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Solution:</th>
          </tr>
        </thead>
        <tbody>
          {solution.map((step, index) => (
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
