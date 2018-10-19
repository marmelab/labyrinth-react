import * as React from 'react';

import { Type } from './common/pathCard';

const typeToMatrix = {
    [Type.CORNER]: 'images/corner96.png',
    [Type.CROSS]: 'images/cross96.png',
    [Type.STRAIGHT]: 'images/straight96.png',
};

const Tile = ({ degrees, type }) => (
    <div className="tile">
        <img className="tile-image" style={{ transform: `rotate(${degrees}deg)` }} src={typeToMatrix[type]} />
    </div>
);

export default Tile;
