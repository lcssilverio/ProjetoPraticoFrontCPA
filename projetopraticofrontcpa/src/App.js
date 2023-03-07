import React from 'react';
import NQueenProblem from './components/NQueenProblem';
import SudokuSolver from './components/SudokuSolver';
import MazeResolver from './components/MazeResolver';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="header">
        <h1>Trabalho Final CPA</h1>
      </div>
      <div className="main">
        <NQueenProblem />
        <SudokuSolver />
        <MazeResolver />
      </div>
    </div>
  );
}

export default App;
