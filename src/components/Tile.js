import * as React from 'react';
import classnames from 'classnames';

import { Type } from '../common/pathCard';
import { treasures } from './assets';

const typeToMatrix = {
    [Type.CORNER]: 'images/corner96.png',
    [Type.CROSS]: 'images/cross96.png',
    [Type.STRAIGHT]: 'images/straight96.png',
};

const Tile = ({ degrees, type, target, isRemainingTile, isClickable, onClick }) => (
    <div onClick={onClick}>
        <div
            style={{ transform: `rotate(${degrees}deg)` }}
            className={classnames({
                'remaining-tile-image': isRemainingTile,
                'tile-image': !isRemainingTile,
                'remaining-clickable': isClickable,
                'centered-content': true,
            })}
        >
            <img alt={`Tile ${type}`} src={typeToMatrix[type]} />
        </div>
        {target !== null && <div className="centered-content treasure">{treasures[target]}</div>}
    </div>
);

export default Tile;
