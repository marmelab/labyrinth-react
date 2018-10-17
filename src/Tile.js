import * as React from 'react';

const Tile = ({ x, y, degrees, matrix }) => (
    <div className="tile-grid" style={{ gridColumn: x, gridRow: y, transform: `rotate(${degrees}deg)` }}>
        {matrix.map((row, rowIndex) =>
            row.map((isWall, columnIndex) => (
                <div className="tile-asset" style={{ gridColumn: columnIndex + 1, gridRow: rowIndex + 1 }}>
                    <img className="tile-image" src={'images/' + (isWall ? 'bricks32' : 'stones32') + '.png'} />
                </div>
            ))
        )}
    </div>
);
export default Tile;
