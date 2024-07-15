import React from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Trello Clone</h1>
      <div className="board-container">
        <Board />
      </div>
    </div>
  );
}

export default App;
