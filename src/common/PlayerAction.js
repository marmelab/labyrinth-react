import * as React from 'react';
import { isGameInInsertState, isGameInMoveState, positionIsIn } from './game';
import { actionMoveCurrentPlayerTo, insertRemainingPathcardAt } from '../actions';
import connect from 'react-redux/es/connect/connect';
import { Board } from '../components/Board';

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

const PlayerAction = ({ game, x, y, onInsertRemainingPathCardAt, onMoveCurrentPlayerTo }) => {
    const renderInsertPosition = isGameInInsertState(game) && isInsertPosition(x, y);

    const renderMovePosition =
        isGameInMoveState(game) && positionIsIn({ x, y }, game.reachablePositions[game.currentPlayerIndex]);

    return (
        <div
            className={`centered-content ${renderInsertPosition ? 'insert-position' : 'move-player'}`}
            onClick={
                renderInsertPosition
                    ? () => onInsertRemainingPathCardAt(game, x, y)
                    : () => onMoveCurrentPlayerTo(game, x, y)
            }
        />
    );
};

const mapStateToProps = state => {
    return {
        game: state.game,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInsertRemainingPathCardAt: (game, x, y) => {
            dispatch(insertRemainingPathcardAt(game, x, y));
        },
        onMoveCurrentPlayerTo: (game, x, y) => {
            dispatch(actionMoveCurrentPlayerTo(game, x, y));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
