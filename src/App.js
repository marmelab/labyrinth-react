import React, { Component } from 'react';
import Tile from './Tile';
import './App.css';
import { createGame } from './common/game';
import { flattenBoard } from './common/board';

import { convertBoardXToDisplayX, convertBoardYToDisplayY } from './common/utils';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: createGame(),
        };
    }

    render() {
        const { board } = this.state.game;

        return (
            <div className="App">
                <header className="App-header">Welcome to Labyrinth React!</header>

                <div className="game-board">
                    {flattenBoard(board).map(pathCard => (
                        <Tile
                            key={pathCard.id}
                            x={convertBoardXToDisplayX(pathCard.x)}
                            y={convertBoardYToDisplayY(pathCard.y)}
                            degrees={90 * pathCard.direction}
                            type={pathCard.type}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
