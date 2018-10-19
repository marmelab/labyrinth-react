import * as React from 'react';

import { Type } from './common/pathCard';
import { treasures } from './App';

const typeToMatrix = {
    [Type.CORNER]: 'images/corner96.png',
    [Type.CROSS]: 'images/cross96.png',
    [Type.STRAIGHT]: 'images/straight96.png',
};

const Tile = ({ degrees, type, target }) => (
    <React.Fragment>
        <div className="centered-content">
            <img className="tile-image" style={{ transform: `rotate(${degrees}deg)` }} src={typeToMatrix[type]} />
        </div>
        {target != null && <div className="centered-content treasure">{treasures[target]}</div>}
    </React.Fragment>
);

export default Tile;
