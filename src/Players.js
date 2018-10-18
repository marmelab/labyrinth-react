import * as React from 'react';
import { convertBoardXToDisplayX, convertBoardYToDisplayY } from './common/utils';

const playerNumberToImageName = {
    0: 'images/piece_blue96.png',
    1: 'images/piece_yellow96.png',
    2: 'images/piece_red96.png',
    3: 'images/piece_purple96.png',
};

const Players = ({ players }) => (
    <div className="game-board players">
        {players.map((player, playerIndex) => (
            <div
                key={player.color}
                className="player-grid"
                style={{ gridColumn: convertBoardXToDisplayX(player.x), gridRow: convertBoardYToDisplayY(player.y) }}
            >
                <img className="player-image" src={playerNumberToImageName[playerIndex]} />
            </div>
        ))}
    </div>
);

export default Players;
