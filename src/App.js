import React, { Component } from 'react';
import './App.css';

import Board from './Board';
import PlayerCards from './PlayerCards';

import { createGame } from './common/game';

import CreateGame from './containers/CreateGame';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: createGame(),
        };
    }

    render() {
        const { board, players, remainingPathCard } = this.state.game;
        return (
            <div className="App">
                <header className="App-header">Welcome to Labyrinth React!</header>
                <div className="game-container">
                    <Board board={board} players={players} />
                    <PlayerCards remainingPathCard={remainingPathCard} />
                    <CreateGame />
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
