import React, { useState } from 'react';

function NQueenProblem() {
    const [nQueens, setNQueens] = useState(1);
    const [solution, setSolution] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://localhost:7296/api/v1/nqueen/${nQueens}`)
            .then((response) => response.json())
            .then((data) => setSolution(data));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    N Queens:
                    <input
                        type="number"
                        value={nQueens}
                        onChange={(e) => setNQueens(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Solutions: </th>
                    </tr>
                </thead>
                <tbody>
                    {solution ? (
                        solution.map((solutionRow, index) => (
                            <tr key={index}>
                                {solutionRow.map((queenPosition) => (
                                    <td>{queenPosition}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Waiting for solution...</td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
}

export default NQueenProblem;
