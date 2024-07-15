import React from 'react';
import displayData from './components/displayData';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Trello Clone</h1>
      <div className="board-container">
        <displayData />
      </div>
    </div>
  );
}

export default App;
