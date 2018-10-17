import * as React from 'react';

const typeToMatrix = {
    '┗': [[1, 0, 1], [1, 0, 0], [1, 1, 1]],
    '┻': [[1, 0, 1], [0, 0, 0], [1, 1, 1]],
    '┃': [[1, 0, 1], [1, 0, 1], [1, 0, 1]],
};

const Tile = ({ x, y, degrees, type }) => (
    <div className="tile-grid" style={{ gridColumn: x, gridRow: y, transform: `rotate(${degrees}deg)` }}>
        {typeToMatrix[type].map((row, rowIndex) =>
            row.map((isWall, columnIndex) => (
                <div className="tile-asset" style={{ gridColumn: columnIndex + 1, gridRow: rowIndex + 1 }}>
                    <img className="tile-image" src={'images/' + (isWall ? 'bricks32' : 'stones32') + '.png'} />
                </div>
            ))
        )}
    </div>
);
export default Tile;
