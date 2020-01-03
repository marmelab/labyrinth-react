import * as React from 'react';
import Tile from './Tile';
import PlayerAction from './PlayerAction';
import Player from './Player';

import { connect } from 'react-redux';
import { insertRemainingPathcardAt, actionMoveCurrentPlayerTo } from '../actions';

const getPlayerIndex = (players, x, y) => players.findIndex(player => player.x === x && player.y === y);

export const Board = ({ game, onInsertRemainingPathCardAt, onMoveCurrentPlayerTo }) =>
    game.board ? (
        <div className="game-alignment">
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
                                const index = getPlayerIndex(game.players, columnIndex, rowIndex);
                                return (
                                    <div className="box" key={`${columnIndex}-${rowIndex}`}>
                                        {index > -1 && <Player playerIndex={index} />}
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

const mapStateToProps = state => ({
    game: state,
});

const mapDispatchToProps = {
    onInsertRemainingPathCardAt: insertRemainingPathcardAt,
    onMoveCurrentPlayerTo: actionMoveCurrentPlayerTo,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
