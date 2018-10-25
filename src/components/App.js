import React from 'react';

import './App.css';
import Board from './Board';
import PlayerCards from './PlayerCards';
import NewGame from './NewGame';

const App = () => (
    <div className="app">
        <header className="app-header">Welcome to Labyrinth React!</header>
        <div className="game-container">
            <Board />
            <PlayerCards />
            <NewGame />
        </div>
    </div>
);

export default App;
