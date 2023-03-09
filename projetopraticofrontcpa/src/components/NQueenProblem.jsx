import React, { useState } from 'react';

function NQueenProblem() {
    const [nQueens, setNQueens] = useState(1);
    const [solution, setSolution] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        fetch(`https://localhost:7296/api/v1/nqueen/${nQueens}`)
            .then((response) => response.json())
            .then((data) => {
                setSolution(data);
                setIsLoading(false);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <h3>N Queens:</h3>
                    <input
                        type="number"
                        value={nQueens}
                        onChange={(e) => setNQueens(e.target.value)}
                        className="formInput"
                        placeholder='Insira um valor'
                    />
                </label>
                <button className="buttonSubmit" type="submit">Enviar</button>
            </form>
            {isLoading ? (
                
                <div className="loading">Loading...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th >Resultado: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {solution ? (
                            solution.map((solutionRow, index) => (
                                <tr key={index}>
                                    {solutionRow.map((queenPosition) => (
                                        <td className="td-solution">{queenPosition}</td>
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
            )}
        </div>
    );
}

export default NQueenProblem;
