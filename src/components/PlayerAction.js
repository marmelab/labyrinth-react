import * as React from 'react';
import { isGameInInsertState, isGameInMoveState, positionIsIn } from '../common/game';

const insert_positions = [
    { x: 0, y: 1 },
    { x: 0, y: 3 },
    { x: 0, y: 5 },
    { x: 6, y: 1 },
    { x: 6, y: 3 },
    { x: 6, y: 5 },
    { x: 1, y: 0 },
    { x: 3, y: 0 },
    { x: 5, y: 0 },
    { x: 1, y: 6 },
    { x: 3, y: 6 },
    { x: 5, y: 6 },
];

const isInsertPosition = (x, y) => insert_positions.findIndex(position => position.x === x && position.y === y) > -1;

export const PlayerAction = ({ game, x, y, onInsertRemainingPathCardAt, onMoveCurrentPlayerTo }) => {
    const renderInsertPosition = isGameInInsertState(game) && isInsertPosition(x, y);
    const renderMovePosition =
        isGameInMoveState(game) && positionIsIn({ x, y }, game.reachablePositions[game.currentPlayerIndex]);
    const subClassName = renderInsertPosition ? 'insert-position' : renderMovePosition ? 'move-player' : '';
    const onClickFunction = renderInsertPosition
        ? () => onInsertRemainingPathCardAt(game, x, y)
        : renderMovePosition
            ? () => onMoveCurrentPlayerTo(game, x, y)
            : x => x;
    return <div className={`centered-content ${subClassName}`} onClick={onClickFunction} />;
};

export default PlayerAction;
