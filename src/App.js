import React, { Component } from 'react';
import Tile from './Tile';
import './App.css';

class App extends Component {
    render() {
        const matrix = [[1, 0, 1], [1, 0, 1], [1, 0, 1]];

        return (
            <div className="App">
                <header className="App-header">Welcome to Labyrinth React!</header>

                <div class="game-board">
                    <Tile x={1} y={1} degrees={0} matrix={matrix} />
                    <Tile x={2} y={2} degrees={90} matrix={matrix} />
                    <Tile x={3} y={3} degrees={0} matrix={matrix} />
                    <Tile x={4} y={4} degrees={90} matrix={matrix} />
                    <Tile x={5} y={5} degrees={0} matrix={matrix} />
                    <Tile x={6} y={6} degrees={90} matrix={matrix} />
                </div>
            </div>
        );
    }
}

export default App;

{
    /*

{board.map((row,rowIndex) =>
                    row.map((tile,columnIndex) => (
                    <Tile x={columnIndex} y={rowIndex} degrees={0} matrix={[[1, 0, 1], [1, 0, 1], [1, 0, 1]]} />


 */
}
