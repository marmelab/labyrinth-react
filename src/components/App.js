import React, { Component } from 'react';
import './App.css';

import Board from './Board';
import PlayerCards from './PlayerCards';
import NewGame from './NewGame';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">Welcome to Labyrinth React!</header>
                <div className="game-container">
                    <Board />
                    <PlayerCards />
                    <NewGame />
                </div>
            </div>
        );
    }
}

export const treasures = [
    '💌',
    '💣',
    '🛍',
    '📿',
    '🔭',
    '💎',
    '💰',
    '📜',
    '🗿',
    '🏺',
    '🔫',
    '🛡',
    '💈',
    '🛎',
    '⌛',
    '🌡',
    '⛱',
    '🎈',
    '🎎',
    '🎁',
    '🔮',
    '📷',
    '🕯',
    '?',
];

export default App;
