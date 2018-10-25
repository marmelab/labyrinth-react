import * as React from 'react';

const playerIndexToImageName = {
    0: 'images/piece_blue96.png',
    1: 'images/piece_yellow96.png',
    2: 'images/piece_red96.png',
    3: 'images/piece_purple96.png',
};

const Player = ({ playerIndex }) => (
    <div className="centered-content">
        {<img alt={`Player`} className="player-image" src={playerIndexToImageName[playerIndex]} />}
    </div>
);

export default Player;
