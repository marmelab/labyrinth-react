import * as React from 'react';
import { convertBoardXToDisplayX, convertBoardYToDisplayY } from './common/utils';
import Tile from './Tile';
import { flattenBoard } from './common/board';

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

const treasures = [
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

const Board = ({ board, players }) => (
    <div className="board">
        <div className="board-game" id="empty" />
        <div className="board-game" id="ground">
            {board.map((row, rowIndex) => (
                <div className="row" key={`board-game ${rowIndex}`}>
                    {row.map((pathCard, columnIndex) => (
                        <div className="box" key={`box ${rowIndex}-${columnIndex}`}>
                            <Tile key={pathCard.id} degrees={90 * pathCard.direction} type={pathCard.type} />
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
                        const key = `${columnIndex}-${rowIndex}`;
                        return (
                            <div className="box" key={key}>
                                <div className="player">{image && <img className="player-image" src={image} />}</div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>

        <div className="board-game" id="treasures">
            {board.map((row, rowIndex) => (
                <div className="row" key={`treasures ${rowIndex}`}>
                    {row.map((pathCard, columnIndex) => {
                        const key = `${columnIndex}-${rowIndex}`;
                        return (
                            <div className="box" key={key}>
                                {pathCard.target != null && (
                                    <div className="treasure">{treasures[pathCard.target]}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
);

export default Board;
