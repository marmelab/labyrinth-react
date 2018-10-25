import * as React from 'react';

import { Type } from '../common/pathCard';
import { treasures } from './assets';

const typeToMatrix = {
    [Type.CORNER]: 'images/corner96.png',
    [Type.CROSS]: 'images/cross96.png',
    [Type.STRAIGHT]: 'images/straight96.png',
};

const Tile = ({ degrees, type, target, isRemainingTile, onClick }) => (
    <div onClick={onClick}>
        <div className="centered-content">
            <img
                className={isRemainingTile ? 'remaining-tile-image' : 'tile-image'}
                alt={`Tile ${type}`}
                style={{ transform: `rotate(${degrees}deg)` }}
                src={typeToMatrix[type]}
            />
        </div>
        {target !== null && <div className="centered-content treasure">{treasures[target]}</div>}
    </div>
);

export default Tile;
