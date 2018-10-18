import React, { Component } from 'react';
import './App.css';

import Board from './Board';
import Players from './Players';

import { createGame } from './common/game';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: createGame(),
        };
    }

    render() {
        const { board, players } = this.state.game;

        return (
            <div className="App">
                <header className="App-header">Welcome to Labyrinth React!</header>
                <Board board={board} />
                <Players players={players} />
            </div>
        );
    }
}

export default App;
