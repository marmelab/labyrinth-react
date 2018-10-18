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

const Board = ({ board, players }) => (
    <div className="board">
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

        <div className="game-board players">
            {players.map((player, playerIndex) => {
                const image = playerNumberToImageName[playerIndex];
                return (
                    <div
                        key={image}
                        className="player-grid"
                        style={{
                            gridColumn: convertBoardXToDisplayX(player.x),
                            gridRow: convertBoardYToDisplayY(player.y),
                        }}
                    >
                        <img className="player-image" src={image} />
                    </div>
                );
            })}
        </div>
    </div>
);

export default Board;
