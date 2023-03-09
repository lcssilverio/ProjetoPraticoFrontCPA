import React, { useState } from 'react';

function MazeResolver() {
  const [maze, setMaze] = useState([
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 0]
  ]);
  const [solution, setSolution] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      .catch((error) => setSolution([{ message: error.message }]))
      .finally(() => setLoading(false)); // set loading state to false after the request is finished
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
      {/* Show loading animation when loading state is true */}
      {loading && <div className="loading"></div>}
      <table>
        <thead>
          <tr>
            <th>Solution:</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(solution) &&
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
