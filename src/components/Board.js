import * as React from 'react';
import Tile from './Tile';
import PlayerAction from './PlayerAction';

import { connect } from 'react-redux';
import { insertRemainingPathcardAt, actionMoveCurrentPlayerTo } from '../actions';

const playerNumberToImageName = {
    0: 'images/piece_blue96.png',
    1: 'images/piece_yellow96.png',
    2: 'images/piece_red96.png',
    3: 'images/piece_purple96.png',
};

const getPlayerImage = (players, x, y) => {
    const index = players.findIndex(player => player.x === x && player.y === y);
    return index > -1 ? playerNumberToImageName[index] : null;
};

export const Board = ({ game, onInsertRemainingPathCardAt, onMoveCurrentPlayerTo }) =>
    game.board ? (
        <div className="board">
            <div className="board-game" id="empty" />
            <div className="board-game" id="ground">
                {game.board.map((row, rowIndex) => (
                    <div className="row" key={`board-game ${rowIndex}`}>
                        {row.map((pathCard, columnIndex) => (
                            <div className="box" key={`box ${rowIndex}-${columnIndex}`}>
                                <Tile degrees={90 * pathCard.direction} type={pathCard.type} target={pathCard.target} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {game.players && (
                <div className="board-game" id="players">
                    {game.board.map((row, rowIndex) => (
                        <div className="row" key={`players ${rowIndex}`}>
                            {row.map((pathCard, columnIndex) => {
                                const image = getPlayerImage(game.players, columnIndex, rowIndex);
                                return (
                                    <div className="box" key={`${columnIndex}-${rowIndex}`}>
                                        <div className="centered-content">
                                            {image && <img alt={`Player`} className="player-image" src={image} />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}

            <div className="board-game" id="insert-or-move-layer">
                {game.board.map((row, rowIndex) => (
                    <div className="row" key={`insert-or-move-layer ${rowIndex}`}>
                        {row.map((_, columnIndex) => (
                            <div className="box" key={`${columnIndex}-${rowIndex}`}>
                                <PlayerAction
                                    x={columnIndex}
                                    y={rowIndex}
                                    game={game}
                                    onInsertRemainingPathCardAt={onInsertRemainingPathCardAt}
                                    onMoveCurrentPlayerTo={onMoveCurrentPlayerTo}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div className="board" id="start-new-game">
            <h1>Please start a new game</h1>
        </div>
    );

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
