import * as React from 'react';
import { convertBoardXToDisplayX, convertBoardYToDisplayY } from './common/utils';
import Tile from './Tile';
import { flattenBoard } from './common/board';
import { treasures } from './App';

const playerNumberToImageName = {
    0: 'images/piece_blue96.png',
    1: 'images/piece_yellow96.png',
    2: 'images/piece_red96.png',
    3: 'images/piece_purple96.png',
};

const getPlayerImage = (players, x, y) => {
    const index = players.findIndex(player => player.x === x && player.y === y);
    return index > -1 ? playerNumberToImageName[index] : null;
};

const insert_positions = [
    { x: 0, y: 1 },
    { x: 0, y: 3 },
    { x: 0, y: 5 },
    { x: 6, y: 1 },
    { x: 6, y: 3 },
    { x: 6, y: 5 },
    { x: 1, y: 0 },
    { x: 3, y: 0 },
    { x: 5, y: 0 },
    { x: 1, y: 6 },
    { x: 3, y: 6 },
    { x: 5, y: 6 },
];

const isInsertPosition = (x, y) => insert_positions.findIndex(position => position.x === x && position.y === y) > -1;

const Board = ({ board, players }) => (
    <div className="board">
        <div className="board-game" id="empty" />
        <div className="board-game" id="ground">
            {board.map((row, rowIndex) => (
                <div className="row" key={`board-game ${rowIndex}`}>
                    {row.map((pathCard, columnIndex) => (
                        <div className="box" key={`box ${rowIndex}-${columnIndex}`}>
                            <Tile degrees={90 * pathCard.direction} type={pathCard.type} target={pathCard.target} />
                        </div>
                    ))}
                </div>
            ))}
        </div>

        <div className="board-game" id="players">
            {board.map((row, rowIndex) => (
                <div className="row" key={`players ${rowIndex}`}>
                    {row.map((pathCard, columnIndex) => {
                        const image = getPlayerImage(players, columnIndex, rowIndex);
                        return (
                            <div className="box" key={`${columnIndex}-${rowIndex}`}>
                                <div className="centered-content">
                                    {image && <img className="player-image" src={image} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>

        <div className="board-game" id="insert-positions">
            {board.map((row, rowIndex) => (
                <div className="row" key={`insert-positions ${rowIndex}`}>
                    {row.map((_, columnIndex) => (
                        <div className="box" key={`${columnIndex}-${rowIndex}`}>
                            {isInsertPosition(columnIndex, rowIndex) && (
                                <a
                                    className="centered-content insert-position"
                                    href={`insertRemainingPathCard/x/${columnIndex}/y/${rowIndex}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
);

export default Board;
