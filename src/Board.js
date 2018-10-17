import * as React from 'react';
import { convertBoardXToDisplayX, convertBoardYToDisplayY } from './common/utils';
import Tile from './Tile';
import { flattenBoard } from './common/board';

const Board = ({ board }) => (
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
);

export default Board;
